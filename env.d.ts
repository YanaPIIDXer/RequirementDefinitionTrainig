/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * ChatGPT APIトークン
   */
  readonly VITE_APP_CHAT_GPT_API_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
