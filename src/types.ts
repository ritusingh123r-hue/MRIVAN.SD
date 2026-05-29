/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageView = "home" | "about" | "features" | "pricing" | "dashboard" | "chat" | "timer" | "login" | "subscription";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
  image?: string; // local preview base64
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  selectedAnswer: string | null;
  score: number;
  showExplanation: boolean;
  isCompleted: boolean;
}

export interface PracticeAttempt {
  id: string;
  subject: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
}

export interface SavedNote {
  id: string;
  title: string;
  content: string;
  subject: string;
  timestamp: string;
}

export interface StudentDashboardData {
  attempts: PracticeAttempt[];
  notes: SavedNote[];
  timerStreak: number;
  focusTimeTotal: number;
  predictedScore: number;
}

export interface FeatureCardType {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface PricingPlanType {
  id: string;
  name: string;
  priceINR: string;
  priceUSD: string;
  period: string;
  features: string[];
  isPopular: boolean;
  iconName: string;
  badge?: string;
}
