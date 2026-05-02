const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer storage config
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() !== ".pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
});

// Resume analysis function
function analyzeResumeText(resumeText) {
  let score = 50;
  let detectedSkills = [];
  let suggestions = [];

  const skillsDatabase = [
    "JavaScript", "Python", "Java", "React", "Node", "MongoDB",
    "SQL", "HTML", "CSS", "AWS", "Docker", "Kubernetes"
  ];

  skillsDatabase.forEach(skill => {
    if (resumeText.toLowerCase().includes(skill.toLowerCase())) {
      detectedSkills.push(skill);
      score += 4;
    }
  });

  if (!resumeText.toLowerCase().includes("project")) {
    suggestions.push("Add project section.");
  }

  if (!resumeText.toLowerCase().includes("experience")) {
    suggestions.push("Add work experience or internships.");
  }

  if (!resumeText.toLowerCase().includes("certification")) {
    suggestions.push("Include certifications.");
  }

  if (detectedSkills.length < 5) {
    suggestions.push("Add more technical skills.");
  }

  if (score > 100) score = 100;

  return {
    atsScore: score,
    status: score >= 75 ? "Strong Resume " : "Needs Improvement ",
    detectedSkills,
    suggestions
  };
}

// Analyze text directly
app.post("/analyze-resume", async (req, res) => {
  try {
    const { resumeText } = req.body;
    const result = analyzeResumeText(resumeText || "");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Resume analysis failed" });
  }
});

// Upload and analyze PDF
app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const result = analyzeResumeText(pdfData.text);

    fs.unlinkSync(req.file.path);

    res.json({
      extractedText: pdfData.text,
      ...result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "PDF processing failed" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Resume Service API Running Successfully");
});

// Server start
const PORT = 5004;
app.listen(PORT, () => {
  console.log(`Resume Service running on port ${PORT}`);
});