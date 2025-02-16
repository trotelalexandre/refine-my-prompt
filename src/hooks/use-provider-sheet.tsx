import { ProviderSettings } from "@/types/provider";
import { useMemo, useState } from "react";

interface ProviderSettingsSheetProps {
  providerSettings: ProviderSettings;
}

export const useProviderSheet = ({
  providerSettings,
}: ProviderSettingsSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const lmModel = useMemo(
    () => providerSettings.lmstudio?.lmModel ?? "",
    [providerSettings],
  );
  const lmBaseURL = useMemo(
    () => providerSettings.lmstudio?.lmBaseURL ?? "",
    [providerSettings],
  );
  const openaiApiKey = useMemo(
    () => providerSettings.openai?.apiKey ?? "",
    [providerSettings],
  );
  const mistralApiKey = useMemo(
    () => providerSettings.mistral?.apiKey ?? "",
    [providerSettings],
  );

  return {
    isOpen,
    setIsOpen,
    lmModel,
    lmBaseURL,
    openaiApiKey,
    mistralApiKey,
  };
};
