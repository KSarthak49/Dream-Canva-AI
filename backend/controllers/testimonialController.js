import testimonialModel from "../models/testimonialModel.js";

// Fetch all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, testimonials });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Add a single new testimonial (good for admin/seeding)
export const addTestimonial = async (req, res) => {
  try {
    const { name, role, image, stars, text } = req.body;

    if (!name || !role || !image || !stars || !text) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const newTestimonial = new testimonialModel({
      name,
      role,
      image,
      stars,
      text,
    });

    await newTestimonial.save();
    res.json({ success: true, message: "Testimonial Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
