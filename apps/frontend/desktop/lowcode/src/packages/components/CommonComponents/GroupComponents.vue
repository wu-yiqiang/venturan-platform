<template>
  <section class="GroupComponents">
    <div class="GroupComponentsTitle">
      {{ title }}
      <el-button  link @click="isUp = !isUp">
        <el-icon :size="20">
          <ArrowUpBold v-if="isUp" />
          <ArrowDownBold v-if="!isUp" />
        </el-icon>
      </el-button>
    </div>
    <div v-if="!isUp" class="components">
      <slot />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
const isUp = ref(false)
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.GroupComponents{
  border: 1px solid rgb(236, 236, 236);
  padding: 6px;
  border-radius: 4px;
  .GroupComponentsTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .components {
    padding: 14px;
  }
}
</style>
