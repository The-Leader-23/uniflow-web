"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useUser } from "@/hooks/useUser";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function CareerGuide() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || !user?.uid) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/careerguide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId: user.uid }),
      });

      if (res.status === 403) {
        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content:
              "⚠️ You've reached your free token limit. Upgrade for full career advice and university rankings.",
          },
        ]);
        setLoading(false);
        return;
      }

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "⚠️ No guidance received.",
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "⚠️ Something went wrong. Try again later." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 w-full max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">🧭 Real Talk Career Guide</h2>

      <div className="h-64 overflow-y-auto mb-4 space-y-3 bg-black/10 p-4 rounded border border-white/10">
        {messages.length === 0 && (
          <p className="text-white/60 italic">
            Ask about your dream career or which uni is best for your goals...
          </p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-white text-black"
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-white text-black p-3 rounded-lg w-fit text-sm animate-pulse">
            Thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. 'I want to become an actuary but also value speed and impact.'"
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
    </div>
  );
}

