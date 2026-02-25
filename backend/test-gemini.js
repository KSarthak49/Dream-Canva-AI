import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const testGemini = async () => {
    try {
        console.log("Testing older Gemini API...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const response = await model.generateContent("Generate an image of a red apple");

        console.log("Response received!");
        console.log(response.response.text());
    } catch (error) {
        console.error("Error:", error);
    }
};

testGemini();
