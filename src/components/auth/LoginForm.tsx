"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [greeting, setGreeting] = useState("👋 Welcome back to UniFlow");

  const handleLogin = async () => {
    setError("");

    try {
      // Step 1: Sign in
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Step 2: Check Firestore for firstLoginDone field
      const userDoc = await getDoc(doc(db, "users", uid));
      const isFirstTime = userDoc.exists() && userDoc.data()?.firstLoginDone === false;

      // Step 3: Show appropriate greeting
      setGreeting(isFirstTime ? "🎉 Welcome to UniFlow" : "👋 Welcome back to UniFlow");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4 text-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold">{greeting}</h2>

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
        onClick={handleLogin}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
      >
        Log In
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
