<script setup lang="ts">
import tabbar from '@/components/tabbar/index.vue'
import { useDarkModeStore } from '@/store/modules/dark-mode'
const darkModeStore = useDarkModeStore()
const { theme } = storeToRefs(darkModeStore)
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider>
      <router-view v-slot="{ Component }">
        <!-- <keep-alive>
          <component :is="Component" />
        </keep-alive> -->
        <component :is="Component" />
      </router-view>
      <tabbar />
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  height: 100%;
  overflow: hidden;
  width: 100%;
}
</style>
