<script setup lang="ts">
import { provide, ref } from 'vue';
import {registerConfig} from './utils/editor-config.tsx';
import data from './components/data.json';
import Editor from './packages/editor.vue';
const formState = ref(data);
provide('config', registerConfig)
</script>

<template>
  <div class="app">
    <Editor v-model:value="formState" />
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
