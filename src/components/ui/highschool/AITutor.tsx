"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const tutorStyles = {
  strict: {
    label: "Strict and structured",
    system: "You are a disciplined, no-nonsense tutor. Be concise, accurate, and maintain high standards.",
  },
  chill: {
    label: "Chill and supportive",
    system: "You are a relaxed, supportive tutor. Explain topics clearly and encourage the student.",
  },
  fun: {
    label: "Fun and interactive",
    system: "You are a fun, energetic tutor. Use humor, examples, and relatable metaphors to teach.",
  },
};

const quickPrompts = [
  "Explain photosynthesis like I'm 10",
  "Test me with 3 quick math questions",
  "Teach me the quadratic formula visually",
  "Help me understand gravity",
];

export default function AITutor() {
  const [styleKey, setStyleKey] = useState<"strict" | "chill" | "fun">("strict");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);

  const style = tutorStyles[styleKey];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const history = [
      { role: "system", content: style.system },
      ...messages.filter((msg) => msg.role !== "system"),
      userMessage,
    ];

    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/aitutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "⚠️ No response from tutor.",
      };

      setMessages([...messages, userMessage, assistantMessage]);
    } catch (err) {
      setMessages([
        ...messages,
        { role: "assistant", content: "⚠️ Something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 w-full max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">🧑‍🏫 AI Tutor</h2>

      <div className="mb-4">
        <select
          value={styleKey}
          onChange={(e) => setStyleKey(e.target.value as "strict" | "chill" | "fun")}
          className="w-full p-2 rounded bg-black/20 border border-white/20"
        >
          {Object.entries(tutorStyles).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickPrompt(prompt)}
            className="text-sm px-3 py-1 rounded bg-white/20 border border-white/30 hover:bg-white/30 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="h-64 overflow-y-auto mb-4 space-y-3 bg-black/10 p-4 rounded border border-white/10">
        {messages.length === 0 && (
          <p className="text-white/60 italic">
            Choose your tutor style and ask anything — study tips, explanations, questions...
          </p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-auto bg-purple-500 text-white"
                : msg.role === "assistant"
                ? "mr-auto bg-white text-black"
                : "hidden"
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-white text-black p-3 rounded-lg w-fit text-sm animate-pulse">
            Tutor is thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask your AI tutor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded bg-black/20 border border-white/20"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          disabled={loading}
        >
          Send
        </button>
      </div>

      <div className="mt-6 bg-white/10 rounded p-4 border border-white/20 text-sm text-white/80">
        <p className="mb-2 italic">🎥 Video Mode & 🎧 Audio Tutoring — Coming Soon!</p>
        <div className="flex gap-3">
          <button disabled className="bg-white/20 border border-white/30 px-3 py-2 rounded cursor-not-allowed text-white/70">
            🎥 Launch Video (Beta)
          </button>
          <button disabled className="bg-white/20 border border-white/30 px-3 py-2 rounded cursor-not-allowed text-white/70">
            🎧 Start Audio (Beta)
          </button>
          <button
            onClick={() => setNotify(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
          >
            Notify me when ready
          </button>
        </div>
        {notify && <p className="mt-2 text-green-300">✅ You'll be notified when it's live!</p>}
      </div>
    </div>
  );
}