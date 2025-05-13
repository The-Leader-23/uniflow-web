"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🔐 Log In to UniFlow</h1>
      <p className="mb-6 text-white/70">Access your personalized learning dashboard</p>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
