import axios from "axios";
import userModel from "../models/userModel.js";
import imageModel from "../models/imageModel.js";

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        // Validate prompt
        if (!prompt) {
            return res.json({
                success: false,
                message: "Please provide a prompt to generate an image",
            });
        }

        // Find user and check credits
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: "No credits remaining. Please purchase more credits.",
                creditBalance: 0,
            });
        }

        // Check if HF Token exists (Free tier available at huggingface.co)
        const hfToken = process.env.HF_API_KEY;
        if (!hfToken) {
            return res.json({
                success: false,
                message: "Hugging Face API key is missing. Please add HF_API_KEY to your .env file.",
            });
        }

        // Generate Image using HuggingFace Inference via raw API (bypasses SDK paid routing)
        const response = await axios.post(
            'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell',
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${hfToken}`,
                    Accept: 'image/jpeg',
                    "Content-Type": "application/json"
                },
                responseType: 'arraybuffer'
            }
        );

        // Convert the binary image response to Base64
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const resultImage = `data:image/jpeg;base64,${base64Image}`;

        if (!resultImage) {
            return res.json({
                success: false,
                message: "Failed to generate image. Please try a different prompt.",
            });
        }

        // Deduct 1 credit
        await userModel.findByIdAndUpdate(userId, {
            creditBalance: user.creditBalance - 1,
        });

        // Store the generated image in the database
        const newImage = new imageModel({
            userId,
            prompt,
            image: resultImage,
        });
        await newImage.save();

        res.json({
            success: true,
            message: "Image generated successfully",
            resultImage,
            creditBalance: user.creditBalance - 1,
        });
    } catch (error) {
        console.log("Image generation error:", error.message || error);

        res.json({
            success: false,
            message: error.message || "Failed to generate image",
        });
    }
};

export { generateImage };
