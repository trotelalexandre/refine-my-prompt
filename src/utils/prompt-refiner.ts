import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});
const model = google("gemini-1.5-pro-latest");

export function getRefinedPrompt(
  prompt: string,
  tone: string,
  role: string | null,
  format: string | null
): Response {
  const systemPrompt = `
  Refine the following prompt for clarity, specificity, and effectiveness while preserving its intent. Follow these guidelines:
  • **Be Clear & Specific**: Ensure the request is direct and unambiguous.  
  • **Maintain Original Language**: Keep the original language unless specified otherwise. If the prompt is in French, the refined version should also be in French.  
  • **Enhance Context**: If relevant context is missing, provide background information to improve the prompt's precision.   
  • **Eliminate Ambiguity**: Remove unnecessary words while ensuring the core message remains intact.  
  • **Make it AI-Friendly**: Ensure the prompt is structured for optimal AI interpretation.

  ### User Preferences:
  • **Tone**: "${tone}"
  ${role ? `• **Role**: "${role}"` : ""}  
  ${format ? `• **Format**: "${format}"` : ""}  
  If any of these are set to "Choose for me," provide a reasonable suggestion based on the prompt.

  ### Explanation of Guidelines:
  • **Tone**: The tone allows the user to specify which tone should the AI use in the refined prompt.
  • **Role**: The role helps the AI understand the context of the refined prompt and provide a more accurate response.
  • **Format**: The format specifies the format of the refined prompt, such as paragraph, list, bullet points, or numbered list.
  While role and tone are incorporated into the refined prompt, the format is used to structure the refined prompt accordingly.

  ### Refine Prompt:
  **Original Prompt:** "${prompt.trim()}"
  `;

  const result = streamText({
    model,
    prompt: systemPrompt,
    system:
      "You are a professional writer refining a prompt for an AI assistant. Your answer needs to contain only the refined prompt.",
  }).toDataStreamResponse();
  return result;
}
