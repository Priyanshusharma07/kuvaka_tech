🧠 AI Lead Qualification Backend
🚀 Backend Engineer Hiring Assignment – Completed by Priyanshu Sharma
📘 Overview

This project implements a Lead Qualification Backend that intelligently scores and classifies leads based on Product/Offer data and uploaded Lead CSV files.
The scoring combines rule-based logic (50 pts) and AI-driven reasoning (50 pts) using Gemini API, producing a final Intent score (High / Medium / Low).

🧩 Key Features
Category	Description
🧠 AI Integration	Integrated with Gemini API to analyze offer + lead context and return human-like intent classification and reasoning.
⚙️ Rule-based Engine	Applies deterministic logic for role relevance, industry match, and data completeness.
📦 CSV Upload & Parsing	Upload and process bulk leads in CSV format via /leads/upload.
💬 Scoring Pipeline	Runs combined AI + rule-based scoring to assign intent and reasoning.
📊 Results Management	Fetch or export all scored leads in JSON or CSV format.
🧾 Swagger Docs	Fully documented REST APIs with request/response schemas.
🧱 Supabase Integration	Used as a managed PostgreSQL database for structured data visibility.
🧪 Unit Testing (Jest)	Functional tests for rule-based scoring logic and service methods.
🐳 Dockerized	Ready-to-deploy container setup for consistent environment.
☁️ CI/CD + AWS Deployment	Auto-deploy pipeline to AWS EC2 with GitHub Actions.
🧰 Tech Stack
Layer	Technology
Backend Framework	NestJS (TypeScript)
Database	PostgreSQL (Supabase)
ORM	TypeORM
AI Provider	Gemini API (Google Generative AI)
Validation	class-validator, class-transformer
Documentation	Swagger
Testing	Jest
Deployment	AWS EC2
Containerization	Docker, Docker Compose
CI/CD	GitHub Actions
⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/ai-lead-qualification.git
cd ai-lead-qualification

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment

Create a .env file in the root directory:

# Application
PORT=3001
NODE_ENV=development

# Database (Supabase)
DB_HOST=<your-supabase-host>
DB_PORT=5432
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
DB_NAME=<your-db-name>

# AI Provider
GEMINI_API_KEY=<your-gemini-api-key>

4️⃣ Run in Development
npm run start:dev

5️⃣ Run via Docker
docker-compose up --build

🔍 API Documentation (Swagger)

Once running, open Swagger UI:

http://localhost:3001/api

📤 API Endpoints
🟢 Create Offer

POST /offer

{
  "name": "AI Outreach Automation",
  "value_props": ["24/7 outreach", "6x more meetings"],
  "ideal_use_cases": ["B2B SaaS mid-market"]
}

🟠 Upload Leads (CSV)

POST /leads/upload
Form Data:

file: leads.csv


📄 Example CSV:

name,role,company,industry,location,linkedin_bio
Ava Patel,Head of Growth,FlowMetrics,SaaS,Bangalore,"India"
Rahul Mehta,Marketing Manager,DataNest,Technology,Mumbai,"India"

🧠 Run Scoring

POST /leads/score/:offerId

Response:

[
  {
    "name": "Ava Patel",
    "role": "Head of Growth",
    "company": "FlowMetrics",
    "intent": "High",
    "score": 85,
    "reasoning": "Fits ICP SaaS mid-market and is a decision maker."
  }
]

📈 Get Results

GET /leads/results

[
  {
    "name": "Rahul Mehta",
    "role": "Marketing Manager",
    "company": "DataNest",
    "intent": "Medium",
    "score": 65,
    "reasoning": "Marketing role somewhat aligned with product focus."
  }
]

📤 Export Results as CSV (Bonus)

GET /leads/export
➡️ Downloads all scored leads as a .csv file.

🧠 Scoring Logic
Layer	Criteria	Points
Rule-based (50)	Role relevance (decision maker +20 / influencer +10)
Industry match (exact ICP +20 / adjacent +10)
Data completeness (+10)	0–50
AI-based (50)	Gemini response: High (50), Medium (30), Low (10)	0–50
Final Score	rule_score + ai_score	0–100
🧪 Testing

Run Jest tests:

npm run test


Includes:

Unit tests for ruleScoreCalculator()

Mocked AI response tests for deterministic results

🐳 Docker Setup
Dockerfile

Multi-stage build for optimized image

Uses node:20-alpine for small footprint

Run
docker build -t ai-lead-qualifier .
docker run -p 3001:3001 ai-lead-qualifier

⚙️ CI/CD (GitHub Actions)

Automated pipeline includes:

Lint & Test

Build Docker image

Deploy to AWS EC2 via SSH (or GitHub Secrets)

File: .github/workflows/deploy.yml

☁️ Deployment

Live Base URL:

https://api.<your-domain>.com


Swagger:

https://api.<your-domain>.com/api

🧩 Folder Structure
src/
 ├── app.module.ts
 ├── config/
 │    ├── config.module.ts
 │    ├── config.service.ts
 ├── offers/
 │    ├── dto/
 │    │    └── create-offer.dto.ts
 │    ├── entity/
 │    │    └── offer.entity.ts
 │    ├── offers.service.ts
 │    └── offers.controller.ts
 ├── leads/
 │    ├── dto/
 │    │    └── upload-leads.dto.ts
 │    ├── entity/
 │    │    └── lead.entity.ts
 │    ├── leads.service.ts
 │    └── leads.controller.ts
 ├── common/
 │    ├── utils/
 │    │    └── scoring.helper.ts
 │    └── constants.ts
 ├── main.ts
 └── ...

🧠 Prompt Example (for Gemini AI)
Given the following:
Offer: "AI Outreach Automation" with value props ["24/7 outreach", "6x more meetings"] targeting ["B2B SaaS mid-market"]
Prospect: Ava Patel, Head of Growth at FlowMetrics (SaaS, Bangalore)

Classify the lead’s buying intent as High, Medium, or Low and provide 1-2 lines explaining your reasoning.

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Priyanshu Sharma
Backend Developer | AI + Node.js + NestJS
📧 priyanshusharma.dev@gmail.com

🔗 LinkedIn

🐙 GitHub