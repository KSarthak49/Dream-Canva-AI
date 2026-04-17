import express from "express";
import { generateImage, getAllImages } from "../controllers/imageController.js";
import userAuth from "../middleware/auth.js";

const imageRouter = express.Router();

imageRouter.post("/generate-image", userAuth, generateImage);
imageRouter.get("/all-images", getAllImages);

export default imageRouter;
