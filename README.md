# 🌾 KrishiMitra AI 

> An intelligent, proactive, and accessible AI command center designed to empower the modern Indian farmer. Built for the Hackathon.

## 🌟 Overview
Agriculture employs over 50% of India's workforce, yet farmers struggle with unpredictable weather, sudden crop diseases, and a lack of real-time actionable intelligence. KrishiMitra AI solves this by serving as a 24/7 digital agronomist—bringing enterprise-grade predictive analytics directly to the grassroots in their native language.

## ✨ Key Features

- **🌐 Zero Language Barriers:** Fully integrated native DOM translation. With a single click, the entire platform instantly translates into **Hindi**, **Marathi**, or English.
- **🧠 KrishiMitra Intelligence (AI Assistant):** A proactive chat interface powered by state-of-the-art LLMs (via OpenRouter). It accepts both text and **voice dictation**, and can even **read responses aloud**.
- **🌱 Predictive Crop & Irrigation Advisor:** Analyzes hydrological data and weather patterns to tell the farmer exactly *when* and *how much* to irrigate.
- **🔍 Plant Health Scanner:** Upload photos of crops to instantly diagnose diseases and receive AI-driven treatment recommendations.
- **📈 Market Intelligence:** Real-time economic trends and price predictions to help farmers decide exactly when to sell for maximum profit.
- **🏛️ Government Scheme Engine:** An automated eligibility engine that matches farmers to financial benefits based on their specific profile.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS (Glassmorphism & Dark Mode)
- **Authentication & Database:** Firebase
- **AI Integration:** OpenRouter API (`google/gemini-2.5-flash` for multi-modal text & vision)
- **Translation:** Google Translate Element API
- **Icons & UI:** Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- API Keys: Firebase Configuration and an OpenRouter API Key.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChougalePC/AGtechthon.git
   cd AGtechthon/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

## 💡 Why KrishiMitra?
We believe agricultural tools don't have to look boring or be hard to use. KrishiMitra features a highly premium, modern interface with dark mode and glassmorphism, ensuring farmers get a world-class user experience.

---
*Empowering the hands that feed us.*
