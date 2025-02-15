import {
  formatOptions,
  roleSuggestions,
  toneOptions,
} from "@/data/context-tone-options";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface ContextToneOptionsProps {
  selectedFormat: (typeof formatOptions)[number];
  selectedRole: (typeof roleSuggestions)[number];
  selectedTone: (typeof toneOptions)[number];
  setToneChange: (value: (typeof toneOptions)[number]) => void;
  setRoleChange: (value: (typeof roleSuggestions)[number]) => void;
  setFormatChange: (value: (typeof formatOptions)[number]) => void;
}

export function ContextToneOptions({
  selectedFormat,
  selectedRole,
  selectedTone,
  setToneChange,
  setRoleChange,
  setFormatChange,
}: ContextToneOptionsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">
          Select a format
        </p>
        <div className="flex flex-wrap gap-2">
          {formatOptions.map((suggestedFormat) => (
            <Badge
              key={suggestedFormat}
              variant={
                selectedFormat === suggestedFormat ? "default" : "outline"
              }
              className={`cursor-pointer px-4 py-2 transition-all ${
                suggestedFormat === selectedFormat
                  ? "text-white"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => {
                setFormatChange(suggestedFormat);
              }}
            >
              {suggestedFormat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">
          Select a role
        </p>
        <div className="flex flex-wrap gap-2">
          {roleSuggestions.map((suggestedRole) => (
            <Badge
              key={suggestedRole}
              variant={selectedRole === suggestedRole ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-all ${
                selectedRole === suggestedRole
                  ? "text-white"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => {
                setRoleChange(suggestedRole);
              }}
            >
              {suggestedRole}
            </Badge>
          ))}
        </div>

        {selectedRole === "Custom" && (
          <Input
            type="text"
            placeholder="Enter custom role"
            value={selectedRole}
            onChange={(e) => {
              setRoleChange(e.target.value);
            }}
            className="mt-2 border border-gray-300 dark:border-gray-600"
          />
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">
          Select a tone
        </p>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((suggestedTone) => (
            <Badge
              key={suggestedTone}
              variant={selectedTone === suggestedTone ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-all ${
                selectedTone === suggestedTone
                  ? "text-white"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => {
                setToneChange(suggestedTone);
              }}
            >
              {suggestedTone}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
