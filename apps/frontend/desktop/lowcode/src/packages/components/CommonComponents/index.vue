<script setup lang="ts">
import LayoutComponents from './LayoutComponents/index.vue'
import BasicComponents from './BasicComponents/index.vue'
import ContainerComponents from './ContainerComponents/index.vue'
const value = defineModel()

</script>

<template>
    <section class="CommonComponents">
        <LayoutComponents />
        <ContainerComponents />
        <BasicComponents v-model:value="value" />
    </section>
</template>

<style scoped lang="scss">
.CommonComponents {
display: grid;
row-gap: 14px;  
}
</style>
