import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28 text-center md:text-left relative"
    >
      {/* Decorative Blob */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 -z-10"></motion.div>

      <motion.h1 
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-500 drop-shadow-md text-center w-full"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Create AI Images Effortlessly
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-16 text-lg max-w-2xl text-center w-full mx-auto font-medium"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Transform simple text prompts into breathtaking visuals in just seconds. No artistic skills? No problem. Just describe your vision, and let AI bring it to life.
      </motion.p>
      
      <div className="flex flex-col gap-12 lg:gap-20 lg:flex-row items-center w-full bg-white/40 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
        <motion.div
          className="relative w-full lg:w-1/2 flex justify-center perspective-1000"
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="absolute inset-0 bg-blue-500 rounded-2xl transform translate-x-4 translate-y-4 opacity-20 filter blur-xl"></div>
          <img
            src={assets.sample_img_1}
            alt="AI Generated Example"
            className="w-full max-w-md rounded-2xl shadow-2xl relative z-10 border-4 border-white object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col gap-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 tracking-tight">
              Turn Your Imagination into Reality
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              From concept art to branding materials, futuristic landscapes to fantasy characters—generate high-quality images instantly with our powerful AI.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 tracking-tight">
              AI-Powered Text-to-Image Engine
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our cutting-edge AI understands your words and transforms them into visually stunning artwork. Your imagination is the only limit.
            </p>
          </div>

          <div className="bg-white/50 rounded-2xl p-6 shadow-inner border border-white/50">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Endless Possibilities
            </h2>
            <ul className="text-gray-700 leading-relaxed space-y-3 font-medium">
              <li className="flex items-center gap-3"><span className="text-2xl">💡</span> Type your idea and watch AI generate visuals.</li>
              <li className="flex items-center gap-3"><span className="text-2xl">🎨</span> Crisp, detailed, professional-grade images.</li>
              <li className="flex items-center gap-3"><span className="text-2xl">🚀</span> Get stunning outputs in seconds, no technical skills.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Description;
