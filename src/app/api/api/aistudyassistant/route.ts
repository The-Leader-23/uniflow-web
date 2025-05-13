import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message, userId } = await req.json();

  if (!message || !userId) {
    return NextResponse.json({ error: "Missing message or userId" }, { status: 400 });
  }

  try {
    // Fetch the user from Firestore
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const { tokensUsed = 0, maxTokens = 50000 } = userData;

    // ✅ Block request if limit reached
    if (tokensUsed >= maxTokens) {
      return NextResponse.json({ error: "Trial token limit reached" }, { status: 403 });
    }

    // 🧠 Send request to OpenAI
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content;

    // ✅ Estimate token usage (fallback = 400)
    const tokensUsedNow = data.usage?.total_tokens || 400;

    // ✅ Update Firestore token count
    await updateDoc(doc(db, "users", userId), {
      tokensUsed: increment(tokensUsedNow),
    });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Error in assistant route:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

