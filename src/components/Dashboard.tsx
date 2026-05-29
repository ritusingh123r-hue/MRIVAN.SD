/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { PageView, QuizQuestion, QuizState, SavedNote, PracticeAttempt, StudentDashboardData } from "../types";
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  Timer, 
  BarChart3, 
  Flame, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  ChevronRight, 
  Check, 
  Award, 
  RefreshCw, 
  MessageSquare, 
  Home, 
  User, 
  TrendingUp, 
  HelpCircle,
  Clock
} from "lucide-react";

interface DashboardProps {
  hasProUpgrade: boolean;
  setView: (view: PageView) => void;
  userName: string;
}

export default function Dashboard({ hasProUpgrade, setView, userName }: DashboardProps) {
  // Database states
  const [db, setDb] = useState<StudentDashboardData | null>(null);
  const [loadingDb, setLoadingDb] = useState(true);
  
  // MCQ Generator states
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    selectedAnswer: null,
    score: 0,
    showExplanation: false,
    isCompleted: false,
  });
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizTopic, setQuizTopic] = useState("");
  const [quizSubject, setQuizSubject] = useState("Science (Physics)");
  const [quizLevel, setQuizLevel] = useState("Medium");
  const [quizQty, setQuizQty] = useState(5);

  // Notes generator states
  const [notesTopic, setNotesTopic] = useState("");
  const [notesSubject, setNotesSubject] = useState("Science (Physics)");
  const [notesLang, setNotesLang] = useState("English + Hindi analogic explanation");
  const [notesLoading, setNotesLoading] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const [notesTitle, setNotesTitle] = useState("");

  // Fetch student db
  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/student/dashboard");
      if (res.ok) {
        const data = await res.json();
        setDb(data);
      }
    } catch (e) {
      console.warn("Could not query mock database status.");
    } finally {
      setLoadingDb(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Submit test score to server
  const saveExamScore = async (finalScore: number) => {
    try {
      const res = await fetch("/api/student/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: quizSubject,
          score: finalScore,
          totalQuestions: quizQty
        })
      });
      if (res.ok) {
        const updated = await res.json();
        // Update local database stats
        if (db) {
          setDb({
            ...db,
            attempts: updated.updatedAttempts,
            predictedScore: updated.predictedScore
          });
        }
      }
    } catch (e) {
      console.error("Score logging error:", e);
    }
  };

  // Trigger MCQ generation
  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const topic = quizTopic.trim() || "Newton laws";
    setQuizLoading(true);

    try {
      const res = await fetch("/api/gemini/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: quizSubject,
          topic: topic,
          level: quizLevel,
          numQuestions: quizQty
        })
      });

      if (!res.ok) throw new Error("MCQ server block");

      const data = await res.json();
      
      if (data.questions && data.questions.length > 0) {
        setQuizState({
          questions: data.questions,
          currentIndex: 0,
          selectedAnswer: null,
          score: 0,
          showExplanation: false,
          isCompleted: false,
        });
      } else {
        alert("We had trouble preparing questions on that specific concept. Let's try with other topics.");
      }
    } catch (err) {
      console.error(err);
      alert("Please ensure your GEMINI_API_KEY is configured correctly. Fetch failed.");
    } finally {
      setQuizLoading(false);
    }
  };

  // Process selected MCQ option
  const handleAnswerOption = (opt: string) => {
    if (quizState.selectedAnswer !== null) return; // already solved this index
    
    const isCorrect = opt === quizState.questions[quizState.currentIndex].correctAnswer;
    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: opt,
      score: isCorrect ? prev.score + 1 : prev.score,
      showExplanation: true
    }));
  };

  // Next Question MCQ
  const handleNextQuestion = () => {
    const isLast = quizState.currentIndex + 1 >= quizState.questions.length;
    if (isLast) {
      setQuizState((prev) => ({ ...prev, isCompleted: true }));
      saveExamScore(quizState.score);
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        showExplanation: false
      }));
    }
  };

  // Core Notes Generation
  const handleGenerateNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    const topic = notesTopic.trim() || "Trigonometric ratios";
    setNotesLoading(true);

    try {
      const res = await fetch("/api/gemini/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          subject: notesSubject,
          language: notesLang
        })
      });

      if (!res.ok) throw new Error("Fail notes");
      
      const data = await res.json();
      setGeneratedNotes(data.notes);
      setNotesTitle(topic);
    } catch (err) {
      console.error(err);
      alert("Error generating summaries. Check key configuration.");
    } finally {
      setNotesLoading(false);
    }
  };

  // Save generated files
  const handleSaveNotes = async () => {
    if (!generatedNotes || !notesTitle) return;
    try {
      const res = await fetch("/api/student/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: notesTitle,
          content: generatedNotes,
          subject: notesSubject
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (db) {
          setDb({ ...db, notes: data.allNotes });
        }
        setGeneratedNotes(null);
        setNotesTopic("");
        alert("📝 Chapter notes loaded successfully to your workspace library.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete saved Note
  const handleDeleteNote = async (noteId: string) => {
    try {
      const res = await fetch(`/api/student/notes/${noteId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        const data = await res.json();
        if (db) {
          setDb({ ...db, notes: data.allNotes });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activeFocusMinutes = db ? db.focusTimeTotal : 125;
  const activePredictedScore = db ? db.predictedScore : 92;
  const activeStreak = db ? db.timerStreak : 4;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Upper Heading Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Student workspace <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 tracking-wide uppercase border border-indigo-100">Portal active</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Welcome, <strong className="text-slate-800">{userName}</strong>! Launch mock examinations, summarize textbooks, and monitor scores in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("chat")}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" /> Consult AI Tutor
            </button>
            <button
              onClick={() => setView("timer")}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Timer className="w-4 h-4" /> Go Focus Timer
            </button>
          </div>
        </div>

        {/* Bento Metrics Summary Cards */}
        {loadingDb ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-pulse text-xs text-slate-400">
            <div className="bg-white border rounded-2xl h-24 flex items-center justify-center">Loading stats...</div>
            <div className="bg-white border rounded-2xl h-24 flex items-center justify-center">Preparing diagnostics...</div>
            <div className="bg-white border rounded-2xl h-24 flex items-center justify-center">Reading streak clocks...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" id="bento-analytics-board">
            
            {/* Predictor Grade Card (Bento Item 1) */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full"></div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-1">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-500" /> Projected Board Grade
                </span>
                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Excellent
                </span>
              </div>
              <div className="flex items-baseline gap-2 pt-1 font-sans">
                <span className="text-4xl font-mono font-black text-slate-900">{activePredictedScore}%</span>
                <span className="text-xs text-slate-500 font-semibold">avg board forecast</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Calculated on real outcomes. Complete consecutive simulated examinations below to scale predictions.
              </p>
            </div>

            {/* Focus Logged Minutes Card (Bento Item 2) */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
              <div className="flex items-center justify-between animate-pulse">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-1">
                  <Clock className="w-35 h-3.5 text-emerald-600" /> Focus Time Spent
                </span>
                <span className="text-xs font-semibold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-4xl font-mono font-black text-slate-900">{activeFocusMinutes}m</span>
                <span className="text-xs text-slate-500 font-semibold">cumulative track</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                Study logs synchronized. Complete focus intervals inside focus timer rooms to continuously log stats.
              </p>
            </div>

            {/* Streak Goal Card (Bento Item 3) */}
            <div className="bg-[#FAFBFD] border border-blue-150 rounded-[24px] p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-450 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Student Streak
                </span>
                <span className="bg-indigo-50 text-indigo-700 font-black text-[9px] px-2 py-0.5 rounded uppercase">
                  Verified
                </span>
              </div>
              
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-4xl font-mono font-black text-indigo-900">{activeStreak} Days</span>
                <span className="text-xs text-slate-500 font-semibold">continuous</span>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Top 5% among students nationwide. Log study activities daily to prevent streak resets.
              </div>
            </div>

          </div>
        )}

        {/* Workspace Dual Columns Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Action Area (Left Column: 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* MCQ Quiz Generator Section card */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-highlight pb-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">AI Mock Examination Generator</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      custom standard MCQ papers
                    </p>
                  </div>
                </div>

                {!quizState.questions.length && (
                  <span className="bg-amber-50 text-amber-700 font-bold text-[9px] px-2 py-0.5 rounded border border-amber-100">
                    Mocks Available
                  </span>
                )}
              </div>

              {/* Initial MCQ Configurator Form */}
              {!quizState.questions.length && !quizLoading && (
                <form onSubmit={handleGenerateQuiz} className="space-y-4 text-xs font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-500 uppercase tracking-wide mb-1">Subject</label>
                      <select
                        value={quizSubject}
                        onChange={(e) => setQuizSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Science (Physics)">Science (Physics)</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="History & Politics">History &amp; Politics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-500 uppercase tracking-wide mb-1">Difficulty</label>
                      <select
                        value={quizLevel}
                        onChange={(e) => setQuizLevel(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium (Standard Board)</option>
                        <option value="Tough">Tough (JEE/NEET Competitive)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-500 uppercase tracking-wide mb-1">MCQ Quantity</label>
                      <select
                        value={quizQty}
                        onChange={(e) => setQuizQty(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-250 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="3">3 Questions (Speed test)</option>
                        <option value="5">5 Questions (Regular format)</option>
                        <option value="10">10 Questions (Comprehensive)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Concept/Chapter Title key
                    </label>
                    <input
                      type="text"
                      required
                      value={quizTopic}
                      onChange={(e) => setQuizTopic(e.target.value)}
                      placeholder="E.g., Trigonometric Ratios, Kinetic Energy, Indus Valley Civilization..."
                      className="w-full bg-slate-50 border border-slate-250 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center py-3.5 bg-slate-900 border border-slate-950 text-white font-bold rounded-xl shadow hover:bg-slate-850 cursor-pointer"
                  >
                    Build Mock Exam with AI
                  </button>
                </form>
              )}

              {/* Generative loading animations */}
              {quizLoading && (
                <div className="text-center py-10 space-y-4 text-xs text-slate-500">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="font-semibold">
                    MRIVAN AI Examiner is analyzing standard board curricula... Generating fresh MCQ arrays on <strong className="text-indigo-600 italic">“{quizTopic}”</strong>
                  </p>
                </div>
              )}

              {/* Live Active MCQ Exam Panel layout */}
              {quizState.questions.length > 0 && !quizState.isCompleted && (
                <div className="space-y-5 animate-fade-in text-xs sm:text-sm">
                  
                  {/* Progress Header */}
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="font-bold uppercase tracking-wider text-rose-500">
                      Question {quizState.currentIndex + 1} of {quizState.questions.length}
                    </span>
                    <span className="font-mono">
                      Accumulated score: {quizState.score}/{quizState.questions.length}
                    </span>
                  </div>

                  {/* Question Prompt layout */}
                  <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs shadow-inner">
                    <p className="leading-relaxed">
                      {quizState.questions[quizState.currentIndex].question}
                    </p>
                  </div>

                  {/* Options select grid */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {quizState.questions[quizState.currentIndex].options.map((opt, idx) => {
                      const isSelected = quizState.selectedAnswer === opt;
                      const isCorrectAnswer = opt === quizState.questions[quizState.currentIndex].correctAnswer;
                      const hasUserAnswered = quizState.selectedAnswer !== null;
                      
                      let optionStyle = "border-slate-200 hover:border-slate-350 bg-white text-slate-700";
                      
                      if (hasUserAnswered) {
                        if (isCorrectAnswer) {
                          optionStyle = "border-green-500 bg-green-50 text-green-900 font-bold";
                        } else if (isSelected) {
                          optionStyle = "border-red-500 bg-red-50 text-red-900 font-bold";
                        } else {
                          optionStyle = "opacity-50 border-slate-100 bg-white text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerOption(opt)}
                          disabled={hasUserAnswered}
                          className={`w-full text-left p-3.5 border rounded-xl text-xs sm:text-sm transition-all flex justify-between items-center cursor-pointer ${optionStyle}`}
                        >
                          <span className="pr-4">{opt}</span>
                          {hasUserAnswered && isCorrectAnswer && (
                            <span className="text-[10px] font-black uppercase tracking-wider text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Correct</span>
                          )}
                          {hasUserAnswered && isSelected && !isCorrectAnswer && (
                            <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-100 px-1.5 py-0.5 rounded">Wrong</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Diagnostic Explanation block */}
                  {quizState.showExplanation && (
                    <div className="p-4 bg-amber-50/70 border border-amber-150 rounded-2xl space-y-1 animate-fade-in text-xs text-slate-705">
                      <strong className="text-amber-900 font-extrabold flex items-center gap-1">
                        🔬 Tutor Diagnostic explanation:
                      </strong>
                      <p className="leading-relaxed text-slate-700">
                        {quizState.questions[quizState.currentIndex].explanation}
                      </p>
                    </div>
                  )}

                  {/* Next question action button */}
                  {quizState.selectedAnswer !== null && (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {quizState.currentIndex + 1 >= quizState.questions.length ? "Finish Exam & Predict Grades" : "Proceed to Next Question"} 
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                </div>
              )}

              {/* Complete Exam Score screen */}
              {quizState.questions.length > 0 && quizState.isCompleted && (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto text-3xl shadow-inner animate-pulse">
                    🏆
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">AI Mock Exam Assessment Complete</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your scoring indices have been submitted to the predictive system.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border rounded-2xl max-w-sm mx-auto flex items-center justify-between text-left text-xs gap-4">
                    <div>
                      <span className="text-slate-450 uppercase font-bold tracking-wider">MOCK GRADE</span>
                      <strong className="text-slate-900 block font-black text-lg">
                        {quizSubject}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-450 uppercase font-bold tracking-wider">SCORE</span>
                      <strong className="text-indigo-600 block font-black text-2xl">
                        {quizState.score} / {quizState.questions.length}
                      </strong>
                    </div>
                  </div>

                  <div className="flex gap-2.5 justify-center max-w-xs mx-auto">
                    <button
                      onClick={() => {
                        setQuizState((prev) => ({ ...prev, questions: [] }));
                        setQuizTopic("");
                      }}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      New Exam Topic
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Note Summarizer Generator Workspace card */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">AI Instant Notes Summaries</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      convert textbooks to summaries
                    </p>
                  </div>
                </div>
              </div>

              {!generatedNotes && !notesLoading && (
                <form onSubmit={handleGenerateNotes} className="space-y-4 text-xs font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-500 uppercase tracking-wide mb-1">Subject</label>
                      <select
                        value={notesSubject}
                        onChange={(e) => setNotesSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 py-2 px-2.5 rounded-lg focus:outline-none"
                      >
                        <option value="Science (Physics)">Science (Physics)</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="History">History</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-500 uppercase tracking-wide mb-1">Language Dialect</label>
                      <select
                        value={notesLang}
                        onChange={(e) => setNotesLang(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 py-2 px-2.5 rounded-lg focus:outline-none"
                      >
                        <option value="English">English</option>
                        <option value="English + Hindi mixed analogies">Hinglish / Hindi mix tips</option>
                        <option value="Bhojpuri blend translation explanations">Bhojpuri native dialect mix</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Chapter/Topic keyword
                    </label>
                    <input
                      required
                      type="text"
                      value={notesTopic}
                      onChange={(e) => setNotesTopic(e.target.value)}
                      placeholder="E.g., Quantum Numbers, Pyramids of Giza, Cellular Glycolysis..."
                      className="w-full bg-slate-50 border border-slate-250 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow shadow-indigo-600/10 cursor-pointer"
                  >
                    Draft Study Sheet with AI
                  </button>

                </form>
              )}

              {/* Notes query progress */}
              {notesLoading && (
                <div className="text-center py-6 space-y-3.5 text-xs text-slate-500">
                  <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-semibold">
                    MRIVAN AI is generating structured chapter summaries... Formatting Markdown, tips &amp; sample self assessments.
                  </p>
                </div>
              )}

              {/* Draft notes output display */}
              {generatedNotes && !notesLoading && (
                <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-h-80 overflow-y-auto font-sans text-slate-800 leading-relaxed space-y-2 whitespace-pre-wrap">
                    <h4 className="font-extrabold text-slate-900 border-b pb-1.5 text-xs sm:text-sm">
                      📝 {notesTitle} ({notesSubject}) Notes Draft
                    </h4>
                    
                    {generatedNotes}
                  </div>

                  <div className="flex gap-2.5 justify-end">
                    <button
                      onClick={() => setGeneratedNotes(null)}
                      className="px-4 py-2 border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold rounded-lg text-xs cursor-pointer"
                    >
                      Discard Draft
                    </button>
                    <button
                      onClick={handleSaveNotes}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Save to Workspace Library
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Workspace Sidebar: History and Saved Papers (Right Column: 5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Folder of Saved Revision Summaries files */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm space-y-5">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5 border-b pb-3">
                <FileText className="w-4.5 h-4.5 text-indigo-600" /> Saved Revision Summaries Room ({db?.notes.length || 0})
              </h3>

              {loadingDb ? (
                <div className="space-y-2 animate-pulse text-xs text-slate-400 py-3 text-center">
                  Indexing study library...
                </div>
              ) : db?.notes && db.notes.length > 0 ? (
                <div className="space-y-3.5">
                  {db.notes.map((note) => (
                    <div 
                      key={note.id}
                      className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1.5 relative group text-xs text-left"
                    >
                      <div className="flex justify-between items-start pr-6">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-500">
                            {note.subject}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm mt-0.5">{note.title}</h4>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded bg-white hover:bg-red-50 border border-slate-150 transition-colors absolute right-2.5 top-2.5 cursor-pointer"
                          title="Delete saved note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed whitespace-pre-wrap border-t border-slate-150 pt-2 font-sans">
                        {note.content}
                      </div>

                      <span className="text-[9px] text-slate-400 block pt-1">
                        Saved: {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400 space-y-1.5">
                  <p>Study library is empty.</p>
                  <p className="text-[10px] leading-relaxed max-w-xs mx-auto">
                    Configure a textbook topic in our left summarizer panel to instantly populate notes files here!
                  </p>
                </div>
              )}
            </div>

            {/* Previous practice history tracker log */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5 border-b pb-3">
                <TrendingUp className="w-4.5 h-4.5 text-rose-500" /> Historic Practice Log Entries
              </h3>

              {loadingDb ? (
                <div className="py-2 text-center text-xs animate-pulse text-slate-400">Loading log metrics...</div>
              ) : db?.attempts && db.attempts.length > 0 ? (
                <div className="space-y-2 text-xs">
                  {db.attempts.slice(-5).reverse().map((attempt) => {
                    const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    const isSuccess = pct >= 80;
                    return (
                      <div 
                        key={attempt.id} 
                        className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-left"
                      >
                        <div className="space-y-0.5">
                          <strong className="text-slate-900 block font-bold text-[11px] sm:text-xs">
                            {attempt.subject}
                          </strong>
                          <span className="text-[9px] text-slate-450 block">
                            Solved: {new Date(attempt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <span className={`inline-block px-2 py-0.5 font-bold text-[10px] rounded-md ${
                            isSuccess ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}>
                            Score: {attempt.score}/{attempt.totalQuestions} ({pct}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-6">No previous attempts logged.</p>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
