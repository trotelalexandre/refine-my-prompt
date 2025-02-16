import { Provider, ProviderSettings } from "@/types/provider";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./use-toast";

export const useProviderSettings = () => {
  const [provider, setProvider] = useState<Provider>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [providerSettings, setProviderSettings] = useState<ProviderSettings>({
    lmstudio: {
      lmModel: "",
      lmBaseURL: "",
    },
    openai: {
      apiKey: "",
    },
    mistral: {
      apiKey: "",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    const savedProvider: Provider = localStorage.getItem(
      "provider",
    ) as Provider;
    if (savedProvider) setProvider(savedProvider);

    const savedProviderSettings = localStorage.getItem("providerSettings");
    if (savedProviderSettings) {
      setProviderSettings(JSON.parse(savedProviderSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("provider", provider);
    localStorage.setItem("providerSettings", JSON.stringify(providerSettings));
  }, [provider, providerSettings]);

  useEffect(() => {
    setProviderSettings({
      lmstudio: {
        lmModel: providerSettings?.lmstudio?.lmModel ?? "",
        lmBaseURL: providerSettings?.lmstudio?.lmBaseURL ?? "",
      },
      openai: {
        apiKey: providerSettings?.openai?.apiKey ?? "",
      },
      mistral: {
        apiKey: providerSettings?.mistral?.apiKey ?? "",
      },
    });
  }, [
    providerSettings?.lmstudio?.lmModel,
    providerSettings?.lmstudio?.lmBaseURL,
    providerSettings?.mistral?.apiKey,
    providerSettings?.openai?.apiKey,
  ]);

  const validateSettings = useCallback(() => {
    setIsLoading(true);

    let isValid = true;
    switch (provider) {
      case "lmstudio": {
        const lmModel = providerSettings.lmstudio?.lmModel;
        const lmBaseURL = providerSettings.lmstudio?.lmBaseURL;

        if (!lmModel || !lmBaseURL) {
          toast({
            title: "Missing settings",
            description: "Please enter your LM Studio settings",
            variant: "destructive",
          });
          isValid = false;
        }
        break;
      }
      case "openai": {
        const openaiApiKey = providerSettings.openai?.apiKey;

        if (!openaiApiKey) {
          toast({
            title: "Missing settings",
            description: "Please enter your OpenAI API key",
            variant: "destructive",
          });
          isValid = false;
        }
        break;
      }
      case "mistral": {
        const mistralApiKey = providerSettings.mistral?.apiKey;

        if (!mistralApiKey) {
          toast({
            title: "Missing settings",
            description: "Please enter your Mistral API key",
            variant: "destructive",
          });
          isValid = false;
        }
        break;
      }
      default: {
        break;
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return isValid;
  }, [
    provider,
    providerSettings.lmstudio?.lmModel,
    providerSettings.lmstudio?.lmBaseURL,
    providerSettings.mistral?.apiKey,
    providerSettings.openai?.apiKey,
    toast,
  ]);

  return {
    provider,
    setProvider,
    providerSettings,
    setProviderSettings,
    validateSettings,
    isLoading,
  };
};
