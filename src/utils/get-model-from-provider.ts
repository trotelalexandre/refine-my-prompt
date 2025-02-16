import { ProviderSettings } from "@/types/provider";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createOpenAI } from "@ai-sdk/openai";
import { createMistral } from "@ai-sdk/mistral";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});
const defaultModel = google("gemini-1.5-pro-latest");

export const getModelFromProvider = (
  provider: string,
  providerSettings: ProviderSettings,
) => {
  const lmstudio = createOpenAICompatible({
    name: "lmstudio",
    baseURL: `${providerSettings?.lmstudio?.baseUrl}/v1`,
  });
  const lmModel = lmstudio(providerSettings?.lmstudio?.lmModel ?? "");

  const openai = createOpenAI({
    apiKey: providerSettings?.openai?.apiKey ?? "",
    compatibility: "strict",
  });
  const openaiModel = openai("o1-mini");

  const mistral = createMistral({
    apiKey: providerSettings?.mistral?.apiKey ?? "",
  });
  const mistralModel = mistral("mistral-small-latest");

  switch (provider) {
    case "lmstudio": {
      return lmModel;
    }
    case "openai": {
      return openaiModel;
    }
    case "mistral": {
      return mistralModel;
    }
    default: {
      return defaultModel;
    }
  }
};
