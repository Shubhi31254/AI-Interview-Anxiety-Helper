const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================
// ADVANCED ANXIETY ANALYZER FUNCTION
// =====================================

function analyzeAnxiety(text) {
  text = text.toLowerCase();

  let score = 0;
  let detectedTriggers = [];
  let tips = [];
  let motivation = [];

  // Keyword detection
  if (
  text.includes("nervous") ||
  text.includes("nervousness")
) {
  score += 2;
  detectedTriggers.push("Nervousness");
}

  if (text.includes("fear")) {
    score += 2;
    detectedTriggers.push("Fear");
  }

  if (text.includes("confused")) {
    score += 1;
    detectedTriggers.push("Confusion");
  }

  if (text.includes("panic")) {
    score += 3;
    detectedTriggers.push("Panic");
  }

  if (text.includes("stress")) {
    score += 2;
    detectedTriggers.push("Stress");
  }

  if (text.includes("anxiety")) {
    score += 3;
    detectedTriggers.push("Anxiety");
  }

  if (text.includes("pressure")) {
    score += 2;
    detectedTriggers.push("Performance Pressure");
  }

  // Anxiety level
  let level = "Low";
  if (score >= 7) level = "Severe";
  else if (score >= 4) level = "High";
  else if (score >= 2) level = "Medium";

  // Suggestions based on level
  if (level === "Low") {
    tips = [
      "Maintain confidence and continue preparation.",
      "Practice light breathing exercises.",
      "Stay consistent with mock interviews."
    ];
  }

  if (level === "Medium") {
    tips = [
      "Practice deep breathing for 5 minutes daily.",
      "Take mock interviews regularly.",
      "Prepare common HR and technical questions.",
      "Reduce overthinking with structured preparation."
    ];
  }

  if (level === "High") {
    tips = [
      "Use guided meditation before interviews.",
      "Practice speaking with mentors/friends.",
      "Break preparation into smaller milestones.",
      "Focus on confidence-building exercises.",
      "Take proper sleep and reduce burnout."
    ];
  }

  if (level === "Severe") {
    tips = [
      "Seek professional stress management guidance.",
      "Practice mindfulness daily.",
      "Take scheduled breaks.",
      "Use breathing techniques immediately.",
      "Avoid excessive pressure and comparison.",
      "Focus on mental wellness first."
    ];
  }

  // Motivation
  motivation = [
    "You are more prepared than you think. ",
    "Confidence grows with action. ",
    "Every interview is practice for success. ",
    "Fear decreases when preparation increases. "
  ];

  return {
    anxietyLevel: level,
    stressScore: score,
    detectedTriggers,
    tips,
    motivation,
    breathingExercise:
      "Inhale for 4 sec → Hold for 4 sec → Exhale for 4 sec → Repeat 5 times."
  };
}

// =====================================
// POST API
// =====================================

app.post("/analyze", (req, res) => {
  const text = req.body.text || "";
  const result = analyzeAnxiety(text);

  res.json(result);
});

// =====================================
// GET API
// =====================================

app.get("/analyze", (req, res) => {
  const text = req.query.text || "";
  const result = analyzeAnxiety(text);

  res.json(result);
});

// =====================================
// ROOT
// =====================================

app.get("/", (req, res) => {
  res.send("Advanced Anxiety Service Running Successfully");
});

// =====================================
// SERVER
// =====================================

app.listen(5003, () => {
  console.log("Anxiety Service running on 5003");
});
