import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Testimonials = () => {
  const { backendUrl } = useContext(AppContext);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/testimonial");
        if (data.success) {
          setTestimonialsData(data.testimonials);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [backendUrl]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="flex flex-col items-center justify-center my-20 py-16 px-6 relative overflow-hidden"
    >
      {/* Background Decorative Blob */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden md:block"></div>

      <motion.h1 
        variants={itemVariants}
        className="text-4xl sm:text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 drop-shadow-sm"
      >
        Customer Testimonials
      </motion.h1>
      <motion.p 
        variants={itemVariants}
        className="text-gray-500 mb-16 text-center text-lg sm:text-xl font-medium"
      >
        What our brilliant users are saying...
      </motion.p>

      {/* Grid Container */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full z-10"
      >
        {loading
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white/40 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col items-center animate-pulse"
                >
                  <div className="bg-gray-200 rounded-full w-24 h-24 mb-5"></div>
                  <div className="bg-gray-200 h-5 w-32 rounded mb-3"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded mb-5"></div>
                  <div className="bg-gray-200 h-16 w-full rounded"></div>
                </div>
              ))
          : testimonialsData.slice(0, 6).map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white/30 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 flex flex-col items-center transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:border-blue-200"
              >
                {/* Decorative border highlight on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/20 transition-all duration-300 pointer-events-none"></div>

                <div className="relative mb-5">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full w-24 h-24 object-cover shadow-lg border-4 border-white group-hover:border-blue-50 transition-colors"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                    <img src={assets.rating_star} alt="star icon" className="w-5 h-5 drop-shadow-sm" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">{testimonial.name}</h2>
                <p className="text-blue-500 font-medium text-sm mb-4 tracking-wide uppercase">{testimonial.role}</p>
                
                {/* Star Ratings */}
                <div className="flex mb-5 gap-1 bg-white/50 py-1.5 px-3 rounded-full shadow-inner">
                  {Array(testimonial.stars)
                    .fill()
                    .map((_, idx) => (
                      <img key={idx} src={assets.rating_star} alt="star" className="w-4 h-4" />
                    ))}
                </div>

                <p className="text-center text-base text-gray-700 leading-relaxed italic relative">
                   <span className="text-3xl text-blue-200 absolute -top-4 -left-4 font-serif">"</span>
                   {testimonial.text}
                   <span className="text-3xl text-blue-200 absolute -bottom-4 -right-2 font-serif">"</span>
                </p>
              </motion.div>
            ))}
      </motion.div>
    </motion.div>
  );
};

export default Testimonials;
