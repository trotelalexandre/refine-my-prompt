import {
  formatOptions,
  roleSuggestions,
  toneOptions,
} from "@/app/data/context-tone-options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
        <Select
          value={selectedFormat ?? ""}
          onValueChange={(e) => {
            setFormatChange(e);
          }}
        >
          <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent className="bg-blue-50 dark:bg-blue-900 border border-blue-900/40 dark:border-blue-50/40">
            {formatOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              className={`cursor-pointer transition-all px-4 py-2`}
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
              className={`cursor-pointer transition-all px-4 py-2`}
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
