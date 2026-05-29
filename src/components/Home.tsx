/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageView } from "../types";
import { Sparkles, ArrowRight, Brain, BookOpen, Clock, BarChart3, Star, CheckCircle, Shield, ArrowUpRight } from "lucide-react";

interface HomeProps {
  setView: (view: PageView) => void;
  isLoggedIn: boolean;
}

export default function Home({ setView, isLoggedIn }: HomeProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-x-hidden pt-6 pb-16 bg-[#F8FAFC]">
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-blue-400/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-400/10 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Bento Hero Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
          {/* Hero Wording Column (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6" id="hero-info-panel">
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 bg-blue-50/70 border border-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="relative flex h-20_ w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              The Billion-Dollar AI Tutor is Here
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 font-sans">
              Your Personal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                AI Teacher
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md">
              MRIVAN AI helps students learn faster by explaining textbooks, generating concise revision summaries, creating customized practice exams, and tracking mock metrics in absolute real time.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => setView(isLoggedIn ? "chat" : "login")}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-850 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] transition-all cursor-pointer"
                id="cta-try-tutor"
              >
                Try AI Tutor
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setView(isLoggedIn ? "dashboard" : "login")}
                className="px-6 py-4 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-slate-950 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer"
                id="cta-start-free"
              >
                Start Learning Free
              </button>
            </div>

            {/* Glowing active metrics widget */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-600">AR</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-700">SP</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 overflow-hidden flex items-center justify-center text-[10px] font-bold text-white bg-indigo-600">MD</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[9px] text-white font-bold shadow-inner">+12k</div>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Students active in physics, chemistry & maths focus groups today
              </span>
            </div>
          </div>

          {/* Interactive Hero Bento Grid Showcase (Right 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6" id="hero-bento-grid">
            
            {/* Top Full/Spanning Hero Image Block */}
            <div className="md:col-span-2 bg-gradient-to-tr from-white to-slate-50 border border-slate-200 rounded-[32px] overflow-hidden shadow-md flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="flex-1 space-y-3">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100">
                  <Star className="w-3 h-3 fill-indigo-100 inline" /> Next-Gen Technology
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  High-Performance Interactive Classroom
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Engineered with Gemini 3.5-flash learning technology. Upload files, capture blackboard screenshots, or consult textbook topics for an instant conversational explanation.
                </p>
                <button 
                  onClick={() => setView("features")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  Explore Core Features <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              
              <div className="w-full md:w-48 h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-inner">
                <img
                  src="/src/assets/images/hero_student_ai_1780062958901.png"
                  alt="Students consulting AI holographic screen"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Bento Block 1: Real-time AI chat widget simulation */}
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[280px]">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  AI TUTOR LIVE
                </span>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between text-xs gap-3">
                <div className="bg-slate-100 text-slate-700 rounded-2xl rounded-tl-none p-3 max-w-[90%] leading-relaxed">
                  &ldquo;Explain Newton's inertia with a road vehicle example?&rdquo;
                </div>
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-3 self-end max-w-[90%] leading-relaxed">
                  💡 Jab bus achanak chalti hai, toh ham piche girte hain kyunki humari body rest me rehna chahti hai! It's Inertia of Rest.
                </div>
                <div className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl flex items-center px-3 gap-2 mt-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  <div className="text-[10px] text-slate-400 italic">MRIVAN AI is explaining...</div>
                </div>
              </div>
            </div>

            {/* Bento Block 2: Interactive Study Timer / Streak Card */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 rounded-[32px] p-6 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between h-[280px]">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="w-5 h-5 text-indigo-100" />
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
                  POMODORO focus
                </div>
              </div>
              
              <div className="text-center my-2">
                <div className="text-4xl font-mono font-bold tracking-tighter">
                  24:58
                </div>
                <div className="text-[10px] text-slate-200 tracking-widest uppercase mt-1">
                  Active Sprint
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-indigo-100">
                  <span>Daily Target: 45 min</span>
                  <span className="font-bold">85% Done</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-white rounded-full"></div>
                </div>
                <div className="text-[9px] text-center text-indigo-200 italic mt-1">
                  🔥 Streak: 4 Days Strong
                </div>
              </div>
            </div>

            {/* Bento Block 3 (Col-spanning 2): Performance Analytics & Exam Predictor Summary */}
            <div className="md:col-span-2 bg-slate-900 rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                      EXAM PERFORMANCE SCORE PREDICTOR
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Predict & Perfect Your Scores</h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Take short simulated quizzes created by the AI. Each correct response improves your predicted grades and pinpoints critical vocabulary to focus on.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-750 p-4 rounded-2xl flex flex-col items-center justify-center text-center w-full md:w-36 flex-shrink-0">
                  <span className="text-xs font-semibold text-slate-300">Grade Target</span>
                  <span className="text-3xl font-extrabold text-green-400 my-0.5">92%</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest">Predicted Score</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* trust logos footer rail with elegant spacing */}
        <div className="border-t border-slate-100 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 opacity-35 grayscale flex-wrap justify-center sm:justify-start">
            <span className="text-xs font-black tracking-widest">IIT DELHI</span>
            <span className="text-xs font-black tracking-widest">KENDRIYA VIDYALAYA</span>
            <span className="text-xs font-black tracking-widest">BYJU&apos;S</span>
            <span className="text-xs font-black tracking-widest">KHAN ACADEMY</span>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs text-slate-500 font-medium">
              Featured as a disruptive startup idea with premium custom design
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Top Academic AI Platform of 2026
            </p>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-24 text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Why Students &amp; Educators Outperform with MRIVAN AI
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Standard educational methods expect every student to study identically. MRIVAN AI adapts to your speed, explains tricky topics in multi-lingual modes, and generates customized revision tools in a single click.
          </p>
        </div>

        {/* Bento highlights feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col items-start gap-3">
            <span className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              <Brain className="w-6 h-6" />
            </span>
            <h3 className="font-bold text-lg text-slate-900 mt-2">Bilingual Voice &amp; Chat</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Struggling with advanced English terminologies? MRIVAN AI automatically translates concepts into a natural blend of Hindi, Hinglish, Bhojpuri, and English.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col items-start gap-3">
            <span className="p-3 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
              <BookOpen className="w-6 h-6" />
            </span>
            <h3 className="font-bold text-lg text-slate-900 mt-2">Summarize &amp; Save Notes</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Upload textbook scans, image clippings or lecture snapshots. Our AI generates formatted, readable revision tables, bullet lists, and summary points instantly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col items-start gap-3">
            <span className="p-3 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
              <CheckCircle className="w-6 h-6" />
            </span>
            <h3 className="font-bold text-lg text-slate-900 mt-2">Classroom Class Exams</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Stop waiting for mock papers. Our AI Examiner generates high-yield MCQ questionnaires with immediate response feedback and detailed explanations.
            </p>
          </div>
        </div>

        {/* Call to action section */}
        <div className="mt-20 p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-20%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl text-left space-y-4">
            <span className="text-[10px] uppercase tracking-widest font-bold bg-white/25 px-2.5 py-1 rounded">
              Launch Program Promotion
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Get Unlimited Solutions, Notes &amp; Exams For Only ₹199/month
            </h2>
            <p className="text-slate-100 text-sm max-w-lg leading-relaxed">
              Unlock the premium Pro Upgrade today to enjoy unlimited AI chat questions, continuous streak saving, advanced analytics, and no intrusive advertisements.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setView("pricing")}
                className="px-6 py-3 bg-white text-blue-700 hover:text-blue-900 rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
              >
                Sign Up for Pro Plan
              </button>
              <button
                onClick={() => setView("about")}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-semibold transition-all cursor-pointer"
              >
                Learn Our Philosophy
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
