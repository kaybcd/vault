import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    // Check if key exists
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json({ reply: "Error: NEXT_PUBLIC_GEMINI_API_KEY is missing in .env.local" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ reply: "AI failed to respond. Check terminal logs." }, { status: 500 });
  }
}