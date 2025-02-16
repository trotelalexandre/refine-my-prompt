export type ProviderSettings = {
  lmstudio?: {
    lmModel: string;
    lmPort: string;
  };
  openai?: {
    apiKey: string;
  };
  mistral?: {
    apiKey: string;
  };
};

export type Provider = "default" | "lmstudio" | "openai" | "mistral";
