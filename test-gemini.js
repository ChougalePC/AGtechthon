import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyC5FS7DyBJtRH5K6qkulViI9GO3awzKGWg";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function run() {
  try {
    const result = await model.generateContent("Hello");
    const response = await result.response;
    const text = response.text();
    console.log("Success:", text);
  } catch (error) {
    console.error("Error connecting to Gemini:");
    console.error(error);
  }
}

run();
