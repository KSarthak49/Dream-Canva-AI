import React from "react";
import Description from "../components/Description";
import Steps from "../components/Steps";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-14 pb-20"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-500 mb-4">
          Powerful Features
        </h1>
        <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
          Discover all the tools and capabilities available in DreamCanvas to push your art to the next level.
        </p>
      </div>

      <Steps />
      <Description />
    </motion.div>
  );
};

export default Features;
