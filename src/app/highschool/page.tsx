"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { useUser } from "@/hooks/useUser";
import { db } from "@/lib/firebase";
import { differenceInDays } from "date-fns";

import FlowAssist from "@/components/ui/highschool/flowassist";
import StudyPlanner from "@/components/ui/highschool/StudyPlanner";
import AIStudyAssistant from "@/components/ui/highschool/AIStudyAssistant";
import AITutor from "@/components/ui/highschool/AITutor";
import WellnessTools from "@/components/ui/highschool/WellnessTools";
import CareerGuide from "@/components/ui/highschool/CareerGuide";
import LoginForm from "@/components/auth/LoginForm";

export default function HighSchoolDashboard() {
  const { user, loading, expired } = useUser();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (user && user.firstLoginDone === false) {
      setWelcomeMessage("🎉 Welcome to UniFlow!");

      updateDoc(doc(db, "users", user.uid), {
        firstLoginDone: true,
      });
    } else if (user) {
      setWelcomeMessage("👋 Welcome back to UniFlow");
    }

    if (user?.trialEndsAt) {
      const remaining = differenceInDays(new Date(user.trialEndsAt), new Date());
      const clamped = Math.max(0, Math.min(5, remaining));
      setDaysLeft(clamped);
    }
  }, [user]);

  const cardClass =
    'mb-6 p-5 bg-white/20 rounded-xl shadow-lg backdrop-blur-xl border border-white/30 hover:scale-[1.01] transition-transform duration-300';

  if (loading) return <p className="p-6 text-white">Loading...</p>;
  if (!user) return <LoginForm />;
  if (expired) {
    return (
      <main className="p-6 text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">⚠️ Trial Expired</h1>
        <p className="mb-4 text-white/70">
          Your 5-day free trial has ended. To continue using UniFlow’s smart tools, upgrade for only <strong>R100</strong>.
        </p>
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
          Upgrade Now
        </button>
      </main>
    );
  }

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white">
      {daysLeft !== null && (
        <div className="text-sm text-white text-center bg-orange-500/80 py-2 rounded mb-4">
          🕐 {daysLeft} day{daysLeft === 1 ? "" : "s"} left in your 5-day <strong>free trial</strong>.{" "}
          After that, continue learning for just <strong>R100</strong>.
        </div>
      )}

      {welcomeMessage && <h1 className="text-3xl font-bold mb-6">{welcomeMessage}</h1>}

      <motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <FlowAssist />
      </motion.section>

      <motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <StudyPlanner />
      </motion.section>

      <motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <AIStudyAssistant />
      </motion.section>

      <motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <AITutor />
      </motion.section>

      <motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <WellnessTools />
      </motion.section>

      <motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
        <CareerGuide />
      </motion.section>
    </main>
  );
}





  
  
  
  