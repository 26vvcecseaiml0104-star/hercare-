/* Cross-component event to open the global AI assistant from anywhere (e.g.
   the Safety screen). Keeps the AI panel mounted once at the app root. */
const OPEN_AI = "hercare:open-ai";

export function requestOpenAI(): void {
  window.dispatchEvent(new Event(OPEN_AI));
}

export function onOpenAIRequest(cb: () => void): () => void {
  const h = () => cb();
  window.addEventListener(OPEN_AI, h);
  return () => window.removeEventListener(OPEN_AI, h);
}
