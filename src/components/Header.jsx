import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    user ? navigate("/result") : setShowLogin(true);
  };

  return (
    <motion.div
      className="flex flex-col xl:flex-row justify-between items-center text-center xl:text-left px-4 min-h-[80vh] pt-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative floating elements */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 -z-10"></motion.div>
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-1/3 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 -z-10"></motion.div>

      {/* Text Section */}
      <div className="xl:w-1/2 flex flex-col items-center xl:items-start z-10">
        <motion.div
          className="flex justify-center items-center gap-2 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full border border-white/80 shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-neutral-600 font-semibold tracking-wide text-sm uppercase">Unleash your creativity</p>
          <img src={assets.star_icon} alt="Star Icon" className="h-5" />
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl font-extrabold max-w-[800px] mt-8 leading-tight drop-shadow-sm text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Create stunning<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md">AI-Generated Images</span><br/>
          in seconds.
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-neutral-600 max-w-xl mt-6 font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Transform your imagination into breathtaking visuals effortlessly. No design skills needed—just pure creativity!
        </motion.p>

        <motion.button
          className="text-xl font-bold text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-blue-600 hover:to-indigo-600 transition-all shadow-xl hover:shadow-blue-500/30 px-10 py-4 max-sm:px-6 rounded-full mt-10 flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClickHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Generate Magic
          <img className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500 filter brightness-0 invert" src={assets.star_group} alt="Star Group" />
        </motion.button>
      </div>

      {/* Hero Image Section */}
      <motion.div
        className="xl:w-1/2 mt-16 xl:mt-0 relative z-10 w-full flex justify-center"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 1, type: "spring", bounce: 0.4 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-30 transform -rotate-6 scale-105"></div>
          <img
            className="w-full max-w-lg lg:max-w-xl 2xl:max-w-2xl relative z-10 drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
            src={assets.header}
            alt="Header Illustration"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
