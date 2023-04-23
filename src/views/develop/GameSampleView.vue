<script setup lang="ts">
import { ref, onMounted } from "vue";
import MdEditor from "md-editor-v3";
import PrimeButton from "primevue/button";
import PrimeTextArea from "primevue/textarea";
import { ChatGPT } from "@/classes/ChatGPT";
import { Prompts } from "@/classes/Prompts";

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
 * ゲームをリセット
 */
const resetGame = async () => {
  await gameStart();
  alert("ゲームをリセットしました");
};

/**
 * ゲームスタート
 */
const gameStart = async () => {
  gpt.clearContexts();
  prompt.value = "";
  response.value = "";
  
  const startPrompt = await Prompts.instance.fetchStart();
  isProcessing.value = true;
  try {
    response.value = await gpt.sendSimple(startPrompt);
  } catch (error) {
    alert("Error");
    console.error(error);
  } finally {
    isProcessing.value = false;
  }
};

onMounted(gameStart);

defineExpose({
  MdEditor,
  PrimeButton,
  PrimeTextArea,
  prompt,
  response,
  isProcessing,
  onSend,
  resetGame,
});
</script>

<template lang="pug">
.gameSampleView
  .responseArea
    h2 出力
    MdEditor.output(v-model="response" :toolbars="[]" :footers="[]" :preview-only="true" :html-preview="true")
  .promptArea
    h2 入力
    PrimeTextArea.input(v-model="prompt" placeholder="プロンプトを入力")
    PrimeButton.sendButton(label="Submit" :disabled="isProcessing || prompt === ''" @click="onSend")
    PrimeButton.sendButton(label="ゲームをリセット" class="p-button-danger" :disabled="isProcessing" @click="resetGame")
</template>

<style lang="sass" scoped>
.gameSampleView
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
