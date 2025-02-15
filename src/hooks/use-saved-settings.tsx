import {
  formatOptions,
  roleSuggestions,
  toneOptions,
} from "@/data/context-tone-options";
import { useEffect, useState } from "react";

export const useSavedSettings = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<(typeof toneOptions)[number]>(
    toneOptions[0]
  );
  const [role, setRole] = useState<(typeof roleSuggestions)[number]>(
    roleSuggestions[0]
  );
  const [format, setFormat] = useState<(typeof formatOptions)[number]>(
    formatOptions[0]
  );

  useEffect(() => {
    const savedPrompt = localStorage.getItem("prompt");
    if (savedPrompt) setPrompt(savedPrompt);

    const savedTone = localStorage.getItem("tone");
    if (savedTone) setTone(JSON.parse(savedTone));

    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(JSON.parse(savedRole));

    const savedFormat = localStorage.getItem("format");
    if (savedFormat) setFormat(JSON.parse(savedFormat));
  }, []);

  useEffect(() => {
    localStorage.setItem("prompt", prompt);
    localStorage.setItem("tone", JSON.stringify(tone));
    localStorage.setItem("role", JSON.stringify(role));
    localStorage.setItem("format", JSON.stringify(format));
  }, [prompt, tone, role, format]);

  return { prompt, setPrompt, tone, setTone, role, setRole, format, setFormat };
};
