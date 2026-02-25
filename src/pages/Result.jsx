import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";

const suggestionChips = [
  "A futuristic city at sunset 🌆",
  "A magical forest with glowing mushrooms 🍄",
  "An astronaut riding a horse on Mars 🚀",
  "A cyberpunk samurai in neon rain ⚡",
  "A cozy cabin in snowy mountains 🏔️",
  "An underwater palace with coral gardens 🐠",
];

const Result = () => {
  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setIsImageLoaded(false);
    const result = await generateImage(input);
    if (result) {
      setIsImageLoaded(true);
      setImage(result);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setIsImageLoaded(false);
    setImage(null);
    setInput("");
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `dreamcanvas-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
      <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Your Vision
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Powered by Google Gemini AI ✨
            </p>
          </motion.div>

          {/* Image Display Area */}
          <div className="relative w-full aspect-square max-w-md mx-auto mb-8 rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-100 via-blue-50 to-pink-100"
                >
                  {/* Shimmer Loading */}
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                    <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" style={{ animationDuration: "2s" }} />
                  </div>
                  <p className="text-violet-700 font-semibold text-lg animate-pulse">
                    Creating magic...
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    This may take a few seconds
                  </p>
                  {/* Shimmer bar */}
                  <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-pink-500 rounded-full animate-pulse" style={{ width: "70%", animation: "shimmer 2s ease-in-out infinite" }} />
                  </div>
                </motion.div>
              ) : isImageLoaded && image ? (
                <motion.img
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  src={image}
                  alt="AI Generated"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50 border-2 border-dashed border-violet-200 rounded-2xl"
                >
                  <svg className="w-16 h-16 text-violet-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-violet-400 font-medium">Your masterpiece will appear here</p>
                  <p className="text-gray-400 text-sm mt-1">Enter a prompt below to get started</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input & Actions */}
          {!isImageLoaded ? (
            <div>
              {/* Prompt Input */}
              <form onSubmit={onSubmitHandler}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-60 group-focus-within:opacity-100 blur transition duration-500" />
                  <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-100">
                    <input
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      type="text"
                      placeholder="Describe your dream image..."
                      className="flex-1 bg-transparent outline-none px-6 py-4 text-sm md:text-base text-gray-700 placeholder:text-gray-400 rounded-full"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="mr-1.5 px-6 md:px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    >
                      {loading ? "Generating..." : "Generate ✨"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggestion Chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <p className="text-xs text-gray-400 text-center mb-3">
                  Try these prompts
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestionChips.map((chip, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(chip)}
                      className="px-3 py-1.5 text-xs bg-white/80 hover:bg-violet-50 text-gray-600 hover:text-violet-700 rounded-full border border-gray-200 hover:border-violet-300 transition-all duration-200 shadow-sm"
                    >
                      {chip}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Action Buttons after generation */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-8 py-3 rounded-full border-2 border-violet-500 text-violet-600 font-semibold hover:bg-violet-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generate Another
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-violet-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Image
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
