import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Showcase = () => {
  const { backendUrl } = useContext(AppContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/image/all-images");
        if (data.success) {
          setImages(data.images);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch showcase images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [backendUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-14 pb-20 relative"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
          Community Showcase
        </h1>
        <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
          Explore breathtaking AI-generated masterpieces created by our brilliant community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mb-20">
        {loading ? (
          // Skeleton Loaders
          Array(8).fill(0).map((_, index) => (
             <div key={index} className="overflow-hidden rounded-2xl shadow-lg border border-white/50 bg-white/40 animate-pulse h-64 w-full"></div>
          ))
        ) : images.length > 0 ? (
          images.map((imgData, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-lg border-4 border-white/50 relative group bg-white"
            >
              <img src={imgData.image} alt={imgData.prompt} className="w-full h-64 object-cover" />
              
              {/* Overlay with Prompt and Author info */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-white font-semibold text-sm italic mb-2 line-clamp-3">"{imgData.prompt}"</span>
                <span className="text-blue-300 font-bold text-xs">By {imgData.userId?.name || "DreamCanvas User"}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <h2 className="text-2xl font-bold text-gray-500">No images generated yet!</h2>
            <p className="text-gray-400 mt-2">Generate some images and they will appear here.</p>
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default Showcase;
