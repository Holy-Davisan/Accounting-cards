export const OLLAMA_BASE = process.env.OLLAMA_BASE || "http://localhost:11434";
export const DEFAULT_OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama-2-7b";

export type OllamaOptions = {
  model?: string;
  max_tokens?: number;
  temperature?: number;
};

const DEFAULT_OLLAMA_TEMPERATURE = 0.5;
const DEFAULT_OLLAMA_MAX_TOKENS = 1024;

export async function ollamaGenerate(prompt: string, opts: OllamaOptions = {}) {
  const url = `${OLLAMA_BASE}/api/generate`;
  const body = {
    model: opts.model || DEFAULT_OLLAMA_MODEL,
    prompt,
    max_tokens: opts.max_tokens ?? DEFAULT_OLLAMA_MAX_TOKENS,
    temperature: opts.temperature ?? DEFAULT_OLLAMA_TEMPERATURE,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama request failed: ${res.status} ${text}`);
  }

  return res.json();
}

// Helper used by tool construction to assume model size < 10B
export const OllamaModelInfo = {
  name: DEFAULT_OLLAMA_MODEL,
  isSmall: true, // assume <10B
};

export default { ollamaGenerate, OllamaModelInfo };
