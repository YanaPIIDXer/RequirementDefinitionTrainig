<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import PrimeButton from "primevue/button";
import PrimeTextArea from "primevue/textarea";
import { ChatGPT } from "@/classes/ChatGPT";

const prompt = ref("");
const response = ref("");
const isProcessing = ref(false);

/**
 * 送信
 */
const onSend = async () => {
  isProcessing.value = true;
  try {
    const gpt = new ChatGPT();
    response.value = await gpt.sendSimple(prompt.value);
    prompt.value = "";
  } catch (error) {
    alert("Error");
    console.error(error);
  } finally {
    isProcessing.value = false;
  }
}

defineExpose({
  MdEditor,
  PrimeButton,
  PrimeTextArea,
  prompt,
  response,
  isProcessing,
  onSend,
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
