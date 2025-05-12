import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: messages,
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content;

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
