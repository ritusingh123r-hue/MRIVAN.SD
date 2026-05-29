/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, FileText, Settings, LineChart, Award, Timer, Sparkles, Languages, Check, ArrowRight, Play, CheckCircle } from "lucide-react";

interface FeatureDetail {
  id: string;
  title: string;
  badge: string;
  icon: any;
  color: string;
  intro: string;
  details: string[];
  mockData: {
    title: string;
    description: string;
    content: React.ReactNode;
  };
}

export default function Features() {
  const [activeTab, setActiveTab] = useState<string>("textbook");

  const featuresList: FeatureDetail[] = [
    {
      id: "textbook",
      title: "AI Textbook Reader",
      badge: "Multilingual OCR & Speech",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      intro: "Snap an image or upload any book PDF. MRIVAN AI parses math formulas, graphs, and texts, translating them instantly into English, structured Hindi, Hinglish, or Bhojpuri explanations.",
      details: [
        "Instant explanation with zero academic jargon",
        "Formulate answers to exercise questions automatically",
        "Supports handwriting notes recognition on sketchboards"
      ],
      mockData: {
        title: "Simulation: Bihar Board Physics Topic 2",
        description: "Bilingual translation enabled",
        content: (
          <div className="space-y-3 font-sans text-xs">
            <div className="p-2.5 bg-slate-100 rounded-xl rounded-tl-none border border-slate-200">
              <span className="font-bold text-slate-700">Student Question:</span>
              <p className="italic text-slate-600 mt-1">&ldquo;Bhaiya, explain Electric Potential in simple words?&rdquo;</p>
            </div>
            <div className="p-3 bg-blue-600 text-white rounded-xl rounded-tr-none shadow-sm space-y-2">
              <span className="font-bold text-cyan-200 block">MRIVAN AI Tutor (Hindi-English mix):</span>
              <p>Simple language me: Maan lo ki ek bahut gussa wala positive charge (+) ek jagah baitha hai. Ab agar tum ek doosre positive charge ko uske paas laana chahte ho, toh dono ek doosre ko push karenge (repelled).</p>
              <p className="font-semibold text-cyan-200 mt-1">Kuch ahem points:</p>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>Us push ke khilaaf jo tum <strong>Work (Kam)</strong> karoge, wahi udhar store hoga.</li>
                <li>Usi work ko hum <strong className="underline">Electric Potential ($V$)</strong> bolte hain.</li>
                <li>Formula: {"$V = \\frac{W}{q}$"} (Work done per unit charge).</li>
              </ul>
              <p className="text-[10px] text-blue-200 bg-blue-700/50 p-1.5 rounded mt-1">Analogous context: Pani hamesha uchaai se niche behta hai, waise hi charge high potential se low potential ki taraf flow karta hai.</p>
            </div>
          </div>
        )
      }
    },
    {
      id: "notes",
      title: "AI Notes Generator",
      badge: "One-Click Chapter Summaries",
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
      intro: "Stop wasting hours summarizing long academic PDFs. MRIVAN AI highlights critical takeaways, organizes vital math formulas, generates short definitions, and packs them into premium flashcards.",
      details: [
        "Download summary sheets directly to PDF",
        "Auto-generate visual study tables and bullet points",
        "Connect complex ideas with interactive context lines"
      ],
      mockData: {
        title: "Generated Note Preview: Cellular Respiration",
        description: "Biology Revision Standard XI",
        content: (
          <div className="space-y-2 text-xs text-slate-700">
            <div className="border border-slate-200 p-3 rounded-xl bg-white shadow-sm space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span className="font-extrabold text-slate-900">1. Glycolysis (EMB Pathway)</span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">High Yield</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Occurs in the <strong>cytoplasm</strong> of the cell.</li>
                <li>Both aerobic and anaerobic organisms execute it.</li>
                <li>Net gain: <strong>2 ATP</strong> and <strong>2 NADH</strong> molecules.</li>
              </ul>
              <div className="bg-slate-50 border-l-4 border-indigo-500 p-2 text-[10px] text-slate-600 font-mono">
                Glucose (6C) &rarr; Pyruvic Acid (2 x 3C)
              </div>
            </div>
            
            <div className="border border-slate-200 p-3 rounded-xl bg-white shadow-sm space-y-1">
              <h4 className="font-extrabold text-slate-900 pb-1 border-b border-slate-100">2. Quick Speed Formula Matrix</h4>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[9px]">
                <div className="bg-purple-50 text-purple-800 p-1 rounded">
                  <span className="font-bold">ADP + Pi &rarr;</span> ATP
                </div>
                <div className="bg-purple-50 text-purple-800 p-1 rounded">
                  <span className="font-bold">Total Yield:</span> ~36-38 ATP
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: "exams",
      title: "AI Exam Generator",
      badge: "Practice Assessments",
      icon: Award,
      color: "from-pink-500 to-rose-500",
      intro: "Create instant customized mock papers targeting your weak spots or boards level. MRIVAN AI generates CBSE, ICSE, JEE, and NEET style questions and explains choices thoroughly.",
      details: [
        "Configurable difficulty: Easy, Medium, and Tough levels",
        "MCQ and Short Answer combinations",
        "Instant score review and diagnostic analytics"
      ],
      mockData: {
        title: "Simulated Exam Panel: Calculus Limits",
        description: "Interactive Question Preview",
        content: (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900 text-white rounded-xl font-mono">
              <span className="text-rose-400 font-bold">QUESTION:</span>
              <p className="mt-1">Evaluate the limit:</p>
              <div className="text-center font-bold text-sm my-2 bg-slate-800 p-1.5 rounded">
                {"$\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 border border-slate-200 hover:border-indigo-500 rounded-lg text-left font-semibold font-sans">A) 0</button>
              <button className="p-2 border border-slate-200 hover:border-indigo-500 rounded-lg text-left font-semibold font-sans">B) 1</button>
              <button className="p-2 border-2 border-green-600 bg-green-50 text-green-800 rounded-lg text-left font-bold relative font-sans">
                C) 3 <span className="absolute top-1 right-2 text-[8px] uppercase tracking-widest text-green-700">Correct</span>
              </button>
              <button className="p-2 border border-slate-200 hover:border-indigo-500 rounded-lg text-left font-semibold font-sans">D) Limit does not exist</button>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-slate-700 text-[11px] leading-relaxed font-sans">
              <strong className="text-amber-800 font-bold block mb-0.5">Explanation explanation:</strong>
              {"Apply L'Hopital's Rule or the standard rule $\\lim_{\\theta \\to 0}\\frac{\\sin \\theta}{\\theta} = 1$. Multiply numerator and denominator by 3, resulting in $3 \\times 1 = 3$."}
            </div>
          </div>
        )
      }
    },
    {
      id: "tracker",
      title: "AI Performance Tracker",
      badge: "Weak Topic Localization",
      icon: LineChart,
      color: "from-amber-500 to-orange-500",
      intro: "Keep track of every chapter, test, and concept you explore. Our diagnostic engine automatically marks areas where you stumble and highlights key revision tasks.",
      details: [
        "Tracks chapters read and focus session lengths",
        "Pins concepts with consistently low quiz scores",
        "Interactive suggestions updated on your dashboard"
      ],
      mockData: {
        title: "Simulation: Weak Concept Spotlight",
        description: "Mathematics Curriculum",
        content: (
          <div className="space-y-3 text-xs">
            <div className="border border-slate-200 rounded-xl p-3 bg-white space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Determinants &amp; Matrices</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Action Needed</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pb-1.5 border-b border-indigo-50">
                <span>Last Score: 4/10</span>
                <span>Accuracy: 40%</span>
              </div>
              
              <div className="space-y-1.5 pt-1.5">
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">TUTOR RECOMMENDATION:</span>
                <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] leading-relaxed">
                  Practice adjoint algebra and inverse formulas. Let me generate a simplified 5-question recap quiz for you.
                </div>
                <button className="w-full text-center py-2 bg-indigo-600 hover:bg-slate-900 text-white font-bold rounded-lg transition-colors">
                  Launch Recommended Recap
                </button>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: "score",
      title: "AI Score Predictor",
      badge: "Real-time Metrics Prediction",
      icon: Award,
      color: "from-purple-500 to-indigo-600",
      intro: "MRIVAN AI continually analyzes your active practice tests to project your actual state and final standard board exam grades in real time.",
      details: [
        "Highly precise correlation algorithms",
        "Refreshed on every successful MCQ evaluation",
        "Earn study certificates as predictions surpass 90%"
      ],
      mockData: {
        title: "Simulated Projection Grade Card",
        description: "CBSE XII Chemistry Projected Goals",
        content: (
          <div className="space-y-3 text-xs">
            <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">CURRICULUM MOCK GRADE</span>
                  <h4 className="text-lg font-bold text-white tracking-tight">Chemistry Theory</h4>
                </div>
                <span className="px-2 py-0.5 bg-green-500 text-white font-black text-[9px] rounded">A+ RATED</span>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-3xl font-mono font-extrabold text-green-400">94.3%</span>
                  <span className="text-[10px] text-slate-400 block">Predicted Class Score</span>
                </div>
                <div className="text-right text-[10px] space-y-1">
                  <div className="text-green-400 font-bold">&uarr; +1.4% improvement</div>
                  <div className="text-slate-400 font-mono">Confidence Level: 95%</div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: "timer",
      title: "Active Study Timer",
      badge: "Focus Streaks & Goals",
      icon: Timer,
      color: "from-emerald-500 to-teal-500",
      intro: "Boost your productivity with our elegant circular study timer. Configure active intervals (Pomodoro method), log continuous streaks, and complete daily schedules with zero alerts.",
      details: [
        "Clean, gorgeous distraction-free visual canvas",
        "Option to play loop background lofi instrumental notes",
        "Sync focus time automatically with your profile progress metrics"
      ],
      mockData: {
        title: "Lofi Focus Room Simulator",
        description: "Sound preset: Cozy Rain",
        content: (
          <div className="space-y-3 text-xs text-slate-800 text-center">
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-emerald-500/60 flex items-center justify-center mx-auto animate-spin-slow">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex flex-col items-center justify-center animate-none animate-pulse">
                <span className="font-mono font-bold text-emerald-700 text-sm">25:00</span>
                <span className="text-[8px] uppercase tracking-wider text-emerald-500">Focusing</span>
              </div>
            </div>
            
            <div className="p-2 bg-emerald-50 text-emerald-800 text-[10px] rounded-lg">
              🎵 Playing: <em>Midnight Rain Lofi beats (Soft low-pass filter)</em>
            </div>
            
            <div className="flex justify-center gap-2">
              <button className="px-3 py-1 bg-emerald-600 text-white font-semibold rounded-md">Pause</button>
              <button className="px-3 py-1 bg-slate-200 text-slate-700 font-semibold rounded-md">Skip Break</button>
            </div>
          </div>
        )
      }
    }
  ];

  const activeFeature = featuresList.find(f => f.id === activeTab) || featuresList[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-8 pb-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Headings */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="px-3 py-1 bg-indigo-50 border border-indigo-150 inline-block text-[11px] uppercase tracking-wider font-extrabold text-indigo-700 rounded-full">
            Product Features Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learn More with Interactive AI Tools
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Take an in-depth tour of the modules. Select any utility on the left to see what MRIVAN AI generates on the fly for active students.
          </p>
        </div>

        {/* Feature Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pickers (Left Column: 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {featuresList.map((f) => {
              const IconComp = f.icon;
              const isSelected = f.id === activeTab;
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveTab(f.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`p-2.5 rounded-xl flex-shrink-0 ${
                      isSelected ? "bg-gradient-to-tr " + f.color + " text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </span>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                          {f.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
                            Previewing
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        {f.badge}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-sm line-clamp-2">
                        {f.intro}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Emulator Card (Right Column: 7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[32px] p-6 shadow-md shadow-slate-100 relative overflow-hidden self-stretch lg:sticky lg:top-24">
            {/* Holographic Glowing Orbs inside Box */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 blur-2xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-purple-500/5 blur-2xl rounded-full"></div>

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              
              {/* Emulator Top Indicator info */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg bg-gradient-to-tr ${activeFeature.color} text-white`}>
                    <activeFeature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base text-slate-900 tracking-tight">
                      {activeFeature.title} Module
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                      {activeFeature.badge}
                    </p>
                  </div>
                </div>
                
                <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-slate-100 text-slate-600 uppercase font-black">
                  Simulated Preview
                </span>
              </div>

              {/* Module Description text */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {activeFeature.intro}
              </p>

              {/* Bullet checklist checks */}
              <div className="space-y-2">
                <h4 className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                  Key Capabilities included:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeFeature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="font-semibold">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic glassmorphism panel showing generated sample data */}
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-3xl p-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-150 pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {activeFeature.mockData.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400">
                    {activeFeature.mockData.description}
                  </span>
                </div>

                {activeFeature.mockData.content}
              </div>

              {/* Bottom call to action instruction */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Want to try it with your actual files?</span>
                <span className="font-bold text-blue-600 flex items-center gap-1">
                  Launch the platform <ArrowRight className="w-4 h-4" />
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
