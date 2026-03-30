<template>
    <van-popup v-model:show="open" destroy-on-close round position="bottom" >
        <van-picker title="选择支付方式" :columns="columns" @confirm="onConfirm" @cancel="handleClosePayType" />
    </van-popup>
</template>

<script setup lang='ts'>
import { payPay } from '@/api/pay';
import { showSuccessToast } from 'vant';
const emit = defineEmits(['close', "update:value"])
const open = defineModel<boolean>('open')
const props = defineProps({
    submitDatas: {
        type: Array,
        default: () => []
    }
})
enum PayType {
    ALIPAY = 'alipay',
    WEPAY = 'wepay'
}
const columns = [
    { text: '支付宝', value: PayType.ALIPAY },
    { text: '微信支付', value: PayType.WEPAY },
];
const onConfirm = async ({ selectedValues }) => {
    const payType = selectedValues[0]
    // console.log("支付方式", payType)
    // console.log('选择的商品', selectedMap.value)
    console.log('sdsdsd', props?.submitDatas)
    if (payType === PayType.ALIPAY) {

    }
    if (payType === PayType.WEPAY) {

    }
    await handlePaySubmit(props?.submitDatas)
    showSuccessToast("支付成功")
    handleClosePayType()
};
const handlePaySubmit = async (req: any) => {
    const reqParams = req?.map((item) => {
        const it = {
            commodityId: item?.id,
            count: item?.count,
        }
        return it
    })
    await payPay(reqParams)
}
const handleClosePayType = () => {
    open.value = false
    emit('close')
}
</script>
<style scoped lang='scss'></style>