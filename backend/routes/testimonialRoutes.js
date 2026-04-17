import express from "express";
import { getTestimonials, addTestimonial } from "../controllers/testimonialController.js";

const testimonialRouter = express.Router();

testimonialRouter.get("/", getTestimonials);
testimonialRouter.post("/add", addTestimonial);

export default testimonialRouter;
