import * as openai from "openai";

const config = new openai.Configuration({
  apiKey: import.meta.env.VITE_APP_CHAT_GPT_API_TOKEN,
});

/**
 * ChatGPTのAPIを扱うクラス
 */
export class ChatGPT {
  private client: openai.OpenAIApi
  
  /**
   * コンストラクタ
   */
  constructor () {
    this.client = new openai.OpenAIApi(config);
  }

  /**
   * 単純な送信
   * @param text 送信するプロンプト
   */
  async sendSimple (text: string): Promise<string> {
    try {
      const response = await this.client.createChatCompletion({
        // TODO: GPT-4のウェイトリスト解禁次第切り替える
        model: "gpt-3.5-turbo",
        messages: [ { role: "user", content: text, } ],
      });
      if (response.status !== 200) { throw response; }
      const responseText = response.data.choices[0].message?.content;
      if (!responseText) { throw response; }
      return responseText;
    } catch (error) {
      throw error;
    }
  }
}
