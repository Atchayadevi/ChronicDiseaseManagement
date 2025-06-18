require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Muthu@97$"; // Use an environment variable in production

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors("https://localhost:3000"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { type } = require("os");
const { isModuleNamespaceObject } = require("util/types");
app.listen(port, () => {
  console.log("Server is running on port 8000");
});

mongoose
  .connect(
    "mongodb+srv://atchayaa1219:atchayaa1219@cluster0.tdfurqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      connectTimeoutMS: 30000, // Optional: increase timeout
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.get("/", (req, res) => {
  res.json("Hello");
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mailId: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  specialist: { type: String, required: true }, // ex: Cardiologist
  experience: { type: String, required: true }, // ex: "10 years"
  contact: { type: String, required: true },

  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = { Doctor };

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mailId: { type: String, required: true, unique: true },
  healthIssue: { type: String, required: true },
  contact: { type: String, required: true },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  prescriptions: [
    {
      date: { type: Date, default: Date.now },
      medicines: [
        {
          name: String,
          dosage: String,
          instructions: String,
        },
      ],
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient };

// // for senior details
app.post("/seniordetails", async (req, res) => {
  const { name, mailId, gender, specialist, experience, contact } = req.body;

  if (!name || !mailId || !gender || !specialist || !experience || !contact) {
    return res.status(400).json({
      message: "name, mailId, specialist, experience, and contact are required",
    });
  }

  try {
    const existingUser = await Doctor.findOne({
      $or: [{ mailId }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered with this email or contact number",
      });
    }

    const newUser = new Doctor({
      name,
      mailId,
      gender,
      specialist,
      experience,
      contact,
    });

    await newUser.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { mailId } = req.body;

  if (!mailId) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingUser = await Doctor.findOne({ mailId });

    if (!existingUser) {
      return res.status(400).json({ message: "Email not registered" });
    }
    console.log("existing user", existingUser);
    // Generate a JWT token
    const token = jwt.sign({ userId: existingUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: existingUser._id,
        mailId: existingUser.mailId,
        name: existingUser.name,
        // books: existingUser.books, // Include all books as an array
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/juniordetails", async (req, res) => {
  const { name, mailId, healthIssue, contact } = req.body;

  if (!name || !mailId || !healthIssue || !contact) {
    return res
      .status(400)
      .json({ message: "name,healthIssue and contact required" });
  }

  try {
    const existingUser = await Patient.findOne({ mailId });

    // if (!existingUser) {
    //   return res.status(400).json({ message: "Email not registered" });
    // }
    console.log("existing user", existingUser);
    const newUser = new Patient({ name, mailId, healthIssue, contact });
    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/juniorlogin", async (req, res) => {
  const { mailId } = req.body;

  if (!mailId) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingUser = await Patient.findOne({ mailId });

    if (!existingUser) {
      return res.status(400).json({ message: "Email not registered" });
    }
    console.log("existing user junior", existingUser);
    // Generate a JWT token
    const token = jwt.sign({ userId: existingUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        mailId: existingUser.mailId,
        name: existingUser.name,
        _id:existingUser._id,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from 'Bearer <token>'

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not found, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded User ID:", decoded.userId);
    req.user = { id: decoded.userId };
    console.log("...........", req.user?.id);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

// FOR SENIOR
app.get("/user-details", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("Fetching details for User ID:", userId);

    // Fetch the user's details from the database
    const user = await Doctor.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user details
    res.status(200).json({
      message: "User details retrieved successfully",
      user: {
        mailId: user.mailId,
        name: user.name,
        _id: userId,
        // books: user.books, // Example: Books associated with the user
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//FOR JUNIOR

app.get("/junior-details", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id; // Retrieved from token
    console.log("Fetching details for User ID:", userId);

    // Fetch the user's details from the database
    const user = await Patient.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user details
    res.status(200).json({
      message: "User details retrieved successfully",
      user: {
        mailId: user.mailId,
        name: user.name,
        _id: userId,
        // books: user.books, // Example: Books associated with the user
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getPatientsByDoctor", authenticateToken, async (req, res) => {
  try {
    const doctorId = req.user?.id;
    console.log("Logged-in doctor ID:", doctorId);

    if (!doctorId) {
      return res
        .status(400)
        .json({ message: "Doctor ID not found in request" });
    }

    // Find the doctor and populate patient details
    const doctor = await Doctor.findById(doctorId).populate("patients");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Send the populated patient list
    res.json(doctor.patients);
  } catch (err) {
    console.error("Error getting patients:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/availableDoctors", async (req, res) => {
  try {
    const books = await Doctor.find(); // Fetch all available books
    console.log("..Books", books);
    res.status(200).json(books); // Send the list of books as a JSON response
  } catch (error) {
    console.error("Error fetching available books:", error);
    res.status(500).send("Error fetching available books.");
  }
});

app.post("/add-patient", async (req, res) => {
  try {
    const { doctorEmail, patientId } = req.body;

    console.log("Doctor Email:", doctorEmail);
    console.log("Patient ID:", patientId);

    const doctor = await Doctor.findOne({ mailId: doctorEmail });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Avoid duplicate entries
    if (!doctor.patients.includes(patientId)) {
      doctor.patients.push(patientId);
      await doctor.save();
    }

    res.status(200).json({ message: "Patient added successfully" });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/patients/:mailId/prescriptions", async (req, res) => {
  const { mailId } = req.params;
  const { medicines, doctorId } = req.body;

  try {
    const patient = await Patient.findOne({ mailId });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const doctor = await Doctor.findById(doctorId); // Assuming you have a Doctor model
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    patient.prescriptions.push({ doctorId, medicines });
    await patient.save();

    // Send email to patient
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:"anushyamuthu97@gmail.com",
        pass:"smyk gyfl roan lhcu",
      },
    });

    const prescriptionList = `
      <ul>
        ${medicines
          .map(
            (med) => `
          <li>
            <strong>${med.name}</strong> - ${med.dosage}<br/>
            <em>Instructions:</em> ${med.instructions}
          </li>
        `
          )
          .join("")}
      </ul>
    `;

    const html = `
      <div style="font-family: sans-serif; font-size: 14px;">
        🩺 A new prescription has been created by <strong>Dr. ${doctor.name}</strong><br/>
        <p><strong>Doctor Email:</strong> ${doctor.mailId}</p>
        <h3>Prescribed Medicines:</h3>
        ${prescriptionList}
        <p style="font-size: 12px;">🧾 Please follow the above instructions. Contact your doctor for any doubts or issues.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Dr. ${doctor.name}" <${doctor.mailId}>`,
      to: mailId,
      subject: "Your Prescription from Dr. " + doctor.name,
      html,
    });

    res.status(200).json({ message: "Prescription added and email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to add prescription or send email" });
  }
});
