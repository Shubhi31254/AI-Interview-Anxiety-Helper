const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =============================
// INTERVIEW CATEGORIES
// =============================

const interviewCategories = {
  HR: [
    "Tell me about yourself.",
    "Why should we hire you?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Why do you want to join our company?",
    "Describe yourself in one word.",
    "What motivates you?"
  ],

  Technical: [
    "Explain OOP concepts.",
    "Difference between SQL and NoSQL.",
    "What is REST API?",
    "Explain DBMS normalization.",
    "What are data structures?",
    "Difference between frontend and backend.",
    "Explain operating system basics."
  ],

  Behavioral: [
    "Describe a challenge you faced.",
    "How do you manage deadlines?",
    "How do you work in teams?",
    "Describe a leadership experience.",
    "How do you handle failure?",
    "Tell me about conflict resolution."
  ],

  Managerial: [
    "How do you lead a team?",
    "Conflict resolution strategies?",
    "How do you prioritize tasks?",
    "How do you delegate work?",
    "How do you improve team productivity?"
  ],

  GD: [
    "AI replacing jobs.",
    "Remote work future.",
    "Education system improvements.",
    "Social media impact.",
    "Startup culture in India."
  ],

  Aptitude: [
    "What is 25 × 4?",
    "Find next: 2,4,8,16,?",
    "Synonym of Happy?",
    "Time and Work basics.",
    "Profit and Loss formula."
  ],

  Coding: [
    "Reverse a string.",
    "Find palindrome.",
    "Explain recursion.",
    "Sort an array.",
    "Difference between stack and queue."
  ]
};

// =============================
// GET ALL INTERVIEW TYPES
// =============================

app.get("/types", (req, res) => {
  res.json(Object.keys(interviewCategories));
});

// =============================
// GET QUESTIONS BY TYPE
// Example: /questions/HR
// =============================

app.get("/questions/:type", (req, res) => {
  const type = req.params.type;

  if (!interviewCategories[type]) {
    return res.status(404).json({
      error: "Interview type not found"
    });
  }

  res.json({
    type,
    questions: interviewCategories[type]
  });
});

// =============================
// DEFAULT ALL QUESTIONS
// =============================

app.get("/questions", (req, res) => {
  res.json(interviewCategories);
});

// =============================
// ROOT
// =============================

app.get("/", (req, res) => {
  res.send("Interview Service Running Successfully");
});

// =============================
// SERVER
// =============================

app.listen(5002, () => {
  console.log("Interview Service running on 5002");
});
