import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const testGemini = async () => {
    try {
        console.log("Testing gemini-2.5-flash-image again...");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: "Generate an image of a red apple",
            config: {
                responseModalities: ["IMAGE"],
            },
        });

        console.log("Response received!");
        if (response.candidates && response.candidates[0]?.content?.parts) {
            console.log("Parts found:", response.candidates[0].content.parts.length);
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    console.log("MimeType:", part.inlineData.mimeType);
                    console.log("Saving image to test-image.png...");
                    const buffer = Buffer.from(part.inlineData.data, "base64");
                    fs.writeFileSync("test-image.png", buffer);
                    console.log("Successfully saved test-image.png!");
                }
            }
        }
    } catch (error) {
        console.error("Full error:", error.message || error);
    }
};

testGemini();
