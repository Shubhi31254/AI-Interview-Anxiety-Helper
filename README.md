AI-Powered Interview Anxiety Helper Platform
A full-stack **Microservices-based Web Application** designed to help students and job seekers improve interview performance, reduce anxiety, and optimize resumes using AI-driven insights.

Project Overview
This platform combines **career development + mental wellness** into a single intelligent system. It provides tools for interview preparation, resume optimization, anxiety detection, and placement insights.
The system is built using a **React.js frontend**, **Node.js backend**, and follows a **Microservices Architecture** with an API Gateway.

Features
Authentication System
* User Signup & Login
* Strong password validation
* Session management using LocalStorage
* JWT Authentication (Future Scope)

Anxiety Analysis
* Accepts user emotional input
* Detects anxiety level (Low / Medium / High)
* Displays suggestions for improvement

Resume ATS Analyzer
* Resume text input + PDF upload
* ATS Score generation (/100)
* Skill detection (Java, Python, React, etc.)
* Resume improvement suggestions

Interview Preparation
* HR Questions
* Technical Questions
* Behavioral Questions
* Dynamic API-based question loading

Placement Analytics
* Salary trends visualization
* Tier-based company analysis
* Career insights dashboard

Motivation Hub
* Dynamic motivational quotes
* Encouragement system

Career Roadmap
* Career planning interface
* Skill-based guidance

System Architecture
This project follows a **Microservices Architecture**.

Core Components:
* Frontend (React.js)
* API Gateway
* Anxiety Service
* Resume Service
* Interview Service

Workflow:
1. User interacts with frontend
2. Request sent to API Gateway
3. Gateway routes request to service
4. Service processes request
5. Response sent back to frontend
6. UI updates dynamically

Tech Stack
Frontend:
* React.js
* JavaScript
* HTML5
* CSS3
* Axios

Backend:
* Node.js
* Express.js

Microservices:
* Anxiety Analyzer Service
* Resume Analyzer Service
* Interview Service

Libraries & Tools:
* Multer (File Upload)
* PDF-Parse (Resume Parsing)
* CORS
* LocalStorage (Current Database)

Development Tools:
* VS Code / Sublime Text
* Postman
* GitHub
* Chrome DevTools

Project Structure

```
AI-Interview-Anxiety-Helper/
│
├── frontend/
├── api-gateway/
├── anxiety-service/
├── resume-service/
├── interview-service/
└── README.md
```

Installation & Setup

Prerequisites:

* Node.js
* npm
* Git
* Web Browser

 Steps:

 1. Clone Repository

```bash
git clone https://github.com/your-username/AI-Interview-Anxiety-Helper.git
cd AI-Interview-Anxiety-Helper
```

---

 2. Install Dependencies

```bash
npm install
```

(Repeat inside each service folder if required)

---

 3. Run Backend Services

```bash
cd anxiety-service
node server.js
```

```bash
cd interview-service
node server.js
```

```bash
cd resume-service
node server.js
```

```bash
cd api-gateway
node server.js
```

---

 4. Run Frontend

```bash
cd frontend
npm start
```

---

 5. Open in Browser

http://localhost:3000

---

API Endpoints

 Anxiety Service

```
GET /anxiety/analyze?text=
```

Interview Service

```
GET /interview/questions
```
Resume Service

```
POST /resume/analyze-resume
POST /resume/upload-resume
```

Testing

* Unit Testing
* Integration Testing
* API Testing (Postman)
* End-to-End Testing
* UI Testing

Security Features

* Input validation
* Strong password rules
* File upload restrictions
* CORS configuration

Future Security:
* JWT Authentication
* Password hashing (bcrypt)
* Protected routes

Non-Functional Requirements
* Fast response time (<2 seconds)
* Responsive UI
* Scalable architecture
* Modular design
* Reliable API communication

Deployment

Recommended Platforms:
* Vercel (Frontend)
* Render / Railway (Backend)
* Netlify
* AWS / Azure (Future)

Limitations
* Prototype-level database (LocalStorage)
* Basic AI logic
* No real recruiter integration
* Limited real-time features

Future Enhancements

* AI Chatbot
* Voice-based anxiety detection
* NLP-based analysis
* JWT Authentication
* MongoDB integration
* Mock interview simulator


Benefits
For Students:

* Improved interview preparation
* Better resume quality
* Reduced anxiety
* Career guidance

For Institutions:
* Placement support system
* Career development platform

Contributors
* Shubhi Saxena
* Mohana Sinha Roy

References
* React Documentation
* Node.js Documentation
* Express.js Docs
* Axios Docs

Conclusion
This project demonstrates a **modern, scalable, and professional full-stack system** combining:
✔ Career Development
✔ Mental Wellness
✔ AI-Based Analysis
✔ Microservices Architecture
Making it a strong **portfolio-ready and industry-level academic project**.


⭐ If you like this project, consider giving it a star!
