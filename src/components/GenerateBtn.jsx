import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="pb-24 pt-10 text-center relative"
    >
      {/* Magical background splash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 -z-10"></div>
      
      <h1 className="text-3xl md:text-5xl lg:text-6xl mt-4 font-extrabold text-neutral-800 py-6 md:py-16 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600 drop-shadow-sm">
        See the Magic. <span className="text-blue-600">Try now</span>
      </h1>
      
      <motion.button
        onClick={onClickHandler}
        animate={{
          boxShadow: [
            "0px 0px 0px rgba(59, 130, 246, 0.4)",
            "0px 0px 30px rgba(59, 130, 246, 0.8)",
            "0px 0px 0px rgba(59, 130, 246, 0.4)",
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-12 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg m-auto transition-all"
      >
        Generate Images
        <img src={assets.star_group} alt="magic stars" className="h-6 filter brightness-0 invert" />
      </motion.button>
    </motion.div>
  );
};

export default GenerateBtn;
