"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("High School Student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      // Try to sign up
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        role,
        plan: "trial",
        joinedAt: serverTimestamp(),
        trialEndsAt: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days
        firstLoginDone: false,
        tokensUsed: 0,
        maxTokens: 50000, // 🧠 adjust as needed
      });      

      router.push("/dashboard");

    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        // Fallback to login if user already exists
        try {
          const loginCred = await signInWithEmailAndPassword(auth, email, password);
          if (loginCred.user) {
            router.push("/dashboard");
          }
        } catch (loginErr: any) {
          console.error("Login fallback failed:", loginErr);
          setError("This email is already registered. Please log in instead.");
        }
      } else {
        console.error("Signup failed:", err);
        setError(err.message || "Something went wrong.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4 text-white">
      <h2 className="text-2xl font-bold">🎉 Welcome to UniFlow</h2>
      <p className="text-white/70">Who are you?</p>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 rounded bg-white/10 border border-white/20 w-full"
      >
        <option>High School Student</option>
        <option>Tertiary Student</option>
        <option>Teacher</option>
      </select>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 w-full rounded bg-white/10 border border-white/20"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 w-full rounded bg-white/10 border border-white/20"
      />

      <button
        onClick={handleSignup}
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : "Sign Up"}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <p className="text-sm text-white/60">
        Already have an account?{" "}
        <a href="/login" className="underline text-white hover:text-blue-300">
          Log in here
        </a>
      </p>
    </div>
  );
}


