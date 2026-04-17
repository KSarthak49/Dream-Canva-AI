import mongoose from "mongoose";
import "dotenv/config";
import testimonialModel from "./models/testimonialModel.js";

const seedData = [
  {
    name: "Alex Rivera",
    role: "Senior Graphic Designer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    stars: 5,
    text: "DreamCanvas has completely revolutionized my workflow. The AI generates concepts in seconds that would normally take hours of brainstorming. It's simply spectacular!",
  },
  {
    name: "Samantha Lee",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    stars: 5,
    text: "The quality of the images generated is mind-blowing. The attention to detail and ability to understand complex prompts makes it the best tool out there for artists.",
  },
  {
    name: "Michael Chen",
    role: "Indie Game Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    stars: 5,
    text: "I needed quick concept art for my latest game, and this tool delivered exactly what I imagined. Fast, accurate, and truly a next-gen creative companion.",
  }
];

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");
    
    await testimonialModel.deleteMany({});
    console.log("Cleared existing testimonials...");
    
    await testimonialModel.insertMany(seedData);
    console.log("Successfully seeded testimonials!");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding testimonials:", error);
    process.exit(1);
  }
};

seedTestimonials();
