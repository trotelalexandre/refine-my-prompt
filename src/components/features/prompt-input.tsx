import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function PromptInput({
  value,
  onChange,
  maxLength = 280,
}: PromptInputProps) {
  const charCount = value.length;
  const charCountColor =
    charCount > maxLength * 0.9 ? "text-red-500" : "text-gray-500";

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Enter your prompt here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[150px] md:!text-lg md:placeholder:text-lg p-4 rounded-lg shadow-sm border-none ring-2 transition-all duration-200"
        maxLength={maxLength}
      />

      {maxLength && (
        <div className="flex justify-end">
          <span className={`text-sm font-semibold ${charCountColor}`}>
            {charCount}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
