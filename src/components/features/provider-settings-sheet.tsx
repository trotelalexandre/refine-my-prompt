import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, Settings2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProviderSettings } from "@/types/provider";
import { useProviderSheet } from "@/hooks/use-provider-sheet";

interface ProviderSettingsSheetProps {
  provider: string;
  providerSettings: ProviderSettings;
  setProviderSettings: (settings: ProviderSettings) => void;
  validateSettings: () => void;
  isProviderLoading: boolean;
}

export function ProviderSettingsSheet({
  provider,
  providerSettings,
  setProviderSettings,
  validateSettings,
  isProviderLoading,
}: ProviderSettingsSheetProps) {
  const { isOpen, setIsOpen, lmModel, lmPort, openaiApiKey, mistralApiKey } =
    useProviderSheet({ providerSettings });

  if (provider === "default") return null;

  const renderProviderSettings = () => {
    switch (provider) {
      case "lmstudio":
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Model Name</label>
              <Input
                value={lmModel}
                onChange={(e) =>
                  setProviderSettings({
                    ...providerSettings,
                    lmstudio: {
                      lmModel: e.target.value,
                      lmPort,
                    },
                  })
                }
                placeholder="Enter model name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Server Port</label>
              <Input
                value={lmPort}
                onChange={(e) =>
                  setProviderSettings({
                    ...providerSettings,
                    lmstudio: {
                      lmModel,
                      lmPort: e.target.value,
                    },
                  })
                }
                placeholder="Enter port"
              />
            </div>
          </>
        );
      case "openai":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <Input
              value={openaiApiKey}
              onChange={(e) =>
                setProviderSettings({ openai: { apiKey: e.target.value } })
              }
              placeholder="Enter API key"
            />
          </div>
        );
      case "mistral":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <Input
              value={mistralApiKey}
              onChange={(e) =>
                setProviderSettings({ mistral: { apiKey: e.target.value } })
              }
              placeholder="Enter API key"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Settings2 size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Provider Settings</h2>

          <div className="space-y-4">
            {renderProviderSettings()}
            <Button
              onClick={() => {
                validateSettings();
                setIsOpen(false);
              }}
              className="mt-4"
              disabled={isProviderLoading}
            >
              {isProviderLoading ? (
                <div className="flex items-center gap-1">
                  <Loader2 size={20} className="animate-spin" /> Loading
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
