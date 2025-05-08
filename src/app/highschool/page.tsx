'use client';
import { motion } from 'framer-motion';

export default function HighSchoolDashboard() {
  const cardClass =
    'mb-6 p-5 bg-white/20 rounded-xl shadow-lg backdrop-blur-xl border border-white/30 hover:scale-[1.01] transition-transform duration-300';

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white">
      <h1 className="text-3xl font-bold mb-6">High School Student Dashboard</h1>

      <motion.section
        className={cardClass}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-white">🎓 FlowAssist</h2>
        <p className="text-gray-200">
          Your all-in-one AI assistant: ask questions, plan study time, get reminders, and track progress.
        </p>
      </motion.section>

      <motion.section
        className={cardClass}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-white">📅 Smart Study Planner</h2>
        <p className="text-gray-200">
          Based on your subjects, tests, and deadlines — FlowAssist recommends what to study and when.
        </p>
      </motion.section>

      <motion.section
        className={cardClass}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-white">📚 AI Study Assistant</h2>
        <ul className="list-disc ml-5 text-gray-200">
          <li>Upload notes or textbooks to get instant AI summaries</li>
          <li>Break down long content into clear, digestible chunks</li>
          <li>Create smart flashcards from any topic</li>
          <li>Generate custom past paper-style questions with memos</li>
        </ul>
      </motion.section>

      <motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
  <h2 className="text-xl font-semibold mb-2 text-white">🧑‍🏫 AI Tutor</h2>
  <ul className="list-disc ml-5 text-gray-200">
    <li>Choose tutor style: strict, fun, chill, etc.</li>
    <li>Learn via video, audio, or live Q&A</li>
    <li>Escalate to real tutors if needed</li>
  </ul>
</motion.section>

<motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
  <h2 className="text-xl font-semibold mb-2 text-white">🧘 Mental Wellness Tools</h2>
  <ul className="list-disc ml-5 text-gray-200">
    <li>Mood check-ins, burnout detection</li>
    <li>Motivational nudges + recharge vault</li>
    <li>Vent space + imposter syndrome support</li>
  </ul>
</motion.section>

<motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
  <h2 className="text-xl font-semibold mb-2 text-white">🧠 Digital Hub</h2>
  <ul className="list-disc ml-5 text-gray-200">
    <li>Smart inbox for academic updates</li>
    <li>Lecture summaries, research digests</li>
    <li>Digital student ID</li>
  </ul>
</motion.section>

<motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
  <h2 className="text-xl font-semibold mb-2 text-white">🧭 Career Coaching</h2>
  <ul className="list-disc ml-5 text-gray-200">
    <li>AI-generated career paths</li>
    <li>Salary expectations, study strategy</li>
  </ul>
</motion.section>

<motion.section className={cardClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
  <h2 className="text-xl font-semibold mb-2 text-white">🔗 SkillSync Integration</h2>
  <ul className="list-disc ml-5 text-gray-200">
    <li>Jobs, internships, tutoring gigs</li>
    <li>AI-enhanced CV + interview prep</li>
  </ul>
</motion.section>


      {/* Add more <motion.section> blocks below for the rest of the features... */}

    </main>
  );
}

  
  
  
  