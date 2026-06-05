import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyBx6FDFQPve7c-rSSVtIPWvkjTtK2VJRmQ";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function run() {
  try {
    console.log("Request 1...");
    await model.generateContent("Hello 1");
    console.log("Request 2...");
    await model.generateContent("Hello 2");
    console.log("Request 3...");
    await model.generateContent("Hello 3");
    console.log("Success: all 3 completed.");
  } catch (error) {
    console.error("Error connecting to Gemini:");
    console.error(error);
  }
}

run();
