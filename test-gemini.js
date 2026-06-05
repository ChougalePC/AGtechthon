import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyC5FS7DyBJtRH5K6qkulViI9GO3awzKGWg";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log("Models:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error connecting to Gemini:");
    console.error(error);
  }
}

run();
