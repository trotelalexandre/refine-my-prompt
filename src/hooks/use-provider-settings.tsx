import { Provider, ProviderSettings } from "@/types/provider";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./use-toast";

export const useProviderSettings = () => {
  const [provider, setProvider] = useState<Provider>("default");
  const [lmModel, setLmModel] = useState("");
  const [lmPort, setLmPort] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [mistralApiKey, setMistralApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [providerSettings, setProviderSettings] = useState<ProviderSettings>({
    lmstudio: {
      lmModel: "",
      lmPort: "",
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

    const savedLmModel = localStorage.getItem("lmModel");
    if (savedLmModel) setLmModel(savedLmModel);

    const savedLmPort = localStorage.getItem("lmPort");
    if (savedLmPort) setLmPort(savedLmPort);

    const savedOpenaiApiKey = localStorage.getItem("openaiApiKey");
    if (savedOpenaiApiKey) setOpenaiApiKey(savedOpenaiApiKey);

    const savedMistraApiKey = localStorage.getItem("mistralApiKey");
    if (savedMistraApiKey) setMistralApiKey(savedMistraApiKey);
  }, []);

  useEffect(() => {
    localStorage.setItem("provider", provider);
    localStorage.setItem("lmModel", lmModel);
    localStorage.setItem("lmPort", lmPort);
    localStorage.setItem("openaiApiKey", openaiApiKey);
    localStorage.setItem("mistralApiKey", mistralApiKey);
  }, [provider, lmModel, lmPort, openaiApiKey, mistralApiKey]);

  useEffect(() => {
    setProviderSettings({
      lmstudio: {
        lmModel,
        lmPort,
      },
      openai: {
        apiKey: openaiApiKey,
      },
      mistral: {
        apiKey: mistralApiKey,
      },
    });
  }, [lmModel, lmPort, mistralApiKey, openaiApiKey]);

  const validateSettings = useCallback(() => {
    setIsLoading(true);

    let isValid = true;
    switch (provider) {
      case "lmstudio":
        if (!lmModel || !lmPort) {
          toast({
            title: "Missing settings",
            description: "Please enter your LM Studio settings",
            variant: "destructive",
          });
          isValid = false;
        }
        break;
      case "openai":
        if (!openaiApiKey) {
          toast({
            title: "Missing settings",
            description: "Please enter your OpenAI API key",
            variant: "destructive",
          });
          isValid = false;
        }
        break;
      case "mistral":
        if (!mistralApiKey) {
          toast({
            title: "Missing settings",
            description: "Please enter your Mistral API key",
            variant: "destructive",
          });
          isValid = false;
        }
        break;
      default:
        break;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return isValid;
  }, [provider, lmModel, lmPort, openaiApiKey, mistralApiKey, toast]);

  return {
    provider,
    setProvider,
    providerSettings,
    setProviderSettings,
    validateSettings,
    isLoading,
  };
};
