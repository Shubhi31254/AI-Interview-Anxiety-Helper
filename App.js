import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const [resumeText, setResumeText] = useState("");
  const [resumeData, setResumeData] = useState(null);

  const [careerPath, setCareerPath] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  const [userProgress, setUserProgress] = useState({
    resume: false,
    dsa: false,
    projects: false,
    linkedin: false,
    internships: false,
    interviews: false
  });

  const collegeStats = {
    "IIT Bombay": { avg: "₹34 LPA", highest: "₹1.48 Cr", tier: "Tier 1" },
    "IIT Delhi": { avg: "₹32 LPA", highest: "₹1.2 Cr", tier: "Tier 1" },
    "IIT Madras": { avg: "₹30 LPA", highest: "₹1.31 Cr", tier: "Tier 1" },
    "IIT Kanpur": { avg: "₹28 LPA", highest: "₹1.9 Cr", tier: "Tier 1" },
    "NIT Trichy": { avg: "₹14 LPA", highest: "₹52 LPA", tier: "Tier 2" },
    "NIT Surathkal": { avg: "₹13 LPA", highest: "₹55 LPA", tier: "Tier 2" },
    "BITS Pilani": { avg: "₹22 LPA", highest: "₹1.8 Cr", tier: "Tier 1 Private" },
    "IIIT Hyderabad": { avg: "₹28 LPA", highest: "₹74 LPA", tier: "Tier 1" },
    "DTU Delhi": { avg: "₹15 LPA", highest: "₹82 LPA", tier: "Tier 2" },
    "NSUT Delhi": { avg: "₹16 LPA", highest: "₹1 Cr", tier: "Tier 2" },
    "VIT Vellore": { avg: "₹9 LPA", highest: "₹1.2 Cr", tier: "Tier 2 Private" },
    "SRM University": { avg: "₹7.5 LPA", highest: "₹44 LPA", tier: "Tier 3 Private" },
    "Manipal University": { avg: "₹10 LPA", highest: "₹54 LPA", tier: "Tier 2 Private" },
    "Thapar University": { avg: "₹12 LPA", highest: "₹1.2 Cr", tier: "Tier 2 Private" },
    "Amity University": { avg: "₹6 LPA", highest: "₹32 LPA", tier: "Tier 3 Private" }
  };

  // PASSWORD VALIDATION
  const validatePassword = () => {
    const strong = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!email.includes("@gmail.com")) {
      alert("Enter valid Gmail");
      return false;
    }

    if (password.toLowerCase().includes(email.split("@")[0].toLowerCase())) {
      alert("Password should NOT contain username");
      return false;
    }

    if (!strong.test(password)) {
      alert("Weak password! Must contain number + special char + 8 chars");
      return false;
    }

    return true;
  };

  // SIGNUP
  const handleSignup = () => {
    if (!validatePassword()) return;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Account Created Successfully");
    setIsSignup(false);
  };

  // LOGIN
  const handleLogin = () => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPass = localStorage.getItem("userPassword");

    if (email !== savedEmail || password !== savedPass) {
      alert("Invalid credentials");
      return;
    }

    setLoggedIn(true);
  };


  // LOGOUT
  const logout = () => {
    setLoggedIn(false);
    setSelectedService("");
  };

  // ANXIETY ANALYSIS
  const analyze = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/anxiety/analyze?text=${text}`
      );
      setResult(res.data.anxietyLevel);
    } catch {
      alert("Backend connection failed");
    }
  };

  // INTERVIEW QUESTIONS
  const loadQuestions = async (type) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/interview/questions/${type}`
    );

    setQuestions(res.data.questions);
  } catch (error) {
    console.error(error);
    alert("Interview service unavailable");
  }
};
  // RESUME ANALYZER
  const analyzeResume = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/resume/analyze-resume",
        { resumeText }
      );

      setResumeData(res.data);
    } catch {
      alert("Resume analysis failed");
    }
  };

  const roadmapCompletion = Math.round(
  (Object.values(userProgress).filter(Boolean).length /
    Object.keys(userProgress).length) *
    100
);

  const theme = darkMode
    ? {
        bg: "#0f2027",
        card: "#203a43",
        text: "white"
      }
    : {
        bg: "#f5f5f5",
        card: "#ffffff",
        text: "#111"
      };

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div style={{ ...styles.container, background: theme.bg, color: theme.text }}>
        <div style={{ ...styles.left, background: theme.card }}>
          <h1 style={styles.logo}> CareerBoost AI</h1>
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
          <p>Prepare smarter. Grow faster.</p>

          <input
            placeholder="Email"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            style={styles.btn}
            onClick={isSignup ? handleSignup : handleLogin}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p style={styles.toggle} onClick={() => setIsSignup(!isSignup)}>
            {isSignup
              ? "Already have an account? Login"
              : "New user? Create account"}
          </p>

          <button
            style={styles.modeBtn}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? " Light Mode" : " Dark Mode"}
          </button>
        </div>

        <div style={styles.right}>
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
            alt="career"
            style={styles.image}
          />
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div style={{ ...styles.dashboard, background: theme.bg, color: theme.text }}>
      <div style={styles.topBar}>
        <h1>Career Intelligence Platform</h1>

        <div>
          <button
            style={styles.modeBtn}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <p>Select your preferred service:</p>

      <div style={styles.serviceGrid}>
        <button style={styles.serviceBtn} onClick={() => setSelectedService("anxiety")}>
           Anxiety Analyzer
        </button>

        <button style={styles.serviceBtn} onClick={() => setSelectedService("interview")}>
           Interview Prep
        </button>

        <button style={styles.serviceBtn} onClick={() => setSelectedService("motivation")}>
           Motivation Hub
        </button>

        <button style={styles.serviceBtn} onClick={() => setSelectedService("placements")}>
           Placement Stats
        </button>

        <button style={styles.serviceBtn} onClick={() => setSelectedService("resume")}>
           Resume ATS Checker
        </button>

        <button style={styles.serviceBtn} onClick={() => setSelectedService("roadmap")}>
           Career Roadmap
        </button>
      </div>

      {/* ANXIETY */}
      {selectedService === "anxiety" && (
        <div style={{ ...styles.section, background: theme.card }}>
          <h2> Anxiety Checker</h2>

          <textarea
            placeholder="Describe your interview feelings..."
            style={styles.textarea}
            onChange={(e) => setText(e.target.value)}
          />

          <button style={styles.btn} onClick={analyze}>
            Analyze Anxiety
          </button>

          <h3>{result}</h3>
        </div>
      )}

      {/* INTERVIEW */}
      {selectedService === "interview" && (
  <div style={{ ...styles.section, background: theme.card }}>
    <h2> Interview Preparation Hub</h2>

    <p>Select Interview Round:</p>

    <div style={styles.serviceGrid}>
      <button style={styles.serviceBtn} onClick={() => loadQuestions("HR")}>
        HR Round
      </button>

      <button style={styles.serviceBtn} onClick={() => loadQuestions("Technical")}>
        Technical
      </button>

      <button style={styles.serviceBtn} onClick={() => loadQuestions("Behavioral")}>
        Behavioral
      </button>

      <button style={styles.serviceBtn} onClick={() => loadQuestions("Managerial")}>
        Managerial
      </button>

      <button style={styles.serviceBtn} onClick={() => loadQuestions("GD")}>
        Group Discussion
      </button>

      <button style={styles.serviceBtn} onClick={() => loadQuestions("Coding")}>
        Coding Round
      </button>

      <button style={styles.serviceBtn} onClick={() => loadQuestions("Aptitude")}>
        Aptitude
      </button>
    </div>

    <div style={{ marginTop: "20px" }}>
      <h3> Questions:</h3>

      <ul>
        {questions.length > 0 ? (
          questions.map((q, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              {q}
            </li>
          ))
        ) : (
          <p>No questions loaded yet.</p>
        )}
      </ul>
    </div>
  </div>
)}
      {/* MOTIVATION */}
{selectedService === "motivation" && (
  <div style={{ ...styles.section, background: theme.card }}>
    <h2> Ultimate Motivation Hub</h2>

    <h3> Daily Success Quotes:</h3>
    <p>“Success is where preparation meets opportunity.”</p>
    <p>“Your confidence builds your future.”</p>
    <p>“Dream big. Work hard. Stay focused.”</p>
    <p>“Every rejection is a step toward the right opportunity.”</p>
    <p>“Small daily improvements lead to massive success.”</p>

    <h3> Career Motivation Categories:</h3>

    <ul>
      <li> Placement Preparation Motivation</li>
      <li> Coding & DSA Consistency</li>
      <li> Resume Building Confidence</li>
      <li> HR + Technical Interview Confidence</li>
      <li> Mental Strength & Anxiety Reduction</li>
      <li> Networking + LinkedIn Personal Branding</li>
    </ul>

    <h3> Top YouTube Motivation Resources:</h3>

    <ul>
      <li>
        <a
          href="https://www.youtube.com/results?search_query=placement+motivation"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00c6ff" }}
        >
          Placement Motivation Videos
        </a>
      </li>

      <li>
        <a
          href="https://www.youtube.com/results?search_query=interview+motivation"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00c6ff" }}
        >
          Interview Confidence Videos
        </a>
      </li>

      <li>
        <a
          href="https://www.youtube.com/results?search_query=study+motivation+for+students"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00c6ff" }}
        >
          Study Motivation
        </a>
      </li>

      <li>
        <a
          href="https://www.youtube.com/results?search_query=linkedin+personal+branding"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00c6ff" }}
        >
          LinkedIn Growth Motivation
        </a>
      </li>
    </ul>

    <h3> Useful Career Growth Links:</h3>

    <ul>
      <li>
        <a
          href="https://roadmap.sh/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00ff99" }}
        >
          Career Roadmaps
        </a>
      </li>

      <li>
        <a
          href="https://www.geeksforgeeks.org/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00ff99" }}
        >
          DSA + Coding Practice
        </a>
      </li>

      <li>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00ff99" }}
        >
          LinkedIn Networking
        </a>
      </li>

      <li>
        <a
          href="https://www.interviewbit.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00ff99" }}
        >
          Interview Preparation
        </a>
      </li>
    </ul>

    <h3> Final Motivation:</h3>
    <p>
      “You are building a career, not just preparing for one interview.
      Stay consistent, stay fearless, and success will follow.”
    </p>
  </div>
)}

      {/* PLACEMENTS */}
      {selectedService === "placements" && (
  <div style={{ ...styles.section, background: theme.card }}>
    <h2> Advanced Placement Statistics</h2>

    <p>Select your target college:</p>

    <select
      style={styles.input}
      value={selectedCollege}
      onChange={(e) => setSelectedCollege(e.target.value)}
    >
      <option value="">Choose College</option>
      {Object.keys(collegeStats).map((college, i) => (
        <option key={i} value={college}>
          {college}
        </option>
      ))}
    </select>

    {selectedCollege && (
      <div>
        <h3> College: {selectedCollege}</h3>
        <h4> Tier: {collegeStats[selectedCollege].tier}</h4>
        <h4> Average Package: {collegeStats[selectedCollege].avg}</h4>
        <h4> Highest Package: {collegeStats[selectedCollege].highest}</h4>

        <div style={styles.graph}>
          <div style={{ ...styles.bar, height: "90%" }}>
            Highest
          </div>

          <div style={{ ...styles.bar, height: "65%" }}>
            Average
          </div>
        </div>

        <p>
          {collegeStats[selectedCollege].tier.includes("Tier 1") &&
            " Excellent placement ecosystem with premium recruiters."}

          {collegeStats[selectedCollege].tier.includes("Tier 2") &&
            " Strong opportunities with good ROI."}

          {collegeStats[selectedCollege].tier.includes("Tier 3") &&
            " Moderate placements — focus heavily on skills."}
        </p>
      </div>
    )}
  </div>
)}

      {/* RESUME */}
      {selectedService === "resume" && (
        <div style={{ ...styles.section, background: theme.card }}>
          <h2> AI Resume ATS Analyzer</h2>

          <textarea
            placeholder="Paste your complete resume here..."
            style={styles.textarea}
            onChange={(e) => setResumeText(e.target.value)}
          />

          <button style={styles.btn} onClick={analyzeResume}>
            Check ATS Score
          </button>

          {resumeData && (
            <div>
              <h3>ATS Score: {resumeData.atsScore}/100</h3>
              <h3>Status: {resumeData.status}</h3>

              <h4>Detected Skills:</h4>
              <ul>
                {resumeData.detectedSkills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>

              <h4>Suggestions:</h4>
              <ul>
                {resumeData.suggestions.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}


      {/* ROADMAP */}
      {selectedService === "roadmap" && (
  <div style={{ ...styles.section, background: theme.card }}>
    <h2> Interactive Career Roadmap</h2>

    <p>Select your desired career path:</p>

    <select
      style={styles.input}
      value={careerPath}
      onChange={(e) => setCareerPath(e.target.value)}
    >
      <option value="">Choose Career Path</option>
      <option value="frontend">Frontend Developer</option>
      <option value="backend">Backend Developer</option>
      <option value="fullstack">Full Stack Developer</option>
      <option value="ai">AI / ML Engineer</option>
      <option value="cybersecurity">Cybersecurity Expert</option>
    </select>

    {careerPath && (
      <div>
        <h3> Progress: {roadmapCompletion}%</h3>

        <div style={styles.progressBarContainer}>
          <div
            style={{
              ...styles.progressBar,
              width: `${roadmapCompletion}%`
            }}
          ></div>
        </div>

        <h4> Track your achievements:</h4>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={userProgress.resume}
            onChange={() =>
              setUserProgress({
                ...userProgress,
                resume: !userProgress.resume
              })
            }
          />
          Resume Ready
        </label>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={userProgress.dsa}
            onChange={() =>
              setUserProgress({
                ...userProgress,
                dsa: !userProgress.dsa
              })
            }
          />
          DSA + Aptitude Completed
        </label>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={userProgress.projects}
            onChange={() =>
              setUserProgress({
                ...userProgress,
                projects: !userProgress.projects
              })
            }
          />
          Projects Built
        </label>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={userProgress.linkedin}
            onChange={() =>
              setUserProgress({
                ...userProgress,
                linkedin: !userProgress.linkedin
              })
            }
          />
          LinkedIn Optimized
        </label>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={userProgress.internships}
            onChange={() =>
              setUserProgress({
                ...userProgress,
                internships: !userProgress.internships
              })
            }
          />
          Internships Completed
        </label>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={userProgress.interviews}
            onChange={() =>
              setUserProgress({
                ...userProgress,
                interviews: !userProgress.interviews
              })
            }
          />
          Interview Practice Done
        </label>

        <h4> Career Path: {careerPath.toUpperCase()}</h4>

        <p>
          {roadmapCompletion < 40 &&
            " Beginner Stage: Focus on fundamentals."}

          {roadmapCompletion >= 40 &&
            roadmapCompletion < 80 &&
            " Intermediate Stage: You're progressing strongly."}

          {roadmapCompletion >= 80 &&
            " Advanced Stage: You're placement ready!"}
        </p>
      </div>
    )}
  </div>
)}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif"
  },
  left: {
    width: "40%",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  right: {
    width: "60%"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  logo: {
    color: "#ff5722"
  },
  input: {
    marginBottom: "15px",
    padding: "12px",
    fontSize: "16px"
  },
  btn: {
    padding: "12px",
    background: "#ff5722",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px"
  },
  modeBtn: {
    padding: "10px",
    marginTop: "15px",
    cursor: "pointer"
  },
  toggle: {
    cursor: "pointer",
    marginTop: "15px",
    color: "skyblue"
  },
  dashboard: {
    padding: "40px",
    minHeight: "100vh"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoutBtn: {
    padding: "10px",
    marginLeft: "10px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  serviceGrid: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "20px"
  },
  serviceBtn: {
    padding: "15px",
    background: "#00c6ff",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    fontWeight: "bold"
  },
  section: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "10px"
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    marginBottom: "10px"
  },
  graph: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-end",
    height: "250px"
  },
  bar: {
    width: "90px",
    background: "#00c6ff",
    textAlign: "center",
    padding: "10px"
  },
  progressBarContainer: {
  width: "100%",
  background: "#ccc",
  borderRadius: "10px",
  marginBottom: "20px",
  height: "25px"
},

progressBar: {
  height: "100%",
  background: "#00ff99",
  borderRadius: "10px",
  transition: "0.5s"
},

checkboxLabel: {
  display: "block",
  marginBottom: "12px",
  fontSize: "18px"
}
};

export default App;