import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface RefinedPromptProps {
  prompt: string;
}

export function RefinedPrompt({ prompt }: RefinedPromptProps) {
  const { copyToClipboard, isCopying } = useCopyToClipboard({
    message: prompt,
  });

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
