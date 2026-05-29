/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PageView } from "./types";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Login from "./components/Login";
import StudyTimer from "./components/StudyTimer";
import AITutorChat from "./components/AITutorChat";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [currentView, setView] = useState<PageView>("home");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [hasProUpgrade, setProUpgrade] = useState(false);
  const [userName, setUserName] = useState("Janmayjay Singh");
  
  // Timer streak metrics state
  const [timerStreak, setTimerStreak] = useState(4);

  // Focus logged trigger callback
  const handleFocusLogged = async (minutes: number) => {
    try {
      const res = await fetch("/api/student/track-timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ durationMinutes: minutes }),
      });
      if (res.ok) {
        const data = await res.json();
        // Update timer streak metrics instantly if synchronized
        setTimerStreak(data.timerStreak);
      }
    } catch (e) {
      console.warn("Could not sync minutes with database server.");
    }
  };

  const renderActiveView = () => {
    switch (currentView) {
      case "home":
        return <Home setView={setView} isLoggedIn={isLoggedIn} />;
      case "features":
        return <Features />;
      case "pricing":
        return (
          <Pricing
            hasProUpgrade={hasProUpgrade}
            setProUpgrade={setProUpgrade}
            isLoggedIn={isLoggedIn}
            setView={setView}
          />
        );
      case "about":
        return <About setView={setView} />;
      case "login":
        return (
          <Login
            setView={setView}
            setLoggedIn={setLoggedIn}
            setUserName={setUserName}
          />
        );
      case "timer":
        return <StudyTimer onFocusLogged={handleFocusLogged} timerStreak={timerStreak} />;
      case "chat":
        return <AITutorChat />;
      case "dashboard":
        return (
          <Dashboard
            hasProUpgrade={hasProUpgrade}
            setView={setView}
            userName={userName}
          />
        );
      default:
        return <Home setView={setView} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-indigo-500/20 antialiased font-sans">
      
      {/* Visual Navigation Bar */}
      <Navbar
        currentView={currentView}
        setView={setView}
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        userName={userName}
        hasProUpgrade={hasProUpgrade}
      />

      {/* Main Viewport Container */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Modern Global SaaS Footer with M Brain Fusion identity */}
      <footer className="w-full bg-white border-t border-slate-100 py-10 mt-auto text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center p-1.5 shadow-sm">
                <img
                  src="/src/assets/images/mrivan_ai_logo_1780062977962.png"
                  alt="M Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-sans font-bold text-slate-800 tracking-tight text-lg">
                MRIVAN AI
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              Your Personal AI Teacher for Every Subject. Instant textbook answers, notes generations, and predicted exam cards.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-3">Academic Subjects</h4>
            <ul className="space-y-2 text-slate-500 font-semibold">
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">Science (Physics) Room</button></li>
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">Mathematics Matrix</button></li>
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">Organic Chemistry Lab</button></li>
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">World History Revisions</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-3">Tutor Features</h4>
            <ul className="space-y-2 text-slate-500 font-semibold">
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">Textbook Scanner OCR</button></li>
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">Revision Notes Generator</button></li>
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">MCQ Mock Test Examiner</button></li>
              <li><button onClick={() => setView("features")} className="hover:text-indigo-600 transition-colors">Rank & Grade Predictor</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-3">Startup Company</h4>
            <p className="text-slate-400 leading-relaxed mb-3 font-semibold">
              Ready for seed deployment globally. Fully optimized browser-oscillator technologies.
            </p>
            <div className="text-[10px] text-slate-400 font-mono">
              © 2026 MRIVAN AI Inc. All rights reserved. Registered Sandbox.
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
