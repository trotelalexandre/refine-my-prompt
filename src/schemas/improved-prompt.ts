import { z } from "zod";

export const improvedPromptSchema = z.object({
  improvedPrompt: z.string(),
  role: z.string(),
  tone: z.string(),
  format: z.string(),
});
