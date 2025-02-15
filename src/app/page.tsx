"use client";

import { PromptInput } from "@/components/features/prompt-input";
import { RefineButton } from "@/components/features/refine-button";
import { RefinedPrompt } from "@/components/features/refined-prompt";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ContextToneOptions } from "@/components/features/context-tone-options";
import {
  formatOptions,
  roleSuggestions,
  toneOptions,
} from "./data/context-tone-options";
import { useCompletion } from "@ai-sdk/react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState<(typeof toneOptions)[number]>(
    toneOptions[0]
  );
  const [role, setRole] = useState<(typeof roleSuggestions)[number]>(
    roleSuggestions[0]
  );
  const [format, setFormat] = useState<(typeof formatOptions)[number]>(
    formatOptions[0]
  );

  const { toast } = useToast();
  const { completion, complete } = useCompletion({
    api: "/api/refine",
  });

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a prompt to refine.",
      });
      return;
    }

    setIsLoading(true);
    await complete(prompt, { body: { tone, role, format } });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 dark:bg-blue-900">
      <header className="py-4 md:py-6 border-b bg-background">
        <h1 className="text-2xl font-bold text-center">Refine My Prompt</h1>
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
