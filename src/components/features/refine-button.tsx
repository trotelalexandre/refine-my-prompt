import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import { useRef } from "react";

interface RefineButtonProps {
  isLoading: boolean;
}

export function RefineButton({ isLoading }: RefineButtonProps) {
  const pulseRef = useRef<HTMLSpanElement>(null);

  return (
    <Button
      type="submit"
      className="relative w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 overflow-hidden"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-1 h-5 w-5 animate-spin" />
          Refining...
        </>
      ) : (
        <>
          <Wand2 className="mr-1 h-5 w-5" />
          <span>Refine My Prompt</span>
          <span
            ref={pulseRef}
            className="absolute inset-0 bg-white/50 rounded-md animate-pulse opacity-5"
          />
        </>
      )}
    </Button>
  );
}
