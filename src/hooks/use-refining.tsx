import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { RequestOptions } from "ai";

interface UseRefiningProps {
  prompt: string;
  complete: (
    prompt: string,
    options?: RequestOptions,
  ) => Promise<string | null | undefined>;
}

export const useRefining = ({ prompt, complete }: UseRefiningProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

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
    await complete(prompt)
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, handleRefine };
};
