import { NextResponse } from "next/server";
import { getRefinedPrompt } from "@/utils/prompt-refiner";

export async function POST(request: Request) {
  try {
    const { prompt, tone, role, format, provider, providerSettings } =
      await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    return getRefinedPrompt(
      prompt,
      tone,
      role,
      format,
      provider,
      providerSettings,
    );
  } catch (error) {
    console.error("Error refining prompt:", error);
    return NextResponse.json(
      { error: "Error refining prompt" },
      { status: 500 },
    );
  }
}
