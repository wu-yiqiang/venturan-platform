<script setup lang="ts">
import { useSysStore } from '@/store/modules/sysStore';


defineOptions({
  name: 'StatusTag',
})

const props = defineProps<{
    type: string
    value: number
}>()
const lists = ref([])
const init = async () => {
  const sysStore = useSysStore()
  const data  = sysStore.ShopStatus
  lists.value = data ?? []
}
const current = computed(() => {
    return lists.value?.find((item: any) => item.mappingValue === props?.value)
})
onMounted(() => {
    nextTick(() => {
        init()
    })
})
</script>
<template>
<div class="StatusTag" :style="{backgroundColor: current?.backgroundColor}">
    {{lists?.length ? current?.name : null}}
</div>
</template>

<style scoped>
.StatusTag {
  padding: 4px;
  border-radius: 0  0 4px 4px;
  font-size: 10px;
  transform: scale(0.9);
}
</style>
