# 🧠 ResumeIQ — AI Resume Analyzer

> A premium full-stack AI-powered resume analyzer built with **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + Gemini API** on the backend.

![ResumeIQ](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-cyan?style=flat-square&logo=google)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **ATS Score** | Animated ring showing 0–100 keyword match score |
| 🧩 **Missing Skills** | Color-coded tags of skills/keywords your resume lacks |
| 💡 **AI Suggestions** | Up to 8 actionable improvement tips from Gemini |
| 📁 **Drag & Drop Upload** | Intuitive PDF upload with file validation |
| 🌊 **Glassmorphism UI** | Dark premium SaaS design with Framer Motion animations |
| 📱 **Mobile Responsive** | Works on all screen sizes |
| 🔔 **Toast Notifications** | Real-time feedback with react-hot-toast |

---

## 🗂 Project Structure

```
resume-analyzer/
│
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky glass navbar
│   │   │   ├── Hero.jsx            # Landing hero section
│   │   │   ├── UploadSection.jsx   # Drag-and-drop upload + job desc
│   │   │   ├── ResultsDashboard.jsx # Results layout
│   │   │   ├── ATSScoreCard.jsx    # Animated score ring
│   │   │   ├── MissingSkillsCard.jsx # Missing keyword tags
│   │   │   ├── SuggestionsCard.jsx  # AI improvement list
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Node.js + Express backend
│   ├── routes/
│   │   └── analyze.js          # POST /api/analyze
│   ├── controllers/
│   │   └── analyzeController.js # PDF parsing + Gemini call
│   ├── utils/
│   │   ├── upload.js           # Multer memory storage
│   │   └── gemini.js           # Gemini API integration
│   ├── index.js                # Express server entry
│   ├── .env.example            # Environment variable template
│   └── package.json
│
├── package.json                # Root scripts (run both together)
├── render.yaml                 # Render.com backend deploy config
├── vercel.json                 # Vercel frontend deploy config
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org))
- **Gemini API Key** — Free at [Google AI Studio](https://aistudio.google.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer
```

---

### 2. Set Up the Backend

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Copy the env template and add your key
cp .env.example .env
```

Open `server/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

### 3. Set Up the Frontend

```bash
# From the root folder
cd client
npm install
```

---

### 4. Run Both Servers

**Option A — Run separately (recommended for beginners):**

```bash
# Terminal 1 — start backend
cd server
npm run dev

# Terminal 2 — start frontend
cd client
npm run dev
```

**Option B — Run both together from root:**

```bash
# From the project root
npm install          # installs concurrently
npm run dev          # starts both servers
```

---

### 5. Open in Browser

```
http://localhost:5173
```

---

## 🔑 Getting Your Gemini API Key

1. Visit [https://aistudio.google.com/](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API key"**
4. Copy the key and paste it into `server/.env`

> 💡 The free tier of Gemini API is generous and sufficient for development.

---

## 🛠 Tech Stack

### Frontend
| Package | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| Framer Motion | 11.x | Animations & transitions |
| Axios | 1.x | HTTP client |
| React Icons | 5.x | Icon library |
| React Hot Toast | 2.x | Toast notifications |

### Backend
| Package | Version | Purpose |
|---|---|---|
| Express | 4.x | Web framework |
| Multer | 1.x | Multipart file upload |
| pdf-parse | 1.x | Extract text from PDFs |
| @google/generative-ai | 0.21.x | Gemini API SDK |
| dotenv | 16.x | Environment variables |
| cors | 2.x | Cross-origin requests |

---

## 📡 API Reference

### `POST /api/analyze`

Analyzes a resume PDF against a job description.

**Request** (multipart/form-data):
| Field | Type | Description |
|---|---|---|
| `resume` | File (PDF) | The resume file, max 5 MB |
| `jobDescription` | String | The job description text (min 20 chars) |

**Response** (JSON):
```json
{
  "success": true,
  "atsScore": 72,
  "missingSkills": ["TypeScript", "Docker", "GraphQL"],
  "suggestions": [
    "Add a dedicated Skills section near the top of your resume.",
    "Quantify your achievements with metrics (e.g., 'improved performance by 40%')."
  ]
}
```

**Error Response:**
```json
{
  "error": "No PDF resume uploaded."
}
```

---

## ☁️ Deployment

### Backend → Render.com (Free Tier)

1. Push your project to GitHub
2. Go to [render.com](https://render.com) and create a new **Web Service**
3. Connect your repository
4. Set **Root Directory** to `server`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `node index.js`
7. Add environment variables:
   - `GEMINI_API_KEY` = your Gemini API key
   - `CLIENT_URL` = your Vercel frontend URL (e.g., `https://my-app.vercel.app`)
8. Deploy!

### Frontend → Vercel (Free Tier)

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Set **Root Directory** to `client`
3. Vite is auto-detected — no extra config needed
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL (e.g., `https://my-api.onrender.com`)
5. Update `client/src/...` Axios calls to use `import.meta.env.VITE_API_URL` if needed
6. Deploy!

> **Note**: After deploying to Render, update the `CLIENT_URL` in your Render environment variables to match your Vercel URL to avoid CORS errors.

---

## 🎨 Design System

| Element | Value |
|---|---|
| Primary background | `#080c14` |
| Card background | `rgba(13,19,33,0.7)` |
| Accent cyan | `#22d3ee` |
| Accent indigo | `#6366f1` |
| Display font | Syne (Google Fonts) |
| Body font | DM Sans (Google Fonts) |
| Mono font | JetBrains Mono (Google Fonts) |

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| `GEMINI_API_KEY` not found | Ensure `.env` is in the `server/` folder, not root |
| PDF text extraction fails | Ensure PDF is text-based (not a scanned image) |
| CORS error in browser | Check `CLIENT_URL` in `server/.env` matches your frontend URL |
| "Failed to parse Gemini response" | Retry — sometimes the API returns unexpected formatting |
| Port already in use | Change `PORT` in `.env` or kill the process on that port |

---

## 📄 License

MIT — free to use, modify, and deploy.

---

##  Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hot Toast](https://react-hot-toast.com/)


