"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("High School Student");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        role,
        plan: "trial",
        joinedAt: serverTimestamp(),
        trialEndsAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        firstLoginDone: false
      });
    } catch (err: any) {
      setError(err.message);
    }
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
      <button onClick={handleSignup} className="w-full bg-white text-black py-2 rounded hover:bg-gray-200">
        Sign Up
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
