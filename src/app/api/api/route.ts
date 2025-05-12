import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  try {
    // ✅ Debug: Show part of the key to confirm it's loading
    console.log("🛠 Using API key:", process.env.OPENAI_API_KEY?.slice(0, 10));

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

    console.log("✅ GPT reply:", data);

    const reply = data.choices?.[0]?.message?.content;

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("❌ Error from OpenAI:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

