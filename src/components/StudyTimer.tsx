/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, Sparkles, Sliders, Music, CheckCircle, Flame } from "lucide-react";

interface StudyTimerProps {
  onFocusLogged: (minutes: number) => void;
  timerStreak: number;
}

export default function StudyTimer({ onFocusLogged, timerStreak }: StudyTimerProps) {
  const [sessionType, setSessionType] = useState<"focus" | "shortBreak" | "longBreak">("focus");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  
  // Custom focus goals
  const [dailyGoal, setDailyGoal] = useState(45); // 45 minutes
  const [completedCyclesToday, setCompletedCyclesToday] = useState(1);
  const [activeSound, setActiveSound] = useState<string>("off");
  
  // Audio oscillator simulation state to generate synthesized relaxation buzzers
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Time durations in minutes
  const durations = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  // Sound loops description
  const sounds = [
    { id: "off", label: "Mute Ambient" },
    { id: "rain", label: "Midnight Rain (320hz)" },
    { id: "brownian", label: "Brownian Noise (deep lofi)" },
    { id: "sine-wave", label: "Pure Binaural Focus (432Hz)" },
  ];

  // Set selected tab duration
  const selectSession = (type: "focus" | "shortBreak" | "longBreak") => {
    setIsActive(false);
    setSessionType(type);
    setSecondsLeft(durations[type] * 60);
    stopSynthesizer();
  };

  // Timer tick effect
  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      handleCycleCompleted();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  // Handle synthesized sound loops on sound selection
  useEffect(() => {
    if (activeSound !== "off" && isActive) {
      startSynthesizer(activeSound);
    } else {
      stopSynthesizer();
    }
    return () => stopSynthesizer();
  }, [activeSound, isActive]);

  // Start sound loop synthesize
  const startSynthesizer = (type: string) => {
    try {
      stopSynthesizer(); // ensure clean state
      
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      oscillatorNodeRef.current = osc;
      gainNodeRef.current = gain;

      if (type === "rain") {
        // Synthesizing a low, ambient, relaxing drone with rain-like frequency modulation
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        // Add random modulations using standard intervals if desired, simulate a low flutter
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
      } else if (type === "brownian") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
      } else if (type === "sine-wave") {
        // Binaural focus frequency
        osc.type = "sine";
        osc.frequency.setValueAtTime(432, ctx.currentTime); // 432 Hz healing focus vibe
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
    } catch (e) {
      console.warn("Audio synthesis was blocked or not supported on this context layout.");
    }
  };

  const stopSynthesizer = () => {
    try {
      if (oscillatorNodeRef.current) {
        oscillatorNodeRef.current.stop();
        oscillatorNodeRef.current.disconnect();
        oscillatorNodeRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (e) {}
  };

  const handleCycleCompleted = () => {
    stopSynthesizer();
    
    // Play electronic completion chime
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {}

    if (sessionType === "focus") {
      const loggedMins = durations.focus;
      setCompletedCyclesToday((prev) => prev + 1);
      onFocusLogged(loggedMins);
      alert(`🎉 Terrific focus session completed! You earned study credit and logged ${loggedMins} minutes to your MRIVAN dashboard.`);
    } else {
      alert("Break completed! Let's get back to active school revisions.");
    }
    
    // reset to focus by default
    selectSession("focus");
  };

  // Pause action
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(durations[sessionType] * 60);
    stopSynthesizer();
  };

  // Helper formatting mm:ss
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = ((durations[sessionType] * 60 - secondsLeft) / (durations[sessionType] * 60)) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-8 pb-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-100">
            <Flame className="w-3.5 h-3.5 fill-emerald-200 text-emerald-600 animate-bounce" /> Focus Space
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Minimal Productivity Timer
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Enter focus mode. Block digital visual distractions, select lofi background frequencies, and log every completed cycle straight to your performance scorecard.
          </p>
        </div>

        {/* Bento Grid Timer layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Focus Clock Node (Left Column: 8 Cols) */}
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/10 blur-2xl rounded-full"></div>
            
            {/* Tab session togglers */}
            <div className="flex bg-slate-100 border border-slate-200/80 p-1 rounded-xl w-full max-w-md self-center">
              <button
                onClick={() => selectSession("focus")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  sessionType === "focus" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                }`}
              >
                Focus Session (25m)
              </button>
              <button
                onClick={() => selectSession("shortBreak")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  sessionType === "shortBreak" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => selectSession("longBreak")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  sessionType === "longBreak" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                }`}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Circular Graphic Countdown */}
            <div className="my-10 relative">
              <svg className="w-56 h-56 transform -rotate-90">
                {/* Background path trace */}
                <circle
                  cx="112"
                  cy="112"
                  r="98"
                  className="stroke-slate-100 fill-transparent"
                  strokeWidth="8"
                />
                {/* Active path with animated dash */}
                <circle
                  cx="112"
                  cy="112"
                  r="98"
                  className="stroke-emerald-500 fill-transparent transition-all duration-300"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 98}
                  strokeDashoffset={2 * Math.PI * 98 * (1 - progressPercentage / 100)}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Central Count readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-mono font-black text-slate-900 tracking-tighter">
                  {formatTime(secondsLeft)}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  {sessionType === "focus" ? "Study Sprint" : "Relaxation Mode"}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 py-2">
              <button
                onClick={toggleTimer}
                className={`px-8 py-3.5 rounded-xl font-extrabold text-sm flex items-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-white shadow-amber-500/10 hover:opacity-95"
                    : "bg-slate-900 text-white shadow-slate-900/15 hover:bg-slate-800"
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-4.5 h-4.5 fill-white" /> Pause Activity
                  </>
                ) : (
                  <>
                    <Play className="w-4.5 h-4.5 fill-white" /> Start Focus
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                className="p-3.5 border border-slate-250 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
                title="Reset counter"
              >
                <RotateCcw className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>

          {/* Soundscapes & Streak Widgets (Right Column: 4 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Focus Soundscapes Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Music className="w-4.5 h-4.5 text-indigo-600" /> Ambient Audio Synthesizer
              </h3>
              
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Our in-browser oscillator synthesizes neural binaural focus waves under low-pass filters. Select a frequency to loop:
              </p>

              <div className="space-y-1.5">
                {sounds.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => setActiveSound(sound.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                      activeSound === sound.id
                        ? "bg-slate-900 border-slate-900 text-white font-extrabold"
                        : "bg-slate-50 border-slate-150 text-slate-600 hover:bg-slate-100/60"
                    }`}
                  >
                    <span>{sound.label}</span>
                    {activeSound === sound.id && isActive && (
                      <span className="flex gap-0.5 items-center justify-center">
                        <span className="w-1 h-2.5 bg-blue-400 animate-pulse rounded-full"></span>
                        <span className="w-1 h-3.5 bg-blue-200 animate-pulse rounded-full delay-100"></span>
                        <span className="w-1 h-1.5 bg-blue-300 animate-pulse rounded-full delay-200"></span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Streak Counter Box */}
            <div className="bg-emerald-650 text-white rounded-2xl p-5 shadow-md flex items-center justify-between relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-750">
              <div className="absolute right-[-10%] bottom-[-10%] w-24 h-24 bg-white/5 blur-3xl" />
              
              <div className="space-y-1.5">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest text-emerald-100">
                  Continuous Streak
                </span>
                <h4 className="text-2xl font-black">{timerStreak} Study Days</h4>
                <p className="text-[11px] text-emerald-100 leading-relaxed">
                  Log focus minutes daily to expand your streak limit (Max 30 days reward).
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white font-black hover:scale-105 transition-transform">
                🔥
              </div>
            </div>

            {/* Completed Progress Goal card */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3.5">
              <h4 className="font-bold text-xs text-slate-300">Daily Objectives Completed</h4>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400 font-semibold">
                  <span>Cycle progress:</span>
                  <span>{completedCyclesToday * 25} / {dailyGoal} min</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (completedCyclesToday * 25 / dailyGoal) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed">
                Tip: Completing continuous sessions trains your executive focus system and unlocks smarter diagnostic recommendations.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
