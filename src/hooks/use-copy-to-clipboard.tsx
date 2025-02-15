import { useState } from "react";
import { useToast } from "./use-toast";

interface UseCopyToClipboardProps {
  message: string;
}

export const useCopyToClipboard = ({ message }: UseCopyToClipboardProps) => {
  const [isCopying, setIsCopying] = useState(false);

  const { toast } = useToast();

  const copyToClipboard = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(message);

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

  return { isCopying, copyToClipboard };
};
