# 🚀 Backend Engineer Hiring Assignment

## 📋 Objective
This project implements a **Lead Qualification & Scoring Backend Service**.

The goal is to:
- Build **clean and well-documented backend APIs**
- Integrate an **AI Model (Gemini)** for reasoning
- Use **rule-based logic** + **AI reasoning** to score leads
- Deliver a **working, testable backend** with deployment, Docker, and CI/CD

---

## 🧩 Features Implemented

✅ Offer & Lead Upload APIs  
✅ CSV Upload & Parsing  
✅ Rule-Based + AI-Based Scoring Pipeline  
✅ OpenRouter API Integration  
✅ Result Storage in Supabase DB  
✅ CSV Export Endpoint  
✅ Swagger API Documentation  
✅ Unit Tests for Rule Layer  
✅ Dockerized Application  
✅ CI/CD Pipeline (GitHub Actions)  
✅ AWS Deployment  

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend Framework** | Node.js + Express |
| **AI Integration** | Google Gemini API |
| **Database** | Supabase (PostgreSQL) |
| **File Handling** | Multer + CSV Parser |
| **Testing** | Jest |
| **Containerization** | Docker |
| **Deployment** | AWS |
| **CI/CD** | GitHub Actions |
| **Docs** | Swagger |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment Variables
Create a .env file in the project root:

env
Copy code
PORT=3001

# --- Supabase Database ---
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.lfwnlbdxawasnkxyiubk
DB_PASSWORD=Sharma@1234
DB_DATABASE=postgres
DB_SYNCHORNIZATION=true

SUPABASE_URL=https://lfwnlbdxawasnkxyiubk.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


# --- Optional ---
OPENROUTER_API_KEY=sk-or-v1-*********************
4️⃣ Run the Server
bash
Copy code
npm run start:dev
Your app will start on:
👉 http://localhost:3000

📘 API Documentation (Swagger)
Once your server is running, access the complete API documentation at:

👉 Swagger UI:

bash
Copy code
http://localhost:3000/api-docs
Swagger provides:

Interactive API testing

Request/response schema details

Example payloads for each endpoint

🧠 API Endpoints Overview
🟩 POST /offer
Accepts offer/product information.

Example Request:
json
Copy code
{
  "name": "AI Outreach Automation",
  "value_props": ["24/7 outreach", "6x more meetings"],
  "ideal_use_cases": ["B2B SaaS mid-market"]
}
🟦 POST /leads/upload
Uploads a CSV file with lead data.

CSV Columns:

pgsql
Copy code
name,role,company,industry,location,linkedin_bio
Example cURL:
bash
Copy code
curl -X POST http://localhost:3000/leads/upload \
  -F "file=@leads.csv"
🟨 POST /score
Runs the scoring pipeline (Rule + AI).

Rule Layer (50 Points Max)
Factor	Condition	Points
Role Relevance	Decision Maker	+20
Influencer	+10
Industry Match	Exact ICP	+20
Adjacent	+10
Data Completeness	All fields present	+10

AI Layer (50 Points Max)
Uses Gemini model to classify High / Medium / Low intent

Maps as:

High → +50

Medium → +30

Low → +10

Final Score = Rule Score + AI Score

🟧 GET /results
Returns all scored leads.

Example Response:
json
Copy code
[
  {
    "name": "Ava Patel",
    "role": "Head of Growth",
    "company": "FlowMetrics",
    "intent": "High",
    "score": 85,
    "reasoning": "Fits ICP SaaS mid-market and role is decision maker."
  }
]
🟪 GET /results/export
Exports the final results as a downloadable CSV file.

🧠 Example Prompt for Gemini
text
Copy code
You are a lead qualification AI. 
Given the product offer and the lead details, classify the lead's intent as High, Medium, or Low. 
Explain your reasoning in 1–2 sentences.

Offer: "AI Outreach Automation" - 24/7 outreach, 6x more meetings
Lead: "Head of Growth at FlowMetrics, SaaS industry"
🧪 Testing
Run Unit Tests:
bash
Copy code
npm run test
Covers:

Rule-based logic

CSV parsing

Endpoint validation

🐳 Docker Setup
Build Docker Image
bash
Copy code
docker build -t lead-scoring-backend .
Run Container
bash
Copy code
docker run -p 3001:3001 --env-file .env lead-scoring-backend
App runs on:
👉 http://localhost:3000

⚙️ CI/CD Pipeline
Configured with GitHub Actions to:

Run tests on every push

Build Docker image

Deploy automatically to AWS

☁️ Deployment
Deployed on AWS EC2 / Elastic Beanstalk
Live API Base URL (example):

arduino
Copy code
https://leadscore-api.example.com
🧾 Database (Supabase)
All lead and offer data is stored and visualized through Supabase
for a clear and user-friendly database dashboard.

📸 Supabase Dashboard Screenshot:

(Place your screenshot in /assets/supabase-dashboard.png before pushing to GitHub)

🧩 Folder Structure
bash
Copy code
├── src/
│   ├── config/          # env & app config
│   ├── controllers/     # API route handlers
│   ├── services/        # business logic + AI integration
│   ├── utils/           # helpers, parsers, validators
│   ├── tests/           # Jest test cases
│   └── app.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── .env
📦 Submission Summary
Feature	Status
Offer & Lead APIs	✅ Done
Scoring Pipeline	✅ Done
Gemini Integration	✅ Done
Supabase Integration	✅ Done
CSV Export	✅ Done
Swagger Docs	✅ Done
Tests	✅ Done
Docker	✅ Done
CI/CD	✅ Done
AWS Deployment	✅ Done

💡 Author
Priyanshu Sharma
Backend Developer | Node.js | NestJS | AI Integration
📧 priyanshusharma784@gmail.com
🌐 GitHub: https://github.com/Priyanshusharma07/kuvaka_tech
Leetcode : https://leetcode.com/u/Sharma00015/

