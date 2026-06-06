<div align="center">
  <h1>🌾 KrishiMitra AI</h1>
  <p><strong>An intelligent, proactive, and fully localized AI command center designed to empower the modern Indian farmer.</strong></p>
  <p><em>Built for the Hackathon</em></p>
</div>

<hr />

## 📖 Table of Contents
1. [The Problem Statement](#-the-problem-statement)
2. [Our Solution & Philosophy](#-our-solution--philosophy)
3. [Deep Dive into Features](#-deep-dive-into-features)
4. [Multilingual Accessibility Architecture](#-multilingual-accessibility-architecture)
5. [System Architecture & Tech Stack](#-system-architecture--tech-stack)
6. [UI/UX Design Principles](#-uiux-design-principles)
7. [Installation & Setup Guide](#-installation--setup-guide)
8. [Future Scope & Scalability](#-future-scope--scalability)
9. [Contributors](#-contributors)

---

## 🚨 The Problem Statement
Agriculture forms the backbone of the Indian economy, employing over 50% of the nation's workforce and contributing massively to the GDP. Despite this, the agricultural sector remains highly vulnerable and technologically disconnected at the grassroots level. 

Farmers routinely struggle with:
- **Unpredictable Weather:** Resulting in massive crop losses due to a lack of hyperlocal, actionable forecasting.
- **Crop Diseases:** Pests and blights can destroy yields within days if not diagnosed and treated immediately.
- **Information Asymmetry:** Fluctuating market prices lead to farmers selling their produce at a loss to middlemen.
- **Lack of Accessibility:** Most modern Agritech solutions are built exclusively in English, with complex, intimidating interfaces that alienate the very people they are meant to help.

## 🌟 Our Solution & Philosophy
**KrishiMitra AI** was built to solve these exact problems by acting as a **24/7 digital agronomist**. 

Rather than overwhelming the user with raw data, KrishiMitra synthesizes complex agricultural data into immediate, actionable insights. We believe that world-class, enterprise-grade predictive analytics should be available to the everyday farmer in their native language, presented through a premium, frictionless interface.

---

## ✨ Deep Dive into Features

KrishiMitra is not just a single tool; it is a unified command center housing several interconnected micro-applications.

### 🧠 1. KrishiMitra Intelligence (AI Assistant)
A centralized chat interface powered by state-of-the-art Large Language Models (LLMs).
- **Context-Aware:** The AI knows the farmer's location, soil type, primary crops, and current weather, providing highly personalized advice without needing to be prompted.
- **Multimodal Vision:** Farmers can directly upload images of their fields or diseased crops to the chat. The AI will instantly analyze the image and respond with actionable treatments.
- **Voice Dictation & Text-to-Speech:** To cater to users with limited literacy, the assistant accepts native voice commands and can read its responses aloud.

### 🌐 2. Zero-Friction Native Translation
The entire platform is built with absolute linguistic inclusivity in mind.
- We utilize dynamic DOM translation integration to instantly convert the *entire* platform—from AI-generated paragraphs to hidden tooltips—into **Marathi**, **Hindi**, or English with a single click.

### 🌱 3. Predictive Crop & Irrigation Advisor
Water scarcity is a massive issue. KrishiMitra optimizes resource usage natively.
- **Hydrological Analysis:** Tracks soil moisture, recent rainfall, and upcoming forecasts to calculate exact irrigation windows.
- **Crop Rotation:** Suggests optimal crops based on soil degradation metrics and seasonal changes to maximize yield.

### 🔍 4. Plant Health Scanner (Disease Detection)
A dedicated module for crop health management.
- Users can drag and drop images of an affected leaf.
- The system runs the image through an AI vision model to identify blights, rust, pests, or nutrient deficiencies.
- Outputs a step-by-step biological and chemical treatment plan, including organic alternatives.

### 📈 5. Market Intelligence & Economics
Eliminates information asymmetry and prevents middleman exploitation.
- Tracks real-time commodity prices and volatility.
- Predicts future price trends based on supply chain analytics, telling the farmer exactly whether to *Hold* or *Sell*.

### 🏛️ 6. Government Scheme Eligibility Engine
Billions of dollars in government agricultural subsidies go unclaimed every year.
- Our custom eligibility engine maps the farmer's profile (farm size, location, crop type, financial status) against a database of active government schemes.
- Provides a clear "Match Score" and a step-by-step breakdown of how to apply for the funds.

### 🌤️ 7. Weather Intelligence & Command Center
More than just a weather widget, this is an impact analyzer.
- Instead of just saying "It will rain," the system warns: *"High probability of rain tomorrow. Delay pesticide application on your Wheat crop to prevent chemical runoff."*

---

## 🏗️ Multilingual Accessibility Architecture
To ensure true accessibility, we implemented a hybrid translation architecture:
- **Floating Global Selector:** A visually distinct, globally accessible language dropdown that floats on the bottom right of the screen at all times.
- **Dynamic DOM Injection:** Instead of manually maintaining thousands of lines of JSON localization files, we integrated a headless Google Translate Element. When a language is selected, a `googtrans` cookie is injected, instantly re-rendering the entire React DOM into the native language without layout shifts or API rate limits.

---

## 📂 Project Structure
```text
frontend/
├── app/                  # Main React Entry point directory
│   └── index.html        # App HTML template (with Google Translate injection)
├── src/                  # React Application Source
│   ├── components/       # Reusable UI components (Navigation, LanguageSelector, etc.)
│   ├── context/          # Global React Context providers (e.g., AuthContext)
│   ├── layouts/          # Shared page layouts (DashboardLayout wrapping all routes)
│   ├── pages/            # Core feature pages (AIAssistant, DiseaseDetection, GovernmentSchemes...)
│   ├── utils/            # Helper functions, AI logic, and mock databases
│   ├── main.jsx          # React initialization and Router configuration
│   └── index.css         # Tailwind configurations and global aesthetic styles
├── index.html            # Public landing/marketing page (Three.js animated)
├── vite.config.js        # Vite build & dynamic routing configuration
└── package.json          # Project dependencies & scripts
```

---

## ⚙️ System Architecture & Tech Stack

KrishiMitra AI is built on a modern, robust, and highly scalable stack:

- **Frontend Framework:** `React 18` powered by `Vite` for lightning-fast HMR and optimized production builds.
- **Routing:** `React Router v6` utilizing nested layout structures (`DashboardLayout`) to maintain global state (like weather context and user profiles) across all pages.
- **Styling:** `Tailwind CSS v4`. We built a custom design token system focusing on deeply immersive glassmorphism, fluid typography, and dark mode aesthetics.
- **Icons & UI Elements:** `Lucide React` for crisp, scalable, and consistent iconography.
- **Authentication & Backend:** `Firebase Auth` for secure, seamless user login and session management.
- **Artificial Intelligence Engine:** 
  - Powered by **OpenRouter API**.
  - Utilizing `google/gemini-2.5-flash` for high-speed, multimodal inference (processing both text and complex agricultural images in real-time).
  - Explicitly configured with precise system prompts, localized context injection, and `max_tokens` limits to ensure reliable, cost-effective generation.

---

## 🎨 UI/UX Design Principles
We strongly believe that agricultural software shouldn't look like an outdated government portal. KrishiMitra was designed with the visual fidelity of a high-end fintech application.
- **Dark Mode Default:** Reduces eye strain and saves battery life on mobile devices in the field.
- **Glassmorphism:** We heavily utilized backdrop-blurs, semi-transparent borders, and subtle glows to create a sense of depth and hierarchy.
- **Micro-interactions:** Every button, card, and input field features smooth CSS transitions, hover states, and active feedback to make the app feel alive and responsive.
- **Responsive Design:** 100% mobile-first architecture. The complex dashboard naturally reflows into a single, highly readable column on smartphones.

---

## 🚀 Installation & Setup Guide

To run KrishiMitra AI locally on your machine, follow these exhaustive steps:

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- A registered account on [OpenRouter.ai](https://openrouter.ai/) for the LLM API key.
- A Google Firebase account (if you intend to configure a custom backend).

### 2. Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/ChougalePC/AGtechthon.git
cd AGtechthon/frontend
```

### 3. Install Dependencies
Install all required React packages and Tailwind plugins:
```bash
npm install
```

### 4. Environment Variables Configuration
For the AI Assistant and authentication to work, you must provide the necessary API keys.
Create a new file named `.env` in the root of the `frontend/` directory:
```bash
touch .env
```
Open the `.env` file and add your keys:
```env
# Required for KrishiMitra Intelligence (Chat & Vision)
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here

# (Optional) Direct Gemini fallback key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start the Development Server
Launch the Vite hot-reloading server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`. 
*(Note: Because of our custom Vite routing configuration, accessing the root URL will automatically redirect you to the React application entry point at `/app/index.html`.)*

---

## 🔮 Future Scope & Scalability
While built for the Hackathon, KrishiMitra is designed with massive scale in mind. Our roadmap includes:
1. **Feature Phone Compatibility (SMS Integration):** We plan to integrate Twilio to allow farmers without smartphones to text queries to KrishiMitra and receive AI-generated SMS advice.
2. **IoT Integration:** Connecting KrishiMitra directly to physical soil moisture sensors and automated drip irrigation systems via MQTT.
3. **B2B Supply Chain Linking:** Creating a marketplace where predictive harvest data can be sold directly to FMCG companies, eliminating middlemen entirely.

---

<div align="center">
  <p><i>Empowering the hands that feed us. Built with ❤️ for the Hackathon.</i></p>
</div>
