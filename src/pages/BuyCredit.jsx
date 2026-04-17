import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const planPerks = {
  Basic: [
    "Standard Generation Speed",
    "Standard Definition Quality",
    "Personal Use License",
    "Email Support"
  ],
  Advanced: [
    "Fast Generation Speed",
    "High Definition (HD) Quality",
    "Commercial Use License",
    "Priority Email Support",
    "Save to Gallery"
  ],
  Business: [
    "Ultra-Fast Generation Speed",
    "4K Ultra HD Quality",
    "Full Ownership & Copyrights",
    "24/7 Dedicated Support",
    "API Access Available"
  ]
};

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razor",
            response,
            { headers: { token } }
          );
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credit Added");
          } else {
             toast.error("Payment Verification Failed")
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razor",
        { planId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-[85vh] text-center pt-10 pb-20 relative overflow-hidden"
    >
      {/* Decorative Gradients */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 -z-10"></motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 -z-10"></motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 bg-white/50 backdrop-blur-md mb-6 shadow-sm"
      >
        <span className="font-semibold text-gray-700 uppercase tracking-wider text-sm">Choose Your Plan</span>
        <img src={assets.credit_star} alt="" className="w-5 h-5"/>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 drop-shadow-sm px-4"
      >
        Supercharge Your Creativity
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg text-gray-600 max-w-2xl mx-auto mb-16 px-4 font-medium"
      >
        Unlock endless possibilities with our flexible credit plans. Whether you are a casual creator or an enterprise powerhouse, we have the right package for you.
      </motion.p>

      <motion.div 
        variants={containerVariants}
        className="flex flex-wrap justify-center gap-8 lg:gap-10 text-left w-full max-w-7xl mx-auto px-4 z-10 relative"
      >
        {plans.map((item, index) => {
          const isAdvanced = item.id === 'Advanced'; // Highlight the middle tier
          
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -15 }}
              className={`relative flex flex-col justify-between w-full max-w-[340px] rounded-3xl p-8 backdrop-blur-2xl transition-all duration-300 shadow-xl ${
                isAdvanced 
                  ? "bg-gradient-to-b from-blue-600/90 to-purple-700/90 border-transparent text-white scale-105 z-10" 
                  : "bg-white/60 border border-white/60 text-gray-800"
              }`}
            >
              {isAdvanced && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                   <h2 className="text-3xl font-extrabold tracking-tight">{item.id}</h2>
                   <div className={`p-2 rounded-lg ${isAdvanced ? 'bg-white/20' : 'bg-blue-100'}`}>
                      <img width={28} src={assets.logo_icon} alt="logo" className={`${isAdvanced ? 'filter brightness-0 invert' : ''}`} />
                   </div>
                </div>
                
                <p className={`text-sm mb-6 font-medium ${isAdvanced ? 'text-blue-100' : 'text-gray-500'}`}>{item.desc}</p>
                
                <div className="mb-8 border-b pb-8 border-gray-200/20">
                  <span className="text-5xl font-black">${item.price}</span>
                  <span className={`text-lg font-semibold ml-2 ${isAdvanced ? 'text-blue-100' : 'text-gray-500'}`}>/ {item.credits} credits</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {planPerks[item.id]?.map((perk, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isAdvanced ? 'text-green-300' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      <span className={`text-sm font-semibold ${isAdvanced ? 'text-gray-100' : 'text-gray-600'}`}>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => paymentRazorpay(item.id)}
                className={`w-full mt-auto py-3.5 rounded-xl font-bold text-base transition-all shadow-md group relative overflow-hidden ${
                  isAdvanced 
                    ? "bg-white text-blue-700 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1" 
                    : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                 <span className="relative z-10">{user ? "Purchase Now" : "Get Started"}</span>
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default BuyCredit;
