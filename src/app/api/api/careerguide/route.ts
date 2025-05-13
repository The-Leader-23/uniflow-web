import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-0125-preview", // You can fall back to gpt-3.5-turbo if needed
        messages: [
          {
            role: "system",
            content: `
You are a brutally honest South African career mentor. The user is a high school student.

- Give straight talk advice about which universities are best for their goal.
- Include pros, cons, myths, and what type of student thrives at each.
- Rank top 3 schools.
- Mention things students don’t know (e.g. timelines, workload, red tape).
- Keep it bold, smart, short, and impactful.

Be friendly, but pull no punches.
            `,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.8,
      }),
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content;

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
