import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [state, setState] = useState("Login");
  const { showLogin, setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] backdrop-blur-md bg-black/40 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white/90 backdrop-blur-3xl border border-white/50 p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-4"
      >
        {/* Login Form */}
        <form onSubmit={onSubmitHandler} className="w-full max-w-sm flex flex-col items-center">
          <h1 className="text-3xl text-gray-800 font-extrabold mb-2 tracking-tight">
            {state === "Login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm font-medium text-gray-500 mb-8 text-center">
            {state === "Login" 
              ? "Sign in to continue creating masterpieces." 
              : "Register today to unleash your creativity."}
          </p>

          <div className="w-full space-y-4">
            {state !== "Login" && (
              <div className="bg-white px-5 py-3 flex items-center gap-3 rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
                <img src={assets.profile_icon} alt="" className="w-5 h-5 opacity-50" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  className="outline-none w-full bg-transparent text-sm text-gray-700"
                  required
                />
              </div>
            )}
            
            <div className="bg-white px-5 py-3 flex items-center gap-3 rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
              <img src={assets.email_icon} alt="" className="w-5 h-5 opacity-50" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Address"
                className="outline-none w-full bg-transparent text-sm text-gray-700"
                required
              />
            </div>
            
            <div className="bg-white px-5 py-3 flex items-center gap-3 rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
              <img src={assets.lock_icon} alt="" className="w-5 h-5 opacity-50" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="outline-none w-full bg-transparent text-sm text-gray-700"
                required
              />
            </div>
          </div>

          <div className="w-full flex justify-end mt-2">
            <p className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors">
              Forgot password?
            </p>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 w-full text-white py-3.5 rounded-xl font-bold mt-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            {state === "Login" ? "Login" : "Sign Up"}
          </button>

          {state === "Login" ? (
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </p>
          )}

          {/* Close Button */}
          <div 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setShowLogin(false)}
          >
             <img src={assets.cross_icon} alt="Close" className="w-3 object-contain" />
          </div>
        </form>

        {/* Image on the Right */}
        <div className="hidden md:block w-80 relative rounded-2xl overflow-hidden shadow-md">
           <div className="absolute inset-0 bg-blue-600 mix-blend-overlay opacity-20"></div>
           <img
             src={assets.login}
             alt="Login Illustration"
             className="w-full h-full object-cover"
           />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
