const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
// app.use(
//   cors({
//     origin: ["https://books-rho-black.vercel.app/"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const { type } = require("os");
app.listen(port, () => {
  console.log("Server is running on port 8000");
});

mongoose
  .connect("mongodb+srv://muthuanushya:anushya@cluster0.2e7d5.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

const bookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
  },
  Year: {
    type: String,
  },
  Regulation: {
    type: String,
  },
  department: {
    type: String,
  },
  semester: {
    type: String,
  },
});

const collection = new mongoose.model("books", bookSchema);

const availabilityBookSchema = new mongoose.Schema({
  bookTitle: String,
  Year: String,
  Regulation: String,
  department: String,
  semester: String,
  contact: String,
  isAvailable: Boolean,
});
const AvailableBook = mongoose.model("availableBooks", availabilityBookSchema);

app.post("/availableBooks", async (req, res) => {
  try {
    const { bookTitle, Year, Regulation, department, semester, contact } =
      req.body;

    // Check if the book with the same title, year, regulation, department, semester, and contact exists
    const existingBook = await AvailableBook.findOne({
      bookTitle,
      Year,
      Regulation,
      department,
      semester,
      contact, // Important: Search by both book details and contact
    });

    if (existingBook) {
      // If found, return a message that the book details are already added for this contact
      return res
        .status(409)
        .send("You have already added the book details for this contact.");
    }

    // If not found, add a new entry for the book (even if the book details are the same, but contact is different)
    const newBook = new AvailableBook({
      bookTitle,
      Year,
      Regulation,
      department,
      semester,
      contact,
      // isAvailable: true, // Assuming the book is available
    });

    await newBook.save(); // Save the new book with a different contact number
    res.status(201).send("Book added as available.");
  } catch (error) {
    console.error("Error during book availability insertion:", error);
    res.status(500).send("Error saving book availability.");
  }
});

const insertInitialData = async () => {
  try {
    console.log("Checking MongoDB connection...");

    // Retrieve all existing books
    // const existingBooks = await collection.find();

    // Define initial data to be inserted
    const initialData = [
      {
        bookTitle: "MA8151 ENGINEERING MATHEMATICS 1",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "CY8151 ENGINEERING CHEMISTRY",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "PH8151 Engineering Physics",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "GE8151 Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "GE8152 Engineering Graphics",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "HS8151 Communicative English",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "GE8161 Problem Solving and Python Programming Laboratory",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "BS8161 Physics and chemistry Laboratory",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "I sem",
      },

      //---------------------------------------------SECOND SEM-----------------------------------------//

      {
        bookTitle: "HS8251 Technical English",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "MA8251 Engineering Mathematics 2",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "PH8252 Physics for Information Science",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "BE8255 Basic Electrical and Electronics Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "GE8291 Environmental Science and Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "CS8251 Programming in C",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "GE8261 Engineering Practices Laboratory",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "CS8261 C Programming Laboratory",
        Year: "I Year",
        Regulation: "2017",
        department: "CSE",
        semester: "II sem",
      },

      //-----------------------------------------Third Sem----------------------------------------------//

      {
        bookTitle: "MA8351 Discrete Mathematics",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS8351 Digital Principles and System Design",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS8391 Data Structures",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS8392 Object-Oriented Programming",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "EC8395 Communication Engineering",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS8381 Data Structures Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS8383 Object-Oriented Programming Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "HS8381 Interpersonal Skills/Listening & Speaking",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS8382 Digital Systems Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "III sem",
      },
      //-----------------------------------------Fourth Sem----------------------------------------------//

      {
        bookTitle: "MA8402 Probability and Queueing Theory",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8491 Computer Architecture",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8492 Database Management Systems",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8451 Design and Analysis of Algorithms",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8493 Operating Systems",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8494 Software Engineering",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8481 Database Management Systems Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8461 Operating Systems Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "CSE",
        semester: "IV sem",
      },

      //-----------------------------------------Fifth Sem----------------------------------------------//

      {
        bookTitle: "MA8551 Algebra and Number Theory",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "CS8591 Computer Networks",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "EC8691 Microprocessors and Microcontrollers",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "CS8501 Theory of Computation",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "CS8592 Object-Oriented Analysis and Design",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "OCE552 Geographic Information System",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "CS8581 Networks Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "CS8582 Object-Oriented Analysis and Design Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "V sem",
      },

      //-----------------------------------------sixth Sem----------------------------------------------//

      {
        bookTitle: "CS8651 Internet Programming",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8691 Artificial Intelligence",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8601 Mobile Computing",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8602 Compiler Design",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8603 Distributed Systems",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "HS8581 Professional communication",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8661 Internet Programming Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8662 Mobile Application Development Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8611 Mini Project Idea",
        Year: "III Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VI sem",
      },

      //-----------------------------------------seventh Sem----------------------------------------------//

      {
        bookTitle: "MG8591 Principles of Management",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VII sem",
      },
      {
        bookTitle: "CS8792 Cryptography and Network Security",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VII sem",
      },
      {
        bookTitle: "CS8791 Cloud computing",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VII sem",
      },
      {
        bookTitle: "IT8075 Software Project Management",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VII sem",
      },
      {
        bookTitle: "OBM752 Hospital Management",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VII sem",
      },
      {
        bookTitle: "CS8711 Cloud Computing Laboratory",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VII sem",
      },
      {
        bookTitle: "IT8761 Security Laboratory",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VII sem",
      },

      //-----------------------------------------Eighth Sem----------------------------------------------//

      {
        bookTitle: "CS8811 Project Work",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VIII sem",
      },
      {
        bookTitle: "IT8073 Information Security",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VIII sem",
      },

      {
        bookTitle: "CS8080 Information Retrieval Techniques",
        Year: "IV Year",
        Regulation: "2017",
        department: "CSE",
        semester: "VIII sem",
      },

      //-----------------------------------------ECE First sem----------------------------------------------//
      {
        bookTitle: "MA8151 Engineering Mathematics I",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "PH8151 Engineering Physics",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "CY8151 Engineering Chemistry",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "GE8151 Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "GE8152 Engineering Graphics",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "HS8151 Communicative English",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "I sem",
      },

      //-----------------------------------------ECE Second Sem----------------------------------------------//
      {
        bookTitle: "MA8251 Engineering Mathematics II",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "PH8253 Physics for Electronics Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle:
          "BE8255 Basic Electrical, Electronics and Measurement Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "GE8291 Environmental Science and Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "CS8251 Programming in C",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "HS8251 Technical English",
        Year: "I Year",
        Regulation: "2017",
        department: "ECE",
        semester: "II sem",
      },

      //-----------------------------------------ECE III Sem----------------------------------------------//
      {
        bookTitle: "MA8352 Linear Algebra and Partial Differential Equations",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "EC8351 Electronic Circuits I",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "EC8352 Signals and Systems",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "EC8391 Control Systems Engineering",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "EC8392 Digital Electronics",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "EC8361 Analog and Digital Circuits Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "III sem",
      },

      //-----------------------------------------ECE IV Sem----------------------------------------------//
      {
        bookTitle: "MA8451 Probability and Random Processes",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "EC8452 Electromagnetic Fields",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "EC8491 Communication Theory",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "EC8451 Electronic Circuits II",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "GE8292 Engineering Mechanics",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "EC8461 Circuits Design and Simulation Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "ECE",
        semester: "IV sem",
      },

      //-----------------------------------------ECE V Sem----------------------------------------------//
      {
        bookTitle: "EC8501 Digital Communication",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "EC8553 Discrete-Time Signal Processing",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "EC8552 Computer Architecture and Organization",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "EC8502 Microprocessors and Microcontrollers",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "EC8511 Digital Signal Processing Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "EC8512 Microprocessors and Microcontrollers Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "V sem",
      },

      //-----------------------------------------ECE VI Sem----------------------------------------------//
      {
        bookTitle: "EC8651 Transmission Lines and RF Systems",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VI sem",
      },
      {
        bookTitle: "EC8652 VLSI Design",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VI sem",
      },
      {
        bookTitle: "EC8653 Antennas and Wave Propagation",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VI sem",
      },
      {
        bookTitle: "MG8591 Principles of Management",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VI sem",
      },
      {
        bookTitle: "EC8661 VLSI Design Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VI sem",
      },

      //-----------------------------------------ECE VII Sem----------------------------------------------//
      {
        bookTitle: "EC8701 Antennas and Microwave Engineering",
        Year: "IV Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VII sem",
      },
      {
        bookTitle: "EC8751 Optical Communication",
        Year: "IV Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VII sem",
      },
      {
        bookTitle: "EC8702 Embedded and Real-Time Systems",
        Year: "IV Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VII sem",
      },
      {
        bookTitle: "EC8703 Ad Hoc and Wireless Sensor Networks",
        Year: "IV Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VII sem",
      },

      //-----------------------------------------ECE VIII Sem----------------------------------------------//
      {
        bookTitle: "EC8811 Project Work",
        Year: "IV Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VIII sem",
      },
      {
        bookTitle: "GE8077 Total Quality Management",
        Year: "IV Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VIII sem",
      },
      {
        bookTitle: "EC8093 Internet of Things",
        Year: "IV Year",
        Regulation: "2017",
        department: "ECE",
        semester: "VIII sem",
      },

      //-----------------------------------------EEE I Sem---------------------------------------------//

      {
        bookTitle: "HS8151 Communicative English",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "MA8151 Engineering Mathematics I",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "PH8151 Engineering Physics",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "CY8151 Engineering Chemistry",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "GE8151 Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "GE8152 Engineering Graphics",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "I sem",
      },

      //-----------------------------------------EEE II Sem----------------------------------------------//
      {
        bookTitle: "HS8251 Technical English",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "MA8251 Engineering Mathematics II",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "PH8253 Physics for Electrical Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle:
          "BE8255 Basic Electrical, Electronics and Measurement Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "GE8291 Environmental Science and Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "CS8251 Programming in C",
        Year: "I Year",
        Regulation: "2017",
        department: "EEE",
        semester: "II sem",
      },

      //-----------------------------------------EEE III Sem---------------------------------------------//
      {
        bookTitle: "MA8353 Transforms and Partial Differential Equations",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "EE8351 Digital Logic Circuits",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "EE8301 Electrical Machines I",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "EE8302 Electro Magnetic Theory",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "EC8353 Electron Devices and Circuits",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "EE8311 Electrical Machines Laboratory I",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "III sem",
      },

      //-----------------------------------------EEE IV Sem----------------------------------------------//
      {
        bookTitle: "MA8491 Numerical Methods",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "EE8401 Electrical Machines II",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "EE8402 Transmission and Distribution",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "EE8403 Measurements and Instrumentation",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "EE8451 Linear Integrated Circuits and Applications",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "IC8451 Control Systems",
        Year: "II Year",
        Regulation: "2017",
        department: "EEE",
        semester: "IV sem",
      },

      //-----------------------------------------EEE V Sem----------------------------------------------//
      {
        bookTitle: "EE8501 Power System Analysis",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "EE8551 Microprocessors and Microcontrollers",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "EE8552 Power Electronics",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "EE8591 Digital Signal Processing",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "CS8392 Object Oriented Programming",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "EE8511 Control and Instrumentation Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "V sem",
      },

      //-----------------------------------------EEE VI Sem----------------------------------------------//

      {
        bookTitle: "EE8601 Solid State Drives",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "EE8602 Protection and Switchgear",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "EE8691 Embedded Systems",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "EE8005 Special Electrical Machines",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "OAN551 Sensors and Transducers",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "EE8611 Mini Project",
        Year: "III Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VI sem",
      },

      //-----------------------------------------EEE VII Sem----------------------------------------------//
      {
        bookTitle: "EE8701 High Voltage Engineering",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VII sem",
      },
      {
        bookTitle: "EE8702 Power System Operation and Control",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VII sem",
      },
      {
        bookTitle: "EE8703 Renewable Energy Systems",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VII sem",
      },
      {
        bookTitle: "Professional Elective I",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VII sem",
      },
      {
        bookTitle: "Open Elective I",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VII sem",
      },

      //-----------------------------------------EEE VIII Sem----------------------------------------------//

      {
        bookTitle: "EE8811 Project Work",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VIII sem",
      },
      {
        bookTitle: "EE8002 Design of Electrical Apparatus",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VIII sem",
      },
      {
        bookTitle: "Open Elective II",
        Year: "IV Year",
        Regulation: "2017",
        department: "EEE",
        semester: "VIII sem",
      },

      //-----------------------------------------IT I sem----------------------------------------------//

      {
        bookTitle: "HS8151 Communicative English",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "MA8151 Engineering Mathematics I",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "PH8151 Engineering Physics",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "CY8151 Engineering Chemistry",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "GE8151 Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "GE8152 Engineering Graphics",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "I sem",
      },

      //-----------------------------------------IT II sem----------------------------------------------//
      {
        bookTitle: "HS8251 Technical English",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "MA8251 Engineering Mathematics II",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "PH8252 Physics for Information Technology",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle:
          "BE8255 Basic Electrical, Electronics and Instrumentation Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "GE8291 Environmental Science and Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "CS8251 Programming in C",
        Year: "I Year",
        Regulation: "2017",
        department: "IT",
        semester: "II sem",
      },

      //-----------------------------------------IT III sem----------------------------------------------//
      {
        bookTitle: "MA8351 Discrete Mathematics",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS8351 Digital Principles and System Design",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS8391 Data Structures",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "EC8395 Communication Engineering",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS8392 Object Oriented Programming",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS8381 Data Structures Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS8383 Object Oriented Programming Laboratory",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "III sem",
      },

      //-----------------------------------------IT IV sem----------------------------------------------//
      {
        bookTitle: "MA8402 Probability and Queueing Theory",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8491 Computer Architecture",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8492 Database Management Systems",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8451 Design and Analysis of Algorithms",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "IT8401 Information Theory and Coding",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS8494 Software Engineering",
        Year: "II Year",
        Regulation: "2017",
        department: "IT",
        semester: "IV sem",
      },

      //-----------------------------------------IT V sem----------------------------------------------//
      {
        bookTitle: "CS8591 Computer Networks",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "CS8501 Theory of Computation",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "IT8501 Web Technology",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "CS8592 Object Oriented Analysis and Design",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "OCE551 Environmental and Social Impact Assessment",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "CS8582 Object Oriented Analysis and Design Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "V sem",
      },

      //-----------------------------------------IT VI sem----------------------------------------------//
      {
        bookTitle: "CS8651 Internet Programming",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8691 Artificial Intelligence",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "IT8601 Computational Intelligence",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "IT8602 Mobile Communication",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8603 Distributed Systems",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "CS8661 Internet Programming Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "IT",
        semester: "VI sem",
      },

      //-----------------------------------------IT VII sem----------------------------------------------//
      {
        bookTitle: "MG8591 Principles of Management",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VII sem",
      },
      {
        bookTitle: "CS8792 Cryptography and Network Security",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VII sem",
      },
      {
        bookTitle: "IT8701 Information Management",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VII sem",
      },
      {
        bookTitle: "IT8702 Business Intelligence",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VII sem",
      },
      {
        bookTitle: "Open Elective I",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VII sem",
      },

      //-----------------------------------------IT VIII sem----------------------------------------------//
      {
        bookTitle: "IT8811 Project Work",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VIII sem",
      },
      {
        bookTitle: "Open Elective II",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VIII sem",
      },
      {
        bookTitle: "Professional Elective V",
        Year: "IV Year",
        Regulation: "2017",
        department: "IT",
        semester: "VIII sem",
      },

      //-----------------------------------------Mechanical I sem----------------------------------------------//

      {
        bookTitle: "HS8151 Communicative English",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "MA8151 Engineering Mathematics I",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "PH8151 Engineering Physics",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "CY8151 Engineering Chemistry",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "GE8151 Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "GE8152 Engineering Graphics",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "I sem",
      },

      //-----------------------------------------Mechanical II sem----------------------------------------------//
      {
        bookTitle: "HS8251 Technical English",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "MA8251 Engineering Mathematics II",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "PH8253 Physics for Mechanical Sciences",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle:
          "BE8253 Basic Electrical, Electronics and Instrumentation Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "GE8291 Environmental Science and Engineering",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "GE8292 Engineering Mechanics",
        Year: "I Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "II sem",
      },

      //-----------------------------------------Mechanical III sem----------------------------------------------//
      {
        bookTitle: "MA8353 Transforms and Partial Differential Equations",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "ME8391 Engineering Thermodynamics",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "CE8394 Fluid Mechanics and Machinery",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "ME8351 Manufacturing Technology I",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "EE8353 Electrical Drives and Controls",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "ME8361 Manufacturing Technology Laboratory I",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "ME8381 Computer Aided Machine Drawing",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "III sem",
      },

      //-----------------------------------------Mechanical IV sem----------------------------------------------//
      {
        bookTitle: "MA8452 Statistics and Numerical Methods",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "ME8492 Kinematics of Machinery",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "ME8451 Manufacturing Technology II",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "ME8491 Engineering Metallurgy",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "CE8491 Strength of Materials for Mechanical Engineers",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "ME8462 Manufacturing Technology Laboratory II",
        Year: "II Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "IV sem",
      },

      //-----------------------------------------Mechanical V sem----------------------------------------------//
      {
        bookTitle: "ME8595 Thermal Engineering I",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "V sem",
      },
      {
        bookTitle: "ME8593 Design of Machine Elements",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "V sem",
      },
      {
        bookTitle: "ME8501 Metrology and Measurements",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "V sem",
      },
      {
        bookTitle: "ME8594 Dynamics of Machines",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "V sem",
      },
      {
        bookTitle: "OAI551 Operations Research",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "V sem",
      },
      {
        bookTitle: "ME8511 Kinematics and Dynamics Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "V sem",
      },

      //-----------------------------------------Mechanical VI sem----------------------------------------------//
      {
        bookTitle: "ME8651 Design of Transmission Systems",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VI sem",
      },
      {
        bookTitle: "ME8691 Computer Aided Design and Manufacturing",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VI sem",
      },
      {
        bookTitle: "ME8693 Heat and Mass Transfer",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VI sem",
      },
      {
        bookTitle: "ME8692 Finite Element Analysis",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VI sem",
      },
      {
        bookTitle: "ME8694 Hydraulics and Pneumatics",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VI sem",
      },
      {
        bookTitle: "ME8681 CAD/CAM Laboratory",
        Year: "III Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VI sem",
      },

      //-----------------------------------------Mechanical VII sem----------------------------------------------//
      {
        bookTitle: "ME8792 Power Plant Engineering",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VII sem",
      },
      {
        bookTitle: "ME8793 Process Planning and Cost Estimation",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VII sem",
      },
      {
        bookTitle: "OIM751 Operations Research",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VII sem",
      },
      {
        bookTitle: "Professional Elective I",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VII sem",
      },
      {
        bookTitle: "Open Elective I",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VII sem",
      },

      //-----------------------------------------Mechanical VIII sem----------------------------------------------//

      {
        bookTitle: "ME8811 Project Work",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VIII sem",
      },
      {
        bookTitle: "Professional Elective II",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VIII sem",
      },
      {
        bookTitle: "Professional Elective III",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VIII sem",
      },
      {
        bookTitle: "Open Elective II",
        Year: "IV Year",
        Regulation: "2017",
        department: "Mechanical",
        semester: "VIII sem",
      },

      //-----------------------------------------CSE I sem 2021----------------------------------------------//

      // Semester I
      {
        bookTitle: "Professional English - I",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "Matrices and Calculus",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Physics",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Chemistry",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "Heritage of Tamils",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "Problem Solving and Python Programming Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "Physics and Chemistry Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "English Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },

      // Semester II
      {
        bookTitle: "Professional English - II",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Statistics and Numerical Methods",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Physics for Information Science",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Basic Electrical and Electronics Engineering",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Graphics",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Programming in C",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Tamils and Technology",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Practices Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Programming in C Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "Communication Laboratory / Foreign Language",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },

      // Semester III
      {
        bookTitle: "Discrete Mathematics",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "Digital Principles and Computer Organization",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "Foundations of Data Science",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "Data Structures",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "Object Oriented Programming",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "Data Structures Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "Object Oriented Programming Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "Data Science Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },

      // Semester IV
      {
        bookTitle: "Theory of Computation",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "Artificial Intelligence and Machine Learning",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "Database Management Systems",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "Algorithms",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "Introduction to Operating Systems",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "Environmental Sciences and Sustainability",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "Operating Systems Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "Database Management Systems Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },

      // Semester V
      {
        bookTitle: "Computer Networks",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "Compiler Design",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "Cryptography and Cyber Security",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "Distributed Computing",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },

      // Semester VI
      {
        bookTitle: "Object Oriented Software Engineering",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Embedded Systems and IoT",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Open Elective – I",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective I",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective II",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective III",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Mandatory Course II",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },

      // Semester VII
      {
        bookTitle: "Human Values and Ethics",
        Year: "IV Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VII sem",
      },
      {
        bookTitle: "HS3152 Professional English - I",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "MA3151 Matrices and Calculus",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "PH3151 Engineering Physics",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "CY3151 Engineering Chemistry",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "GE3151 Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "GE3152 Heritage of Tamils",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "GE3171 Problem Solving and Python Programming Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "BS3171 Physics and Chemistry Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },
      {
        bookTitle: "GE3172 English Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "I sem",
      },

      // Semester II
      {
        bookTitle: "HS3252 Professional English - II",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "MA3251 Statistics and Numerical Methods",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "PH3256 Physics for Information Science",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "BE3251 Basic Electrical and Electronics Engineering",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "GE3251 Engineering Graphics",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "CS3251 Programming in C",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "GE3252 Tamils and Technology",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "NCC Credit Course Level 1",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "GE3271 Engineering Practices Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "CS3271 Programming in C Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },
      {
        bookTitle: "GE3272 Communication Laboratory / Foreign Language",
        Year: "I Year",
        Regulation: "2021",
        department: "CSE",
        semester: "II sem",
      },

      // Semester III
      {
        bookTitle: "MA3354 Discrete Mathematics",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS3351 Digital Principles and Computer Organization",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS3352 Foundations of Data Science",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CD3291 Data Structures and Algorithms",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS3391 Object Oriented Programming",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CD3281 Data Structures and Algorithms Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS3381 Object Oriented Programming Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "CS3361 Data Science Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },
      {
        bookTitle: "GE3361 Professional Development",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "III sem",
      },

      // Semester IV
      {
        bookTitle: "CS3452 Theory of Computation",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3491 Artificial Intelligence and Machine Learning",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3492 Database Management Systems",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "IT3401 Web Essentials",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3451 Introduction to Operating Systems",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "GE3451 Environmental Sciences and Sustainability",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "NCC Credit Course Level 2",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3461 Operating Systems Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3481 Database Management Systems Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "CSE",
        semester: "IV sem",
      },

      // Semester V
      {
        bookTitle: "CS3591 Computer Networks",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "IT3501 Full Stack Web Development",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "CS3551 Distributed Computing",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "CS3691 Embedded Systems and IoT",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "Professional Elective I",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "Professional Elective II",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "Mandatory Course - I",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },
      {
        bookTitle: "IT3511 Full Stack Web Development Laboratory",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "V sem",
      },

      // Semester VI
      {
        bookTitle: "CCS356 Object Oriented Software Engineering",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Open Elective – I",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective III",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective IV",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective V",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective VI",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "Mandatory Course - II",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "NCC Credit Course Level 3",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },
      {
        bookTitle: "IT3681 Mobile Applications Development Laboratory",
        Year: "III Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VI sem",
      },

      // Semester VII / VIII
      {
        bookTitle: "GE3791 Human Values and Ethics for IT",
        Year: "IV Year",
        Regulation: "2021",
        department: "CSE",
        semester: "VII/VIII",
      },

      // Semester I
      {
        bookTitle: "Professional English - I",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "Matrices and Calculus",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Physics",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Chemistry",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "Heritage of Tamils",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "Problem Solving and Python Programming Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "Physics and Chemistry Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },
      {
        bookTitle: "English Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "I sem",
      },

      // Semester II
      {
        bookTitle: "Professional English - II",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Statistics and Numerical Methods",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Physics for Electrical Engineering",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Basic Civil and Mechanical Engineering",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Graphics",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Electric Circuit Analysis",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Tamils and Technology",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Practices Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Electric Circuits Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },
      {
        bookTitle: "Communication Laboratory / Foreign Language",
        Year: "I Year",
        Regulation: "2021",
        department: "EEE",
        semester: "II sem",
      },

      // Semester III
      {
        bookTitle: "Probability and Complex Functions",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "Electromagnetic Fields",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "Digital Logic Circuits",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "Electron Devices and Circuits",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "Electrical Machines - I",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "C Programming and Data Structures",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "Electronic Devices and Circuits Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "Electrical Machines Laboratory – I",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "C Programming and Data Structures Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },
      {
        bookTitle: "Professional Development",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "III sem",
      },

      // Semester IV
      {
        bookTitle: "Environmental Sciences and Sustainability",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Transmission and Distribution",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Linear Integrated Circuits",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Measurements and Instrumentation",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Microprocessor and Microcontroller",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Electrical Machines - II",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Electrical Machines Laboratory - II",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Linear and Digital Circuits Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },
      {
        bookTitle: "Microprocessor and Microcontroller Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "EEE",
        semester: "IV sem",
      },

      // Semester V
      {
        bookTitle: "Power System Analysis",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "Power Electronics",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "Control Systems",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "Professional Elective I",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "Professional Elective II",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "Professional Elective III",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "Power Electronics Laboratory",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },
      {
        bookTitle: "Control and Instrumentation Laboratory",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "V sem",
      },

      // Semester VI
      {
        bookTitle: "Protection and Switchgear",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "Power System Operation and Control",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "Open Elective – I",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective IV",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective V",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective VI",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VI sem",
      },
      {
        bookTitle: "Power System Laboratory",
        Year: "III Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VI sem",
      },

      // Semester VII/VIII
      {
        bookTitle: "High Voltage Engineering",
        Year: "IV Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VII/VIII sem",
      },
      {
        bookTitle: "Human Values and Ethics",
        Year: "IV Year",
        Regulation: "2021",
        department: "EEE",
        semester: "VII/VIII sem",
      },

      // Semester I
      {
        bookTitle: "HS3152 Professional English - I",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "MA3151 Matrices and Calculus",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "PH3151 Engineering Physics",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "CY3151 Engineering Chemistry",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "GE3151 Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "GE3152 தமிழர்மரபு / Heritage of Tamils",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      // Practical
      {
        bookTitle: "GE3171 Problem Solving and Python Programming Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "BS3171 Physics and Chemistry Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },
      {
        bookTitle: "GE3172 English Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "I sem",
      },

      // Semester II
      {
        bookTitle: "HS3252 Professional English - II",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "MA3251 Statistics and Numerical Methods",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "PH3256 Physics for Information Science",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "BE3251 Basic Electrical and Electronics Engineering",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "GE3251 Engineering Graphics",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "CS3251 Programming in C",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "GE3252 தமிழரும் ததொழில்நுட்பமும் / Tamils and Technology",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "NCC Credit Course Level 1",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      // Practical
      {
        bookTitle: "GE3271 Engineering Practices Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "CS3271 Programming in C Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },
      {
        bookTitle: "GE3272 Communication Laboratory / Foreign Language",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "II sem",
      },

      // Semester III
      {
        bookTitle: "MA3354 Discrete Mathematics",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS3351 Digital Principles and Computer Organization",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS3352 Foundations of Data Science",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CD3291 Data Structures and Algorithms",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS3391 Object Oriented Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      // Practical
      {
        bookTitle: "CD3281 Data Structures and Algorithms Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS3381 Object Oriented Programming Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "CS3361 Data Science Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },
      {
        bookTitle: "GE3361 Professional Development",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "III sem",
      },

      // Semester IV
      {
        bookTitle: "CS3452 Theory of Computation",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3491 Artificial Intelligence and Machine Learning",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3492 Database Management Systems",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "IT3401 Web Essentials",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3451 Introduction to Operating Systems",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "GE3451 Environmental Sciences and Sustainability",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "NCC Credit Course Level 2",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      // Practical
      {
        bookTitle: "CS3461 Operating Systems Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },
      {
        bookTitle: "CS3481 Database Management Systems Laboratory",
        Year: "I Year",
        Regulation: "2021",
        department: "IT",
        semester: "IV sem",
      },

      // Semester V
      {
        bookTitle: "CS3591 Computer Networks",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "IT3501 Full Stack Web Development",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "CS3551 Distributed Computing",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "CS3691 Embedded Systems and IoT",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "Professional Elective I",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "Professional Elective II",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },
      {
        bookTitle: "Mandatory Course- I",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },
      // Practical
      {
        bookTitle: "IT3511 Full Stack Web Development Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "V sem",
      },

      // Semester VI
      {
        bookTitle: "CCS356 Object Oriented Software Engineering",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "Open Elective – I",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective III",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective IV",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective V",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective VI",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "Mandatory Course-II",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      {
        bookTitle: "NCC Credit Course Level 3",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },
      // Practical
      {
        bookTitle: "IT3681 Mobile Applications Development Laboratory",
        Year: "II Year",
        Regulation: "2021",
        department: "IT",
        semester: "VI sem",
      },

      // Semester VII
      {
        bookTitle: "GE3791 Human Values and Ethics",
        Year: "III Year",
        Regulation: "2021",
        department: "IT",
        semester: "VII sem",
      },
      // Add any additional semester courses as needed

      {
        bookTitle: "Professional English - I",
        Year: "I Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "Matrices and Calculus",
        Year: "I Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Physics",
        Year: "I Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Chemistry",
        Year: "I Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "Heritage of Tamils",
        Year: "I Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "I sem",
      },
      {
        bookTitle: "Professional English - II",
        Year: "II Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "Statistics and Numerical Methods",
        Year: "II Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "Materials Science",
        Year: "II Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "Basic Electrical and Electronics Engineering",
        Year: "II Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Graphics",
        Year: "II Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "Tamils and Technology",
        Year: "II Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Mechanics",
        Year: "III Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "Engineering Thermodynamics",
        Year: "III Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "Fluid Mechanics and Machinery",
        Year: "III Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "Engineering Materials and Metallurgy",
        Year: "III Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "Manufacturing Processes",
        Year: "III Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "III sem",
      },
      {
        bookTitle: "Theory of Machines",
        Year: "IV Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "Thermal Engineering",
        Year: "IV Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "Hydraulics and Pneumatics",
        Year: "IV Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "Manufacturing Technology",
        Year: "IV Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "Strength of Materials",
        Year: "IV Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "IV sem",
      },
      {
        bookTitle: "Design of Machine Elements",
        Year: "V Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "V sem",
      },
      {
        bookTitle: "Metrology and Measurements",
        Year: "V Year",
        Regulation: "2021",
        department: "Mechanical",
        semester: "V sem",
      },

      {
        bookTitle: "Professional English - I",
        Year: "I Year",
        Regulation: "2021",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "Matrices and Calculus",
        Year: "I Year",
        Regulation: "2021",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Physics",
        Year: "I Year",
        Regulation: "2021",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Chemistry",
        Year: "I Year",
        Regulation: "2021",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "Heritage of Tamils",
        Year: "I Year",
        Regulation: "2021",
        department: "ECE",
        semester: "I sem",
      },
      {
        bookTitle: "Professional English - II",
        Year: "II Year",
        Regulation: "2021",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "Statistics and Numerical Methods",
        Year: "II Year",
        Regulation: "2021",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "Physics for Electronics Engineering",
        Year: "II Year",
        Regulation: "2021",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "Electrical and Instrumentation Engineering",
        Year: "II Year",
        Regulation: "2021",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Graphics",
        Year: "II Year",
        Regulation: "2021",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "Circuit Analysis",
        Year: "II Year",
        Regulation: "2021",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "Tamils and Technology",
        Year: "II Year",
        Regulation: "2021",
        department: "ECE",
        semester: "II sem",
      },
      {
        bookTitle: "Random Processes and Linear Algebra",
        Year: "III Year",
        Regulation: "2021",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "C Programming and Data Structures",
        Year: "III Year",
        Regulation: "2021",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "Signals and Systems",
        Year: "III Year",
        Regulation: "2021",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "Electronic Devices and Circuits",
        Year: "III Year",
        Regulation: "2021",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "Control Systems",
        Year: "III Year",
        Regulation: "2021",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "Digital Systems Design",
        Year: "III Year",
        Regulation: "2021",
        department: "ECE",
        semester: "III sem",
      },
      {
        bookTitle: "Electromagnetic Fields",
        Year: "IV Year",
        Regulation: "2021",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "Networks and Security",
        Year: "IV Year",
        Regulation: "2021",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "Linear Integrated Circuits",
        Year: "IV Year",
        Regulation: "2021",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "Digital Signal Processing",
        Year: "IV Year",
        Regulation: "2021",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "Communication Systems",
        Year: "IV Year",
        Regulation: "2021",
        department: "ECE",
        semester: "IV sem",
      },
      {
        bookTitle: "Wireless Communication",
        Year: "V Year",
        Regulation: "2021",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "VLSI and Chip Design",
        Year: "V Year",
        Regulation: "2021",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "Transmission lines and RF Systems",
        Year: "V Year",
        Regulation: "2021",
        department: "ECE",
        semester: "V sem",
      },
      {
        bookTitle: "Embedded Systems and IOT Design",
        Year: "VI Year",
        Regulation: "2021",
        department: "ECE",
        semester: "VI sem",
      },
      {
        bookTitle: "Artificial Intelligence and Machine Learning",
        Year: "VI Year",
        Regulation: "2021",
        department: "ECE",
        semester: "VI sem",
      },
      {
        bookTitle: "Human Values and Ethics",
        Year: "VII / VIII",
        Regulation: "2021",
        department: "ECE",
        semester: "VII / VIII sem",
      },

      {
        bookTitle: "Professional English - I",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "I sem",
      },
      {
        bookTitle: "Matrices and Calculus",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Physics",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "I sem",
      },
      {
        bookTitle: "Engineering Chemistry",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "I sem",
      },
      {
        bookTitle: "Problem Solving and Python Programming",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "I sem",
      },
      {
        bookTitle: "Heritage of Tamils",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "I sem",
      },

      {
        bookTitle: "Professional English - II",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "II sem",
      },
      {
        bookTitle: "Statistics and Numerical Methods",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "II sem",
      },
      {
        bookTitle: "Physics for Information Science",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "II sem",
      },
      {
        bookTitle: "Basic Electrical and Electronics Engineering",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "II sem",
      },
      {
        bookTitle: "Engineering Graphics",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "II sem",
      },
      {
        bookTitle: "Data Structures Design",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "II sem",
      },
      {
        bookTitle: "Tamils and Technology",
        Year: "I Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "II sem",
      },

      {
        bookTitle: "Discrete Mathematics",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "III sem",
      },
      {
        bookTitle: "Digital Principles and Computer Organization",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "III sem",
      },
      {
        bookTitle: "Database Design and Management",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "III sem",
      },
      {
        bookTitle: "Design and Analysis of Algorithms",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "III sem",
      },
      {
        bookTitle: "Data Exploration and Visualization",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "III sem",
      },
      {
        bookTitle: "Artificial Intelligence",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "III sem",
      },

      {
        bookTitle: "Probability and Statistics",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "IV sem",
      },
      {
        bookTitle: "Operating Systems",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "IV sem",
      },
      {
        bookTitle: "Machine Learning",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "IV sem",
      },
      {
        bookTitle: "Fundamentals of Data Science and Analytics",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "IV sem",
      },
      {
        bookTitle: "Computer Networks",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "IV sem",
      },
      {
        bookTitle: "Environmental Sciences and Sustainability",
        Year: "II Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "IV sem",
      },

      {
        bookTitle: "Deep Learning",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "V sem",
      },
      {
        bookTitle: "Data and Information Security",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "V sem",
      },
      {
        bookTitle: "Distributed Computing",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "V sem",
      },
      {
        bookTitle: "Big Data Analytics",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "V sem",
      },
      {
        bookTitle: "Mandatory Course-I",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "V sem",
      },

      {
        bookTitle: "Embedded Systems and IoT",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },
      {
        bookTitle: "Artificial Intelligence and Machine Learning",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },
      {
        bookTitle: "Open Elective– I",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective IV",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective V",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },
      {
        bookTitle: "Professional Elective VI",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },
      {
        bookTitle: "Mandatory Course-II",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },
      {
        bookTitle: "NCC Credit Course Level 3",
        Year: "III Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VI sem",
      },

      {
        bookTitle: "Human Values and Ethics",
        Year: "IV Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VII sem",
      },
      {
        bookTitle: "Open Elective I",
        Year: "IV Year",
        Regulation: "2021",
        department: "AI & DS",
        semester: "VII sem",
      },
    ];

    // Loop through the initial data and check if each book already exists
    for (const book of initialData) {
      const existingBooks = await collection.findOne({
        bookTitle: book.bookTitle,
        Year: book.Year,
        Regulation: book.Regulation,
        department: book.department,
        semester: book.semester,
      });

      // If the book does not exist, insert it
      if (!existingBooks) {
        // Use create or insertMany on the model
        await collection.create(book); // Correct method to insert a single document
        console.log(`Inserted: ${book.bookTitle}`);
      } else {
        console.log(`Already exists: ${book.bookTitle}`);
      }
    }
  } catch (error) {
    console.error("Error during data insertion:", error);
  }
};

insertInitialData();
app.get("/getbooks", (req, res) => {
  collection
    .find()
    .then((books) => res.json(books))
    .catch((err) => res.status(500).json(err));
});

app.get("/availableBooks", async (req, res) => {
  try {
    const books = await AvailableBook.find(); // Fetch all available books
    res.status(200).json(books); // Send the list of books as a JSON response
  } catch (error) {
    console.error("Error fetching available books:", error);
    res.status(500).send("Error fetching available books.");
  }
});

module.exports = collection;
module.exports = AvailableBook;
