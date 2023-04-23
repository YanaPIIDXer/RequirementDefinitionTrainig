<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import PrimeButton from "primevue/button";

const prompt = ref("");
const response = ref("");
const isProcessing = ref(false);

/**
 * 送信
 */
const onSend = async () => {
  isProcessing.value = true;
}

defineExpose({
  MdEditor,
  PrimeButton,
  prompt,
  response,
  isProcessing,
});
</script>

<template lang="pug">
.sandBoxView
  .responseArea
    h2 出力
    MdEditor.output(v-model="response" :toolbars="[]" :footers="[]" :html-preview="true")
  .promptArea
    h2 入力
    MdEditor.input(v-model="prompt" placeholder="プロンプトを入力" :toolbars="[]" :footers="[]" :html-preview="true")
    PrimeButton.sendButton(label="Submit" :disabled="isProcessing" @click="onSend")
</template>

<style lang="sass" scoped>
.sandBoxView
  .responseArea
    .output
      height: 300px

  .promptArea
    margin-bottom: 50px

    .input
      height: 300px

    .sendButton
      width: 100%

</style>
