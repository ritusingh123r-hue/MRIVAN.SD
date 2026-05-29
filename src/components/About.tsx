/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageView } from "../types";
import { Award, Compass, Heart, Users, Check, Globe, GraduationCap } from "lucide-react";

interface AboutProps {
  setView: (view: PageView) => void;
}

export default function About({ setView }: AboutProps) {
  const milestones = [
    { year: "The Vision", title: "No Student Left Behind", text: "Every student learns at a different velocity. Traditional classrooms force a standardized pace. MRIVAN AI acts as an instantly adaptable personal tutor that understands individual roadblocks." },
    { year: "The Multi-lingual Focus", title: "Hindi, Bhojpuri & English Mix", text: "Language barriers shouldn't hold back bright minds. We support natural dialect shifts (Hinglish/Bhojpuri explanatory analogies) so science and math feel like kitchen talk." },
    { year: "The Future", title: "Global Board Preparedness", text: "Scaling to millions of students. Expanding CBSE, state boards, and college entrance support globally." }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-8 pb-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* About Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="px-3 py-1 bg-blue-50 border border-blue-150 inline-block text-[11px] uppercase tracking-wider font-extrabold text-blue-700 rounded-full">
            Our Origin Story
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Democratizing Education <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Through Personal AI Teachers
            </span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed max-w-2xl mx-auto">
            Our mission is simple: to make Silicon Valley-grade personal AI coaching accessible to every single child, anywhere in the world.
          </p>
        </div>

        {/* Vision Narrative Card */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl" />
          
          <div className="space-y-6 relative z-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">The Billion-Dollar Problem We Solved</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In modern education, private 1-on-1 human tutoring remains a privilege reserved only for wealthy families. Meanwhile, standard classroom lectures suffer due to teacher student ratios, leaving millions of high-potential students lagging behind in critical subjects like physics, chemistry, and mathematics.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>MRIVAN AI represents the democratic correction.</strong> By combining state-of-the-art Large Language Models with smart educational curriculum vector maps, we build an automated AI tutor that is infinitely patient, understands local vernacular dialects, and acts as a safe space for students to resolve their doubts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-150">
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Infinite Comprehension</h3>
                  <p className="text-xs text-slate-500">No question is too simple. Ask 100 times, get 100 unique, patient replies.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Vernacular Dialects</h3>
                  <p className="text-xs text-slate-500">Localized explanation models explaining logic in native Hindi or Bhojpuri.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones timeline layout with unique Bento look */}
        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center">Core Pillars of Action</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-[#FAFBFD] border border-slate-250/60 p-6 rounded-2xl relative space-y-3">
                <span className="text-xs font-bold text-blue-600 tracking-wider block">
                  {m.year}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">{m.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Premium bottom block */}
        <div className="text-center bg-slate-900 text-white rounded-[32px] p-8 space-y-4">
          <GraduationCap className="w-12 h-12 text-blue-400 mx-auto" />
          <h3 className="text-xl font-bold">Ready to take your learning to the next level?</h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Create your account instantly, configure study targets, and start mastering tricky topics step-by-step with MRIVAN AI.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setView("login")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Get Started for Free
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
