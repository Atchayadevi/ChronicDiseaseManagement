import React, { useState } from "react";
import Sidebar from "./Sidebar";
const diseaseData = [
  {
    name: "Diabetes",
    description:
      "A chronic condition that affects the way the body processes blood glucose.",
    range: ["Fasting: 70–100 mg/dL", "Post-meal (2 hrs): <140 mg/dL"],
    diet: [
      "Eat high-fiber foods: oats, brown rice, leafy greens",
      "Avoid sugary drinks & processed carbs",
      "Include protein-rich sprouts: green gram, chickpeas",
      "Prefer small, frequent meals",
      "Limit white rice and potatoes",
    ],
    sprout:
      "Sprouted fenugreek (methi) and moong dal help control blood sugar.",
  },
  {
    name: "Hypertension",
    description: "Blood pushes too strongly against artery walls.",
    range: ["Normal BP: 120/80 mmHg"],
    diet: [
      "Reduce salt intake (<5g/day)",
      "Eat potassium-rich foods: banana, spinach, sweet potatoes",
      "Drink plenty of water",
      "Avoid fried food and red meat",
      "Include flax seeds, garlic, and sprouts",
    ],
    sprout: "Sprouted horse gram is excellent for blood pressure control.",
  },
  {
    name: "Asthma",
    description: "Inflammatory condition affecting airways.",
    range: ["PEF helps track"],
    diet: [
      "Omega-3 foods: flax seeds, walnuts",
      "Avoid dairy and cold foods if sensitive",
      "Include fruits rich in Vitamin C",
      "Ginger, turmeric tea, and sprouted grains for inflammation",
    ],
    sprout:
      "Sprouted mung bean is rich in antioxidants, supports lung function.",
  },
  {
    name: "COPD",
    description: "Long-term lung condition that makes breathing difficult.",
    diet: [
      "Eat antioxidant-rich foods: berries, tomatoes",
      "Avoid fried and salty foods",
      "High-protein diet to preserve lung muscle",
      "Stay hydrated",
      "Avoid carbonated drinks",
    ],
    sprout:
      "Sprouted lentils and microgreens strengthen immunity and respiratory health.",
  },
  {
    name: "Heart Disease",
    description:
      "Affects heart structure or function — can lead to heart attacks.",
    range: [
      "LDL (bad): <100 mg/dL",
      "HDL (good): >60 mg/dL",
      "Triglycerides: <150 mg/dL",
    ],
    diet: [
      "Eat oats, nuts, and fish",
      "Avoid red meat and trans fats",
      "Include olive oil, avocado, garlic",
      "Eat small meals regularly",
    ],
    sprout: "Sprouted moong and broccoli sprouts reduce cholesterol.",
  },
  {
    name: "Arthritis",
    description: "Joint inflammation causing pain and stiffness.",
    diet: [
      "Anti-inflammatory foods: turmeric, ginger",
      "Omega-3: chia seeds, walnuts",
      "Limit sugar and refined grains",
      "Avoid excessive red meat",
    ],
    sprout: "Alfalfa and fenugreek sprouts reduce inflammation naturally.",
  },
  {
    name: "Chronic Kidney Disease",
    description: "Slow loss of kidney function over time.",
    range: ["Creatinine: Men: 0.74–1.35, Women: 0.59–1.04 mg/dL"],
    diet: [
      "Low sodium, low potassium diet",
      "Avoid excess protein & packaged foods",
      "Stay hydrated",
      "Avoid spinach, banana, and tomato if potassium is high",
    ],
    sprout: "Sprouted horse gram (in moderation) helps detox kidneys.",
  },
  {
    name: "Thyroid Disorders",
    description: "Thyroid gland dysfunction affecting metabolism.",
    range: ["TSH Levels: 0.4–4.0 mIU/L"],
    diet: [
      "Include iodine-rich food (seaweed, eggs)",
      "Limit iodine in hyperthyroidism",
      "Avoid soy, cabbage (raw), and gluten (if sensitive)",
      "Include Brazil nuts and whole grains",
    ],
    sprout: "Sprouted moong, sunflower seeds — support hormone balance.",
  },
  {
    name: "Obesity",
    description:
      "Excess body fat increasing risk of many other chronic diseases.",
    range: ["BMI: Normal: 18.5–24.9, Overweight: 25–29.9, Obese: ≥30"],
    diet: [
      "High-fiber, low-calorie diet",
      "Drink more water",
      "Avoid sugary drinks and refined snacks",
      "Intermittent fasting may help",
      "Exercise regularly",
    ],
    sprout: "Sprouted lentils and pulses curb hunger and boost metabolism.",
  },
  {
    name: "Cancer",
    description: "Uncontrolled cell growth.",
    diet: [
      "Eat colorful vegetables (broccoli, cabbage)",
      "Avoid processed meats and sugar",
      "Drink green tea",
      "Support immune system with berries and omega-3",
    ],
    sprout:
      "Broccoli sprouts contain sulforaphane — known to fight cancer cells.",
  },
  {
    name: "Mental Health Conditions",
    description: "Disorders affecting mood, behavior, and thinking.",
    diet: [
      "Omega-3 fatty acids: flax seeds, walnuts",
      "Vitamin B-rich foods: whole grains, sprouts",
      "Avoid caffeine, alcohol, and sugar overload",
      "Stay hydrated",
      "Practice mindfulness and yoga",
    ],
    sprout: "Sprouted sunflower and pumpkin seeds enhance brain health.",
  },
  {
    name: "Alzheimer’s & Dementia",
    description: "Brain disorders affecting memory and behavior.",
    diet: [
      "Mediterranean diet (fish, olive oil, nuts)",
      "Leafy greens & berries",
      "Avoid processed sugar and unhealthy fats",
      "Include turmeric, green tea",
    ],
    sprout: "Sprouted walnuts and flax seeds help cognitive function.",
  },
];

export default function DietTabs() {
  const [activeTab, setActiveTab] = useState(diseaseData[0].name);
  const activeDisease = diseaseData.find((d) => d.name === activeTab);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-4">
        <div className="flex items-center justify-center p-4 bg-gradient-to-r bg-[#25154d]">
          <img
            src="/icons.png" // Assuming the logo is placed in the public/images directory
            alt="BookBuddy Logo"
            className="h-16 w-16 mr-4 md:h-20 md:w-20 rounded-full"
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white p-6 text-center">
            Chronic Disease Management
          </h1>
        </div>
        <div className="p-6 max-w-6xl mx-auto">
          {/* Top Nav Tabs */}
          <div className="flex flex-wrap gap-2 border-b mb-4 overflow-x-auto">
            {diseaseData.map((disease) => (
              <button
                key={disease.name}
                onClick={() => setActiveTab(disease.name)}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap rounded-t-md ${
                  activeTab === disease.name
                    ? "bg-purple-100 text-purple-800 border-b-2 border-purple-600"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-50"
                }`}
              >
                {disease.name}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow p-6 max-h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2">
              🩺 {activeDisease.name}
            </h2>
            <p className="mb-4">{activeDisease.description}</p>

            {activeDisease.range && (
              <>
                <h3 className="text-lg font-semibold">📊 Normal Range:</h3>
                <ul className="list-disc list-inside mb-4">
                  {activeDisease.range.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-lg font-semibold">🥗 Diet Tips:</h3>
            <ul className="list-disc list-inside mb-4">
              {activeDisease.diet.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold">🌱 Sprout Habit:</h3>
            <p>{activeDisease.sprout}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
