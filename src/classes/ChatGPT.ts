import * as openai from "openai";

const config = new openai.Configuration({
  apiKey: import.meta.env.VITE_APP_CHAT_GPT_API_TOKEN,
});

/**
 * ChatGPTのAPIを扱うクラス
 */
export class ChatGPT {
  private client: openai.OpenAIApi
  private contexts: openai.ChatCompletionRequestMessage[] = [];
  
  /**
   * コンストラクタ
   * @param isEnableContext コンテキストを有効にするか？
   */
  constructor (private isEnableContext: boolean = false) {
    this.client = new openai.OpenAIApi(config);
  }

  /**
   * 単純な送信
   * @param text 送信するプロンプト
   */
  async sendSimple (text: string): Promise<string> {
    try {
      const requestMessage: openai.ChatCompletionRequestMessage = { role: "user", content: text };
      const response = await this.client.createChatCompletion({
        // model: "gpt-4",
        // TODO: GPT-4のウェイトリスト解禁次第切り替える
        model: "gpt-3.5-turbo",
        messages: [ ...this.contexts, requestMessage ],
      });
      if (response.status !== 200 || !response.data.choices[0].message) { throw response; }
      const responseText = response.data.choices[0].message.content;
      if (!responseText) { throw response; }
      if (this.isEnableContext) {
        this.contexts.push(requestMessage);
        this.contexts.push(response.data.choices[0].message);
      }
      
      return responseText;
    } catch (error) {
      throw error;
    }
  }

  /**
   * コンテキストの初期化
   */
  clearContexts(): void {
    this.contexts.splice(0);
  }
}
