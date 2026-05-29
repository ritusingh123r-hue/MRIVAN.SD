/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PageView } from "../types";
import { Sparkles, Mail, Lock, User, Check, ShieldAlert, GraduationCap, ArrowRight } from "lucide-react";

interface LoginProps {
  setView: (view: PageView) => void;
  setLoggedIn: (li: boolean) => void;
  setUserName: (n: string) => void;
}

export default function Login({ setView, setLoggedIn, setUserName }: LoginProps) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
      const chosenName = name.trim() || (userRole === "teacher" ? "Prof. Singh" : "Janmayjay Singh");
      setUserName(chosenName);
      setView("dashboard");
    }, 1200);
  };

  const handleGoogleMockLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
      setUserName("Janmayjay Singh");
      setView("dashboard");
    }, 1000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#F8FAFC]">
      {/* Dynamic Animated Gradient Blobs in the Background */}
      <div className="absolute top-[20%] left-[10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Wrapper */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-xl shadow-slate-100 relative z-10">
        
        {/* Upper Brand Icon & Info */}
        <div className="text-center space-y-2.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center p-1.5 shadow-md shadow-blue-500/20 mx-auto">
            <img
              src="/src/assets/images/mrivan_ai_logo_1780062977962.png"
              alt="M Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            {isRegisterMode ? "Create Your Space" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold uppercase tracking-wider">
            {isRegisterMode ? "MRIVAN AI Student & Teacher Portal" : "Unlock Your Personalized AI Tutor"}
          </p>
        </div>

        {/* Role Toggle selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => setUserRole("student")}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              userRole === "student" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            I am a Student
          </button>
          <button
            type="button"
            onClick={() => setUserRole("teacher")}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              userRole === "teacher" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            I am a Teacher
          </button>
        </div>

        {/* Traditional Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegisterMode && (
            <div className="space-y-1">
              <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                Full Academic Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Janmayjay Singh"
                  className="w-full text-xs sm:text-sm bg-white/50 border border-slate-250 py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
              School/Institutional Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E.g., student@mrivanedu.org"
                className="w-full text-xs sm:text-sm bg-white/50 border border-slate-250 py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="space-y-1 font-sans">
            <div className="flex justify-between">
              <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                Security Password
              </label>
              {!isRegisterMode && (
                <span className="text-[10px] text-blue-600 hover:underline cursor-pointer">
                  Forgot?
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full text-xs sm:text-sm bg-white/50 border border-slate-250 py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold tracking-tight text-xs sm:text-sm shadow-md shadow-blue-500/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Authing profile...
              </>
            ) : (
              <>
                {isRegisterMode ? "Sign Up Free" : "Sign In to Classroom"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider lines */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <span className="relative z-10 px-3 bg-white/80 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">
            OR PARTNERS
          </span>
        </div>

        {/* Google mock log in button */}
        <button
          type="button"
          onClick={handleGoogleMockLogin}
          disabled={loading}
          className="w-full py-3 border border-slate-250 bg-white/90 text-slate-700 rounded-xl font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98]"
        >
          {/* Custom vector drawing of G logo to resemble high startup standards */}
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.3 1.5-.15 2.8-.97 3.75l3.08 2.39c1.8-1.66 2.85-4.11 2.85-7.99z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.08-2.39c-.86.58-1.95.93-3.08.93-2.38 0-4.4-1.61-5.11-3.79l-3.19 2.47C5.3 22.09 8.41 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M6.89 15.84a7.18 7.18 0 0 1 0-4.57V8.8L3.7 6.33a11.94 11.94 0 0 0 0 11.98l3.19-2.47z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.93 11.93 0 0 0 12 0C8.41 0 5.3 1.91 3.7 4.92l3.19 2.47C7.6 5.2 9.62 4.75 12 4.75z"
            />
          </svg>
          {isRegisterMode ? "Register using Google" : "Login with Google"}
        </button>

        {/* Change auth type text */}
        <p className="text-center text-xs text-slate-500 mt-6 pt-2 border-t border-slate-100 font-sans">
          {isRegisterMode ? "Already have a class study desk?" : "New to the MRIVAN class system?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-blue-600 hover:underline font-bold"
          >
            {isRegisterMode ? "Sign In instead" : "Create FREE desk"}
          </button>
        </p>

      </div>
    </div>
  );
}
