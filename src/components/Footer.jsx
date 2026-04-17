import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-20 py-10 px-6 sm:px-12 rounded-t-3xl bg-white/20 backdrop-blur-xl border-t border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative overflow-hidden"
    >
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 items-start">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <Link to="/">
            <img src={assets.logoo} alt="DreamCanvas Logo" width={160} className="drop-shadow-md hover:scale-105 transition-transform duration-300 transform -ml-2 cursor-pointer" />
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            Transforming the way you create. Bring your wildest imaginations to life instantly with our cutting-edge AI technology.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-2">Explore</h3>
          <ul className="flex flex-col gap-2 text-gray-600 font-medium">
            <Link to="/features"><li className="hover:text-blue-600 cursor-pointer transition-colors w-fit">Features</li></Link>
            <Link to="/buy"><li className="hover:text-blue-600 cursor-pointer transition-colors w-fit">Pricing</li></Link>
            <Link to="/showcase"><li className="hover:text-blue-600 cursor-pointer transition-colors w-fit">Showcase</li></Link>
            <li className="hover:text-blue-600 cursor-pointer transition-colors w-fit">API Documentation</li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-2">Stay Updated</h3>
          <div className="relative flex items-center w-full max-w-sm">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/50 border border-white/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none rounded-full py-2.5 px-5 text-sm text-gray-800 placeholder-gray-500 shadow-inner transition-all"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full text-sm font-semibold shadow-md transition-colors">
              Subscribe
            </button>
          </div>
          
          <div className="flex gap-4 mt-2">
            {[assets.facebook_icon, assets.instagram_icon, assets.twitter_icon].map((icon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition-all border border-white"
              >
                <img src={icon} alt={`Social ${index}`} className="w-5" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-300/40 text-center text-sm font-medium text-gray-500">
        &copy; {new Date().getFullYear()} <span className="text-gray-700 font-bold">DreamCanvas</span>. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
