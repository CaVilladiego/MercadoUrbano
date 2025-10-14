export interface GeminiPort {
  generateText(prompt: string): Promise<string>;
}
