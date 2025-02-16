import { streamText } from "ai";
import { getModelFromProvider } from "./get-model-from-provider";
import { ProviderSettings } from "@/types/provider";

export function getRefinedPrompt(
  userPrompt: string,
  tone: string,
  role: string | null,
  format: string | null,
  provider: string,
  providerSettings: ProviderSettings,
): Response {
  const prompt = `Original Prompt: "${userPrompt.trim()}"`;
  const system = `You are a professional prompt engineer. A user asked you to improve their prompt before sending it to the AI model. You should output a string containing the refined prompt only. Keep the original language of the input prompt. The user wants to use the prompt to generate a ${tone} text. The user wants the AI to play a ${role ?? "non-technical user"}. The user wants to use the prompt in ${format ?? "text"} format. If missing any information, you can use your best judgment to refine the prompt and trying to automatically answer the user's needs.`;

  const model = getModelFromProvider(provider, providerSettings);

  const result = streamText({
    model,
    prompt,
    system,
  }).toDataStreamResponse();
  return result;
}
