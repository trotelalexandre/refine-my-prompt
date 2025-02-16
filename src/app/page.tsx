"use client";

import { PromptInput } from "@/components/features/prompt-input";
import { RefineButton } from "@/components/features/refine-button";
import { RefinedPrompt } from "@/components/features/refined-prompt";
import { ContextToneOptions } from "@/components/features/context-tone-options";
import { useCompletion } from "@ai-sdk/react";
import { useSavedSettings } from "@/hooks/use-saved-settings";
import { useRefining } from "@/hooks/use-refining";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProviderSettings } from "@/hooks/use-provider-settings";
import { Provider } from "@/types/provider";
import { ProviderSettingsSheet } from "@/components/features/provider-settings-sheet";

export default function Home() {
  const {
    provider,
    setProvider,
    providerSettings,
    setProviderSettings,
    validateSettings,
    isLoading: isProviderLoading,
  } = useProviderSettings();

  const { prompt, tone, role, format, setPrompt, setTone, setRole, setFormat } =
    useSavedSettings();
  const { completion, complete } = useCompletion({
    api: "/api/refine",
    body: { tone, role, format, provider, providerSettings },
  });
  const { isLoading, handleRefine } = useRefining({
    prompt,
    complete,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between bg-background px-4 py-4 md:px-12">
        <div className="flex items-center gap-4">
          <h1 className="text-center text-xl font-bold">Refine My Prompt</h1>
          <Badge className="text-white">Beta</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={provider}
            onValueChange={(value) => setProvider(value as Provider)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="lmstudio">LM Studio</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="mistral">Mistral</SelectItem>
            </SelectContent>
          </Select>

          <ProviderSettingsSheet
            {...{
              provider,
              providerSettings,
              setProviderSettings,
              validateSettings,
              isProviderLoading,
            }}
          />
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto max-w-3xl flex-grow px-4 pb-12 pt-4 sm:py-12 md:py-16">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2">
            <form onSubmit={handleRefine} className="space-y-8">
              <div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Enter your prompt
                  </p>
                  <PromptInput value={prompt} onChange={setPrompt} />
                </div>
                <ContextToneOptions
                  selectedFormat={format}
                  selectedRole={role}
                  selectedTone={tone}
                  setToneChange={setTone}
                  setRoleChange={setRole}
                  setFormatChange={setFormat}
                />
              </div>
              <RefineButton isLoading={isLoading} />
            </form>
          </div>

          {completion && completion.trim() !== "" && (
            <RefinedPrompt prompt={completion} />
          )}
        </div>
      </main>

      <footer className="border-t bg-background p-4 text-center text-sm text-muted-foreground">
        <p>
          Enter your prompt above and click &apos;Refine My Prompt&apos; to get
          an improved version.
        </p>
      </footer>
    </div>
  );
}
