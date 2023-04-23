import axios, { type AxiosInstance } from "axios";

const baseUrl = location.origin + "/assets/prompts";

/**
 * プロンプトのフェッチ
 */
export class Prompts {
  static instance: Prompts = new Prompts();
  private axios: AxiosInstance;
  
  /**
   * 開始プロンプト
   */
  async fetchStart(): Promise<string> {
    return this.fetch("/start.md");
  }

  private async fetch(fileName: string): Promise<string> {
    try {
      const response = await this.axios.get(fileName);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  private constructor() {
    this.axios = axios.create({
      baseURL: baseUrl,
    })
  }
}
