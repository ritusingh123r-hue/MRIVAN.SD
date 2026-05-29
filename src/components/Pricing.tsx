/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, AlertCircle, Bookmark, Shield, Sparkles, Receipt, Database, Calendar } from "lucide-react";

interface PricingProps {
  hasProUpgrade: boolean;
  setProUpgrade: (pro: boolean) => void;
  isLoggedIn: boolean;
  setView: (v: any) => void;
}

export default function Pricing({
  hasProUpgrade,
  setProUpgrade,
  isLoggedIn,
  setView,
}: PricingProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [activePlan, setActivePlan] = useState<{ name: string; price: string } | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  
  // Checkout simulation states
  const [cardName, setCardName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckedCorrect, setIsCheckedCorrect] = useState(false);

  const plans = [
    {
      id: "free",
      name: "Free Basic Plan",
      priceINR: "₹0",
      description: "Quick glimpse for students starting on school test preps.",
      iconName: "book",
      features: [
        "5 AI tutor questions per day",
        "Basic static revision notes",
        "Standard focus timer loops",
        "Banner advertisement support",
        "Single-device logins"
      ],
      ctaText: "Active Account",
      badge: "FREEMIUM",
      colorGradient: "from-slate-700 to-slate-900",
      proExclusive: false,
    },
    {
      id: "pro",
      name: "Smarter Pro Plan",
      priceINR: "₹199",
      period: "month",
      description: "The complete personal AI teacher experience for top scores.",
      iconName: "brain",
      features: [
        "Unlimited continuous AI Tutor chats",
        "Full textbook notes & summaries exports",
        "Uncapped MCQ practice papers & exams",
        "Real-time Score Predictor algorithms",
        "Ad-free focused learning loops",
        "Priority high-speed Gemini response state"
      ],
      ctaText: "Upgrade to Pro",
      badge: "MOST POPULAR",
      colorGradient: "from-blue-600 via-indigo-600 to-purple-600",
      proExclusive: true,
      popular: true,
    },
    {
      id: "school",
      name: "School & Admin Plan",
      priceINR: "₹1000",
      period: "month",
      description: "Equip entire sections or classrooms with teacher admin privileges.",
      iconName: "chart",
      features: [
        "All Smarter Pro capabilities for 50+ students",
        "Comprehensive Teacher Admin Dashboard",
        "Generate custom collective tests for entire class",
        "Granular cohort performance analytics",
        "Custom school branding export options",
        "Dedicated VIP priority assistance server link"
      ],
      ctaText: "Contact Class Deployment",
      badge: "INSTITUTIONS",
      colorGradient: "from-emerald-700 to-teal-800",
      proExclusive: true,
    }
  ];

  const handleCtaClick = (plan: typeof plans[0]) => {
    if (!isLoggedIn) {
      setView("login");
      return;
    }
    if (plan.id === "free") {
      // already free by default
      return;
    }
    if (plan.id === "pro") {
      setActivePlan({ name: "Smarter Pro Plan", price: "₹199 / month" });
      setShowCheckout(true);
    } else {
      setActivePlan({ name: "School Cohort Plan", price: "₹1,000 / month" });
      setShowCheckout(true);
    }
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim() || !phoneNumber.trim()) {
      alert("Please complete the required fields to verify the test subscription.");
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProUpgrade(true);
      setShowCheckout(false);
      setIsCheckedCorrect(true);
      setTimeout(() => {
        setView("dashboard");
      }, 1500);
    }, 1800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-8 pb-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pitch Headline */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="px-3 py-1 bg-blue-50 border border-blue-150 inline-block text-[11px] uppercase tracking-wider font-extrabold text-blue-700 rounded-full">
            Flexible Subscription Models
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            An Unbeatable Price for Future Success
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Choose a level that matches your study pace. Upgrade risk-free anytime to experience absolute ad-free education assistance.
          </p>

          {/* Toggle Monthly/Annually (decorative but realistic) */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 mt-2">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCycle === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              Billing Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
                billingCycle === "annually" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              Billing Annually
              <span className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black">
                -20% Save
              </span>
            </button>
          </div>
        </div>

        {/* Upgrade Success Notification */}
        {isCheckedCorrect && (
          <div className="max-w-md mx-auto mb-8 bg-emerald-50 border-2 border-emerald-500 p-4 rounded-2xl text-emerald-800 text-center shadow-lg animate-bounce">
            <h3 className="font-extrabold text-lg text-emerald-900">🎉 Congratulations! Upgrade Complete</h3>
            <p className="text-xs font-semibold text-emerald-700 mt-1">
              You are now an executive MRIVAN AI Pro Member! Redirecting to your premium dashboard...
            </p>
          </div>
        )}

        {/* Visual Pricing Grid layout built with beautiful white space and shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p) => {
            const isOwnPlan = p.id === "pro" ? hasProUpgrade : p.id === "free" ? !hasProUpgrade : false;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col justify-between rounded-[32px] border bg-white p-7 transition-all ${
                  p.popular
                    ? "border-indigo-500 ring-2 ring-indigo-500/25 shadow-xl scale-[1.02]"
                    : "border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Popular high quality badge marker */}
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md">
                    <Sparkles className="w-3 h-3 fill-amber-100 animate-spin" /> {p.badge}
                  </span>
                )}

                {/* Card Headings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {p.badge}
                    </span>
                    {isOwnPlan && (
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg text-emerald-700 bg-emerald-50 border border-emerald-200 uppercase">
                        Current Tier
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {p.name}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {p.description}
                  </p>

                  <div className="pt-2 font-sans">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                      {billingCycle === "annually" && p.id !== "free"
                        ? "₹" + Math.round(Number(p.priceINR.replace("₹", "")) * 0.8)
                        : p.priceINR}
                    </span>
                    {p.period && (
                      <span className="text-sm font-semibold text-slate-500">
                        {" "}/ {billingCycle === "annually" ? "year (billed annually)" : p.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features tick loop */}
                <div className="space-y-3.5 my-8 pt-6 border-t border-slate-100 flex-1">
                  {p.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className={`p-0.5 rounded-full mt-0.5 ${
                        p.popular ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </span>
                      <span className="text-slate-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Trigger */}
                <button
                  onClick={() => handleCtaClick(p)}
                  disabled={isOwnPlan && p.id === "free"}
                  className={`w-full py-4.5 rounded-2xl font-bold text-center text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                    isOwnPlan
                      ? "bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                      : p.popular
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-indigo-500/20"
                      : "bg-slate-950 hover:bg-slate-850 text-white shadow-slate-900/10"
                  }`}
                >
                  {isOwnPlan ? "Plan Active" : p.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Simulator Checkout Glass Box Modal */}
        {showCheckout && activePlan && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border text-left border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-fade-in">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-extrabold text-slate-900 text-lg">Secure Sandbox Payment</h3>
                </div>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-1 px-2 hover:bg-slate-100 text-slate-500 rounded-lg text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-50/70 rounded-2xl p-4 my-4 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan selected:</span>
                  <strong className="font-extrabold text-slate-950">{activePlan.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Subscription price:</span>
                  <strong className="font-extrabold text-indigo-700">{activePlan.price}</strong>
                </div>
                <div className="flex justify-between text-[10px] text-green-600 pt-1.5 border-t border-slate-200/60 font-medium">
                  <span>Sandbox Environment:</span>
                  <span>No physical currency will be charged</span>
                </div>
              </div>

              <form onSubmit={handleSimulatePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                    Full Name (associated with school dashboard)
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="E.g., Janmayjay Singh"
                    className="w-full text-sm bg-white border border-slate-250 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                    WhatsApp/Mobile Number for updates
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="E.g. +91 98765 43210"
                    className="w-full text-sm bg-white border border-slate-250 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="p-3 bg-amber-50 border border-amber-150 rounded-xl flex gap-2.5 items-start text-amber-800 text-[11px] leading-relaxed">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p>
                    By proceeding, you agree to activate simulated premium access parameters. Your dashboard statistics and AI limits will immediately scale.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Confirming Sandbox Order...
                    </>
                  ) : (
                    "Authorize Instant Activation"
                  )}
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
