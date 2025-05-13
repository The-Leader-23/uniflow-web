import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"; // ✅ Correct import
import { SpeedInsights } from "@vercel/speed-insights/next"; // ✅ This is correct

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniFlow",
  description: "AI-powered learning assistant for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: "linear-gradient(to bottom right, #22d3ee, #3b82f6, #9333ea)",
          color: "white",
          minHeight: "100vh",
        }}
      >
        {children}
        <Analytics />         {/* ✅ now works again */}
        <SpeedInsights />    {/* ✅ new addition */}
      </body>
    </html>
  );
}


