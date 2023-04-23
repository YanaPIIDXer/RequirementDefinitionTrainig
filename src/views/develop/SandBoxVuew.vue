<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import PrimeButton from "primevue/button";
import PrimeTextArea from "primevue/textarea";
import { ChatGPT } from "@/classes/ChatGPT";

const prompt = ref("");
const response = ref("");
const isProcessing = ref(false);
const gpt = new ChatGPT(true);

/**
 * 送信
 */
const onSend = async () => {
  isProcessing.value = true;
  try {
    response.value = await gpt.sendSimple(prompt.value);
    prompt.value = "";
  } catch (error) {
    alert("Error");
    console.error(error);
  } finally {
    isProcessing.value = false;
  }
};

/**
 * コンテキストをクリア
 */
const clearContexts = () => {
  gpt.clearContexts();
  alert("コンテキストを初期化しました");
};

defineExpose({
  MdEditor,
  PrimeButton,
  PrimeTextArea,
  prompt,
  response,
  isProcessing,
  onSend,
  clearContexts,
});
</script>

<template lang="pug">
.sandBoxView
  .responseArea
    h2 出力
    MdEditor.output(v-model="response" :toolbars="[]" :footers="[]" :preview-only="true" :html-preview="true")
  .promptArea
    h2 入力
    PrimeTextArea.input(v-model="prompt" placeholder="プロンプトを入力")
    PrimeButton.sendButton(label="Submit" :disabled="isProcessing || prompt === ''" @click="onSend")
    PrimeButton.sendButton(label="コンテキスト初期化" class="p-button-danger" :disabled="isProcessing" @click="clearContexts")
</template>

<style lang="sass" scoped>
.sandBoxView
  .responseArea
    border: 1px solid #00FF00
    margin-bottom: 50px
    
    .output
      height: 300px

  .promptArea
    border: 1px solid #0000FF

    .input
      width: 100%
      resize: none
      height: 150px

    .sendButton
      width: 100%

</style>
