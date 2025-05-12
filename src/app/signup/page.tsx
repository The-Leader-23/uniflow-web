'use client';

import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";

export default function SignupPage() {
  return (
    <main className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white p-6">
      <Image
        src="/UniFlowLogo.png"
        alt="UniFlow Logo"
        width={120}
        height={120}
        className="mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">🎉 Welcome to UniFlow</h1>
      <p className="mb-6 text-white/70">Create your profile to get started</p>

      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}
