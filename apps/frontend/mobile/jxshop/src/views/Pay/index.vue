<template>
    <van-popup v-model:show="open" position="bottom"
        :style="{ padding: '12px', width: '100%', height: '90%', borderRedious: '4px' }" round>
        <section class='Pay'>
            <div class="shop-container">
                <header class="page-header">
                    <h1>购物车</h1>
                </header>
            </div>
            <div class="commdoties-container">
                <Checkout />
            </div>
        </section>
    </van-popup>
</template>

<script setup lang='ts'>
import { cloneDeep } from 'lodash-es'
import Checkout from './Checkout.vue'
const emit = defineEmits(['update:visible'])
const props = defineProps({
    visible: {
        type: Boolean,
    },
    datas: {
        type: Array<Object>
    }
})
const open = computed({
    get() {
        return props?.visible
    },
    set(value: Boolean) {
        emit('update:visible', value)
    }
})
const selectedLists = computed(() => {
    return cloneDeep(props?.datas)
})
console.log("ssdsd",)
</script>
<style scoped lang='scss'>
.Pay {}
</style>