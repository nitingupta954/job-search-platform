<div align="center">
  <h1>🚀 JobHarvest </h1>
  <p><strong>The Ultimate Full-Stack AI Job Discovery Engine</strong></p>
  <p>Stop scrolling through irrelevant job posts. Let our AI backend scrape, filter, and deliver your next career move directly to a premium, glassmorphism dashboard.</p>
</div>

<hr />

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Monorepo Architecture](#-monorepo-architecture)
- [Backend (JobIntelEngine)](#-backend-jobintelengine)
- [Frontend (Job-Scraper-Frontend)](#-frontend-job-scraper-frontend)
- [Getting Started](#-getting-started)
- [SEO & Meta Architecture](#-seo--meta-architecture)

---

## 🎯 Project Overview

JobHarvest is a powerful, full-stack application designed to revolutionize the job search. By acting as an intelligent aggregator, it scrapes listings from major platforms (LinkedIn, Indeed, ZipRecruiter, Google Jobs) in real-time, filters out the noise using AI, and presents the best matches in a stunning, high-performance web app.

This repository is a **monorepo** containing both the robust Python scraping engine (`jobintelengine`) and the lightning-fast React application (`job-scraper-frontend`).

---

## ✨ Key Features

- **🕸️ Real-Time Job Scraping**: The Python backend concurrently fetches live jobs from multiple platforms, ensuring you never miss a new posting.
- **🧠 AI Matching**: Intelligent filtering eliminates noise and delivers high-quality jobs matching user skills and salary expectations.
- **🎨 Premium UI/UX**: Built with a custom Glassmorphism design system, dark mode, and smooth micro-animations.
- **🔒 Secure Authentication**: JWT-based secure login and session management.
- **🔖 Saved Jobs & Bookmarks**: Users can save job postings, manage applications, and organize their job hunt.
- **💳 Usage Tracking & Subscriptions**: Tracks user searches against tier limits with seamless checkout flows.

---

## 🏗 Monorepo Architecture

The project is split into two primary components that communicate via a REST API:

### 🐍 Backend (`/jobintelengine`)
A robust data pipeline and REST API built for high concurrency.
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Language:** Python 3.11+
- **Database:** SQLite (with SQLAlchemy ORM)
- **Migrations:** Alembic
- **Package Manager:** Poetry
- **Scraping Engine:** Custom concurrent scraper scripts

### ⚛️ Frontend (`/job-scraper-frontend`)
A modern, lightning-fast Single Page Application built with React.
- **Core:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Styling:** Vanilla CSS Modules with a robust CSS Variable system (Manrope font).
- **Routing:** [React Router v7](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **Poetry** (Python package manager)

### 1. Backend Setup (`jobintelengine`)

Navigate to the backend directory and set up the Python environment:
```bash
cd jobintelengine
poetry install
```

**Initialize the Database:**
Run Alembic migrations to build the SQLite schema.
```bash
poetry run alembic upgrade head
```
*(Optional)* Seed the database with default subscription plans:
```bash
poetry run python seed_plans.py
```

**Start the API Server:**
```bash
poetry run uvicorn app.main:app --reload --port 8000
```
*The backend will now be running at `http://localhost:8000`*

### 2. Frontend Setup (`job-scraper-frontend`)

Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd job-scraper-frontend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the frontend root:
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Start the Development Server:**
```bash
npm run dev
```
*The frontend will be available at `http://localhost:5173`*

---

## 🔍 SEO & Meta Architecture

The platform is fully optimized for search engines and social sharing:
- **Semantic Fallbacks**: Critical SEO content is injected directly into `index.html` via `<noscript>` tags, ensuring flawless indexing by basic web crawlers.
- **Dynamic Page-Level SEO**: We use `react-helmet-async` to dynamically inject optimized `<title>`, meta descriptions, and Open Graph tags per route.
- **Structured Data (JSON-LD)**: `index.html` injects `SoftwareApplication` JSON-LD schema markup to help Google generate rich search snippets.
- **Sitemap & Robots.txt**: Explicitly grants crawlers access and defines crawl priorities for core marketing routes.

<br />

<div align="center">
  <i>Built with ❤️ for job seekers everywhere.</i>
</div>
