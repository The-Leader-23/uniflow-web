"use client";

import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useUser } from "@/hooks/useUser";

export default function StudyPlanner() {
  const { user } = useUser();
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [style, setStyle] = useState("focused");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = () => {
    const today = new Date();
    const testDate = new Date(date);
    const daysLeft = differenceInCalendarDays(testDate, today);

    if (isNaN(daysLeft) || daysLeft < 0) {
      return `Help me make a study plan for ${subject}, but I think I entered an invalid or past date. Just give me a general plan.`;
    }

    if (daysLeft <= 2) {
      return `Emergency mode: I have a ${subject} test in ${daysLeft} day(s). Please give me a crash study plan that works even under time pressure.`;
    }

    return `Create a ${style} day-by-day study plan for my upcoming ${subject} test on ${date}. I have ${daysLeft} days left to prepare.`;
  };

  const handlePlan = async () => {
    if (!user?.uid) return;

    setLoading(true);
    const prompt = generatePrompt();

    const res = await fetch("/api/flowassist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt, userId: user.uid }),
    });

    if (res.status === 403) {
      setPlan("⚠️ You've reached your free trial token limit. Upgrade to generate personalized study plans.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setPlan(data.reply || "⚠️ Sorry, no response received.");
    setLoading(false);
  };

  const formatResponse = (text: string) => {
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, idx) => (
        <li key={idx} className="mb-1">
          {line}
        </li>
      ));
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 w-full max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">📅 Smart Study Planner</h2>

      <div className="mb-4 space-y-3">
        <input
          type="text"
          placeholder="Subject (e.g. Biology)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 rounded bg-black/20 border border-white/20"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded bg-black/20 border border-white/20"
        />

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full p-2 rounded bg-black/20 border border-white/20"
        >
          <option value="focused">🎯 Focused & Intensive</option>
          <option value="light">🌤 Light & Spread Out</option>
          <option value="mixed">🔄 Mixed Approach</option>
        </select>

        <button
          onClick={handlePlan}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 w-full"
          disabled={loading}
        >
          {loading ? "Planning..." : "Generate Study Plan"}
        </button>
      </div>

      {plan && (
        <div className="mt-6 p-4 bg-black/30 rounded border border-white/10">
          <strong className="block mb-2 text-lg">🧠 Your Plan:</strong>
          <ul className="list-disc list-inside text-white/90">{formatResponse(plan)}</ul>
        </div>
      )}
    </div>
  );
}

