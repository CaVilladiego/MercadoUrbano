import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY')!;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generateText(prompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'models/gemini-2.5-pro',
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async listModels(): Promise<any> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`;
    const { data } = await axios.get(url);
    return data.models.map((m: any) => m.name);
  }
}
