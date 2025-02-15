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
        className="ring-none min-h-[150px] rounded-xl border-none bg-gray-50 p-4 transition-all duration-200 focus:shadow-xl dark:bg-gray-800 md:!text-lg md:placeholder:text-lg"
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
