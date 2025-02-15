"use client";

import { PromptInput } from "@/components/features/prompt-input";
import { RefineButton } from "@/components/features/refine-button";
import { RefinedPrompt } from "@/components/features/refined-prompt";
import { ContextToneOptions } from "@/components/features/context-tone-options";
import { useCompletion } from "@ai-sdk/react";
import { useSavedSettings } from "@/hooks/use-saved-settings";
import { useRefining } from "@/hooks/use-refining";
import { ThemeToggle } from "@/components/global/theme-toggle";

export default function Home() {
  const { prompt, tone, role, format, setPrompt, setTone, setRole, setFormat } =
    useSavedSettings();
  const { completion, complete } = useCompletion({
    api: "/api/refine",
    body: { tone, role, format },
  });
  const { isLoading, handleRefine } = useRefining({
    prompt,
    tone,
    role,
    format,
    complete,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="py-4 md:py-6 border-b bg-background flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-center flex-grow">
          Refine My Prompt
        </h1>
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow container max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2">
            <form onSubmit={handleRefine} className="space-y-6">
              <div>
                <PromptInput value={prompt} onChange={setPrompt} />
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

      <footer className="p-4 text-center text-sm text-muted-foreground bg-background border-t">
        <p>
          Enter your prompt above and click &apos;Refine My Prompt&apos; to get
          an improved version and earn points!
        </p>
      </footer>
    </div>
  );
}
