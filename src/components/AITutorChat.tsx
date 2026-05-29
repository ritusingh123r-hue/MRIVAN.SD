/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Upload, Paperclip, AlertCircle, Bot, Mic, ArrowRight, BookOpen, VolumeX, X, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AITutorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Namaste! I am your personal MRIVAN AI Teacher. 🎓\n\nHow can I help you today? You can:\n\n1. Ask me to explain a concept from your textbook (e.g., in simple English/Hindi/Bhojpuri).\n2. Upload a scan of an exercise question or a diagram.\n3. Request formula summaries or high-yield revision list definitions.\n\nWhat are we studying first?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Base64 image attachment state
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedMimeType, setAttachedMimeType] = useState<string | null>(null);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [voiceMocking, setVoiceMocking] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Suggested starter chips
  const starterChips = [
    { label: "Explain Photosynthesis in simple Hindi-English blend mix", prompt: "Explain Photosynthesis in a simple English-Hindi bilingual blend with real-life analogies." },
    { label: "Bhojpuri dynamic translation of Algebra coordinates", prompt: "Summarize Coordinate Geometry basics in simple Bhojpuri so a kid can grasp it." },
    { label: "Newton's 3rd Law formulas & speed bullet notes", prompt: "Draft revision short notes for Newton's 3rd Law of Motion with mathematical formulas." },
    { label: "Calculate standard deviation of [12, 15, 23, 29, 30]", prompt: "Show step-by-step calculations to find the standard deviation of data: [12, 15, 23, 29, 30]." }
  ];

  // Auto-scroll chat to bottom on changes
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle image upload from computer or camera scan
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid diagram or textbook image scan.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAttachedImage(reader.result.split(",")[1] || null); // base64 payload without standard prefix
        setAttachedMimeType(file.type);
        setAttachedFileName(file.name);
      }
    };
    reader.onerror = () => {
      alert("Failed to process the requested image.");
    };
    reader.readAsDataURL(file);
  };

  // Quick helper to remove current file attachment
  const removeAttachment = () => {
    setAttachedImage(null);
    setAttachedMimeType(null);
    setAttachedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit trigger
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputValue;
    if (!text.trim() && !attachedImage) return;

    // Create a new user message
    const userMessageId = "msg-" + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
      // Add local base64 prefix back for previewing inside client log bubble
      image: attachedImage ? `data:${attachedMimeType};base64,${attachedImage}` : undefined
    };

    setMessages((prev) => [...prev, newUserMsg]);
    if (textToSend === undefined) {
      setInputValue("");
    }
    
    // Back up attachment state and wipe local picker immediately
    const payloadImage = attachedImage;
    const payloadMime = attachedMimeType;
    removeAttachment();

    setIsLoading(true);

    try {
      // Map user history context to prevent losing query context as requested by guidelines
      // We pass the last 6 messages to keep reasoning coherent
      const messageHistoryContext = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messageHistoryContext,
          imageBase64: payloadImage,
          mimeType: payloadMime
        })
      });

      if (!res.ok) {
        throw new Error("Tutor connection had a minor response block.");
      }

      const data = await res.json();
      
      const modelAnswerId = "msg-ai-" + Date.now();
      const newModelMsg: ChatMessage = {
        id: modelAnswerId,
        role: "model",
        content: data.text || "I was unable to compile the answer. Try asking with a different terminology context.",
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, newModelMsg]);

    } catch (err: any) {
      console.error(err);
      const errorMsgId = "msg-err-" + Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: errorMsgId,
          role: "model",
          content: "⚠️ **Oops, I hit a brief latency hiccup.** Make sure your GEMINI_API_KEY is configured in your Settings secrets panel! Let me know if you would like me to try answering that question again.",
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate verbal dictation speech trigger
  const triggerVoiceMock = () => {
    setVoiceMocking(true);
    setTimeout(() => {
      setVoiceMocking(false);
      setInputValue("Explain Newton's First Law using dynamic friction analogies?");
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#F8FAFC]">
      
      {/* Side Tips Bento Card Panel (Visible on Desktop) */}
      <div className="hidden md:flex md:w-80 border-r border-slate-200 bg-white p-5 flex-col justify-between" id="chat-tips-sidebar">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Bot className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Active Study Tips</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                powered by gemini
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1.5 text-xs">
              <h4 className="font-bold text-indigo-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Bilingual Mode
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                MRIVAN AI knows Hindi, Hinglish, and Bhojpuri natively! Ask: <em>&ldquo;Explain vectors in Hindi&rdquo;</em> for immediate clarity.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1.5 text-xs">
              <h4 className="font-bold text-emerald-900 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Save Summaries
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                When the Tutor gives you deep summaries, copy them straight into your dashboard notes folder in 1-click.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1.5 text-xs text-slate-500">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-800">Support any topic</h4>
          <p className="text-[10px] leading-relaxed">
            From Calculus integrals to history chapters or board assignments.
          </p>
        </div>
      </div>

      {/* Main Conversational Workspace (Flexible Column) */}
      <div className="flex-1 flex flex-col justify-between h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
        
        {/* Messages scroll node */}
        <div 
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
          id="conversation-container"
        >
          {messages.map((m) => {
            const isModel = m.role === "model";
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-3xl ${isModel ? "self-start" : "self-end ml-auto flex-row-reverse"}`}
              >
                {/* Visual avatars */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 ${
                  isModel ? "bg-slate-900 text-white" : "bg-indigo-600 text-white"
                }`}>
                  {isModel ? "M" : "S"}
                </div>

                <div className="space-y-1.5">
                  <div className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed border shadow-sm ${
                    isModel 
                      ? "bg-white border-slate-200 text-slate-800 rounded-tl-none whitespace-pre-wrap"
                      : "bg-indigo-600 border-indigo-700 text-white rounded-tr-none"
                  }`}>
                    
                    {/* Attached image preview inside historical bubble log */}
                    {m.image && (
                      <div className="mb-2 max-w-xs rounded-xl overflow-hidden border border-white/20">
                        <img src={m.image} alt="Uploaded diagnostic scan" className="w-full h-auto object-cover" />
                      </div>
                    )}

                    {/* Standard paragraph formatting */}
                    <div className="prose prose-sm prose-slate max-w-none">
                      {m.content}
                    </div>

                  </div>
                  
                  <span className="text-[10px] text-slate-400 font-semibold px-1 block">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-lg self-start">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 animate-pulse">
                M
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-500 rounded-3xl rounded-tl-none flex items-center gap-3">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></span>
                </span>
                <span>MRIVAN AI is studying explanation keys...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input prompt tray and suggest chips assembly */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-4 shadow-inner">
          
          {/* Suggest chips selection list (only present when conversation is fresh) */}
          {messages.length <= 2 && !isLoading && (
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block px-1">
                Suggested Starting Prompts
              </span>
              <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                {starterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.prompt)}
                    className="flex-shrink-0 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-slate-900 shadow-sm transition-all cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Local files attachment display block */}
          {attachedFileName && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg p-2 max-w-md animate-fade-in text-xs justify-between">
              <div className="flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-indigo-900 truncate max-w-xs">{attachedFileName}</span>
              </div>
              <button 
                onClick={removeAttachment}
                className="p-1 hover:bg-indigo-100 text-indigo-700 rounded"
              >
                ✕
              </button>
            </div>
          )}

          {/* Actual Chat Input panel */}
          <div className="flex items-stretch gap-2">
            
            {/* Textbook scan trigger picker button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 border border-slate-250 hover:border-slate-350 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
              title="Upload textbook exercise scan"
            >
              <Upload className="w-4.5 h-4.5" />
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Simulated Voice Recorder button */}
            <button
              onClick={triggerVoiceMock}
              disabled={voiceMocking}
              className={`p-3 border rounded-xl flex-shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                voiceMocking
                  ? "bg-red-50 border-red-200 text-red-500 animate-pulse"
                  : "border-slate-250 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-850"
              }`}
              title="Dictate message (hindi supported)"
            >
              <Mic className="w-4.5 h-4.5" />
            </button>

            {/* Text input channel */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSendMessage();
                }
              }}
              placeholder={voiceMocking ? "Listening..." : "Ask MRIVAN AI a question or drop textbook PDFs..."}
              className="flex-1 bg-slate-50 border border-slate-250 rounded-xl px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />

            {/* SEND button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || (!inputValue.trim() && !attachedImage)}
              className="p-3 shadow-md bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center flex-shrink-0 self-center disabled:opacity-50 disabled:hover:bg-indigo-600 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
