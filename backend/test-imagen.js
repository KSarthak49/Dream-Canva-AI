import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const testImagen = async () => {
    try {
        console.log("Testing Imagen API with new SDK...");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-001',
            prompt: 'Generate an image of a red apple',
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
            }
        });

        console.log("Response received!");
        if (response.generatedImages && response.generatedImages.length > 0) {
            console.log("Image bytes found:", response.generatedImages[0].image.imageBytes.length);
        } else {
            console.log("No images found in response:", JSON.stringify(response, null, 2));
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

testImagen();
