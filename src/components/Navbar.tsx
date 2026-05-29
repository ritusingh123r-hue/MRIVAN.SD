/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageView } from "../types";
import { BookOpen, User, Sparkles, LogOut, Menu, X, Landmark, GraduationCap } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentView: PageView;
  setView: (view: PageView) => void;
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  userName: string;
  hasProUpgrade: boolean;
}

export default function Navbar({
  currentView,
  setView,
  isLoggedIn,
  setLoggedIn,
  userName,
  hasProUpgrade,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: PageView; proOnly?: boolean }[] = [
    { label: "Home", view: "home" },
    { label: "Features", view: "features" },
    { label: "Pricing", view: "pricing" },
    { label: "About", view: "about" },
  ];

  const studentLinks: { label: string; view: PageView; proOnly?: boolean }[] = [
    { label: "Dashboard", view: "dashboard" },
    { label: "AI Tutor Chat", view: "chat" },
    { label: "Study Timer", view: "timer" },
  ];

  const handleLogout = () => {
    setLoggedIn(false);
    setView("home");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand Brand */}
          <div className="flex items-center">
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 hover:opacity-90 flex-shrink-0 cursor-pointer"
              id="nav-logo-btn"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-1.5 shadow-sm shadow-blue-500/20">
                <img
                  src="/src/assets/images/mrivan_ai_logo_1780062977962.png"
                  alt="M Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-sans font-bold tracking-tight text-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MRIVAN AI
              </span>
            </button>

            {/* Desktop Static Nav Bar links */}
            <div className="hidden md:ml-8 md:flex md:space-x-1 lg:space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => setView(link.view)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    currentView === link.view
                      ? "text-blue-600 bg-blue-50/50"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              {isLoggedIn && (
                <div className="h-6 w-px bg-slate-200 self-center mx-2" />
              )}

              {isLoggedIn &&
                studentLinks.map((link) => (
                  <button
                    key={link.view}
                    onClick={() => setView(link.view)}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                      currentView === link.view
                        ? "text-indigo-600 bg-indigo-50/70 shadow-sm"
                        : "text-indigo-600/85 hover:text-indigo-950 hover:bg-slate-50"
                    }`}
                  >
                    {link.view === "chat" && <Sparkles className="w-3.5 h-3.5" />}
                    {link.label}
                  </button>
                ))}
            </div>
          </div>

          {/* User Signin initials side bar badge */}
          <div className="hidden md:flex md:items-center md:gap-4_ flex-shrink-0 gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {hasProUpgrade ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                    <Sparkles className="w-3 h-3 fill-amber-100" />
                    PRO MEMBER
                  </span>
                ) : (
                  <button
                    onClick={() => setView("pricing")}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    Upgrade Free Basic
                  </button>
                )}

                <div 
                  onClick={() => setView("dashboard")} 
                  className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                  title="Go to student dashboard"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                    {getInitials(userName)}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                    {userName}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView("login")}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setView("login")}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/10 hover:shadow-lg hover:opacity-95 transition-all cursor-pointer"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle link */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setView(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-lg ${
                  currentView === link.view
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}

            {isLoggedIn && (
              <div className="border-t border-slate-100 my-2 pt-2">
                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Student Portal
                </div>
                {studentLinks.map((link) => (
                  <button
                    key={link.view}
                    onClick={() => {
                      setView(link.view);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 text-base font-semibold text-indigo-600 rounded-lg ${
                      currentView === link.view
                        ? "bg-indigo-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-slate-100 bg-slate-50/50">
            {isLoggedIn ? (
              <div className="px-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                    {getInitials(userName)}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-800 tracking-tight">
                      {userName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {hasProUpgrade ? "Pro Account Active" : "Free Plan Member"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      setView("dashboard");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setView("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-sm font-semibold text-slate-700 border border-slate-200 bg-white rounded-lg hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setView("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md rounded-lg"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
