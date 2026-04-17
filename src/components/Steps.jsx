import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="flex flex-col items-center justify-center my-32 relative"
    >
      <motion.div 
        variants={itemVariants}
        className="absolute top-1/2 left-1/4 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 -z-10"
      ></motion.div>
      
      <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 drop-shadow-sm">
        How It Works
      </motion.h1>
      <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-12 font-medium">
        Transform Words Into Stunning Images in Minutes
      </motion.p>
      
      <div className="space-y-6 w-full max-w-3xl px-4">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 10 }}
            className="group relative flex items-center gap-6 p-6 sm:px-10 bg-white/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 cursor-pointer transition-all rounded-2xl hover:bg-white/50 hover:shadow-xl hover:border-blue-200"
          >
            {/* Index Number Watermark */}
            <h1 className="absolute -left-6 top-2 text-7xl font-bold text-gray-200/50 -z-10 group-hover:text-blue-100 transition-colors">
              0{index + 1}
            </h1>
            
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 group-hover:shadow-blue-200 transition-all">
              <img src={item.icon} alt={item.title} className="w-8" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
