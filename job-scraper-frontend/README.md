<div align="center">
  <h1>🚀 JobHarvest Frontend</h1>
  <p><strong>AI-Powered Job Discovery Engine</strong></p>
  <p>Stop scrolling through irrelevant job posts. Let AI scrape, filter, and deliver your next career move directly to your dashboard.</p>
</div>

<hr />

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [State Management](#-state-management)
- [Styling System](#-styling-system)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [SEO & Meta](#-seo--meta)

---

## 🎯 Project Overview

JobHarvest is a modern, premium web application designed to streamline the job search process. By aggregating job listings from 4+ major platforms (including LinkedIn, Indeed, etc.), it uses intelligent filtering to present only the roles that match a user's exact preferences. 

The frontend is designed with a heavy focus on **performance**, **premium aesthetics**, and **seamless user experience (UX)**.

---

## ✨ Key Features

- **🔒 Authentication**: Secure login flow, including Google OAuth integration.
- **📊 Real-time Dashboard**: A powerful interface for searching and filtering job postings in real-time.
- **🔖 Saved Jobs & Bookmarks**: Users can save job postings, manage applications, and organize their job hunt.
- **⚙️ Profile & Settings**: Granular control over job preferences, account settings, and notification preferences.
- **💳 Pricing & Subscriptions**: Tiered access plans with seamless checkout flows (e.g., Stripe integration).
- **📱 Responsive & Fluid**: A mobile-first design system enhanced with Framer Motion for micro-animations and smooth page transitions.

---

## 🛠 Tech Stack & Architecture

This project is built using the latest industry standards for React development:

- **Core**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized production builds.
- **Routing**: [React Router v7](https://reactrouter.com/) for SPA navigation and route protection.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, predictable global state.
- **Styling**: Vanilla **CSS Modules** (`*.module.css`) combined with a robust CSS Variable design system.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid UI transitions and physics-based animations.
- **Icons**: [Lucide React](https://lucide.dev/) for clean, consistent SVG iconography.

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── account/         # User profile and settings components
│   ├── dashboard/       # Search bars, job cards, filters
│   ├── landing/         # Marketing site sections (Hero, Features, Pricing)
│   ├── layout/          # Global layout wrappers (Navbar, Footer)
│   ├── pricing/         # Subscription and checkout components
│   └── shared/          # Generic UI (Modals, Spinners, Toasts)
├── pages/               # Route-level components (Views)
│   ├── DashboardPage
│   ├── LandingPage
│   ├── LoginPage
│   ├── PricingPage
│   ├── SavedJobsPage
│   ├── SettingsPage
│   └── ...
├── store/               # Zustand global state slices
│   ├── useAuthStore.ts
│   ├── useBookmarksStore.ts
│   ├── useSearchStore.ts
│   └── useToastStore.ts
├── App.tsx              # Root component & Route definitions
├── index.css            # Global CSS variables, resets, and utility classes
└── main.tsx             # React entry point
```

---

## 🧠 State Management

We use **Zustand** to manage global state efficiently without the boilerplate of Redux or the re-render issues of React Context.
- `useAuthStore`: Manages user sessions, JWT tokens, and login status.
- `useBookmarksStore`: Handles saving/removing jobs and persisting bookmarked jobs across sessions.
- `useSearchStore`: Stores active search queries, filters, and pagination data for the dashboard.
- `useToastStore`: A global notification system for triggering success/error snackbars from anywhere in the app.

---

## 🎨 Styling System

We avoid heavy CSS frameworks to maintain complete control over the application's premium aesthetic. 
- **CSS Modules**: Every component has its own `.module.css` file, ensuring scoped styles and zero class-name collisions.
- **CSS Variables**: `index.css` acts as the single source of truth for design tokens (colors, spacing, shadows, radii). 
- **Glassmorphism & Dark Mode**: The app heavily utilizes translucent backgrounds (`backdrop-filter`) and deep dark tones for a modern, sleek look.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ 
- **npm** or **yarn**

### 1. Clone the repository
```bash
git clone <repository-url>
cd job-scraper-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and configure the necessary keys:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### 4. Start the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Compiles TypeScript and builds the app for production. |
| `npm run preview` | Boots up a local static web server to serve the `dist/` directory. |
| `npm run lint` | Runs `oxlint` to check for code quality and standard violations. |

---

## 🔍 Advanced SEO Architecture

The platform is fully optimized for search engines and social sharing, moving beyond static meta tags into dynamic, page-level SEO and structured data:

1. **Dynamic Page-Level SEO (`react-helmet-async`)**: 
   - We use a custom `<SEO />` component powered by `react-helmet-async` to dynamically inject optimized `<title>`, meta descriptions, and Open Graph tags on a per-page basis (e.g., specific tags for the Landing page vs. Dashboard).
2. **Structured Data (JSON-LD)**: 
   - The root `index.html` injects `SoftwareApplication` JSON-LD schema markup. This helps Google understand the exact nature of the product, its category, and publisher, generating rich snippets in search results.
3. **Sitemap & Robots.txt**:
   - `public/sitemap.xml`: Declares indexable routes (`/`, `/pricing`, `/login`) and their crawl priority.
   - `public/robots.txt`: Explicitly grants crawlers access to the site and points to the sitemap.
4. **Social Cards (Open Graph & Twitter)**:
   - Configured for large image previews (`summary_large_image`) so that sharing links on Slack, Discord, LinkedIn, or Twitter produces highly engaging preview cards.

<br />

<div align="center">
  <i>Built with ❤️ for job seekers everywhere.</i>
</div>
