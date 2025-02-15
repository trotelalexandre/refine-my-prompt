import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface RefinedPromptProps {
  prompt: string;
}

export function RefinedPrompt({ prompt }: RefinedPromptProps) {
  const [isCopying, setIsCopying] = useState(false);

  const { toast } = useToast();

  const copyToClipboard = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(prompt);

      toast({
        title: "Copied to clipboard",
        description: "The refined prompt has been copied to your clipboard.",
        duration: 2000,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description:
          "An error occurred while copying the text. Please try again.",
        duration: 2000,
      });
    } finally {
      setTimeout(() => {
        setIsCopying(false);
      }, 2000);
    }
  };

  return (
    <div className="mt-8">
      <Card className="relative overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={copyToClipboard}
          disabled={isCopying}
        >
          {isCopying ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy refined prompt</span>
        </Button>
        <CardContent className="p-6">
          <p className="text-muted-foreground md:text-lg leading-relaxed whitespace-pre-wrap">
            {prompt}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
