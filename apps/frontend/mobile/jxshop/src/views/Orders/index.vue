<template>
    <div class="Orders">
        <div class="topbar">
            <van-icon name="arrow-left" @click="handleback" />
            <div class="title"><van-nav-bar title="我的订单" /></div>
            <van-nav-bar />
        </div>
        <div class="info-orders">
            <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
                <div class="cards">
                    <div v-for="store in storeList" :key="store.id" class="store-card"
                        @click="goToStoreDetail(store?.id)">
                        <div class="title">订单号： {{ store?.serialNumber }}</div>
                        <div class="images">
                            <div v-for="(item, index) in store.OrderItems" class="image">
                                <van-image :key="index" :src="avatar(item.Commodity.fileName)" width="100%"
                                    fit="cover" />
                                <div class="count">×{{ item?.Quantity }}</div>
                            </div>
                        </div>
                        <div class="result">
                            <span>{{ OrderStatus[store?.status] }}</span>
                            <div class="sum">支付金额：¥ {{ formattedAmountCNY(store?.amount) }}</div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getOrders } from '@/api/pay';
import { formattedAmountCNY } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const loading = ref(false);
const finished = ref(false);
const storeList = ref<any[]>([]);
const OrderStatus  = {
    0: '未支付',
    1: '支付超时',
    2: '已支付'
}
const onLoad = async () => {
    const data = await getOrders()
    storeList.value = data ?? []
    loading.value = false;
    finished.value = true;
};
const avatar = (fileName: string) => {
    if (!fileName) return ''
    return import.meta.env.VITE_STORAGE_BASE_URL + fileName
}
const handleback = () => {
    router.back()
}
const goToStoreDetail = (orderId: any) => {
    // router.push({
    //     name: 'OrderDetails', query: {
    //         orderId: orderId
    //     }
    // });
};
</script>

<style lang="scss" scoped>
.Orders {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;

    .topbar {
        position: sticky;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 12px;

        .title {
            flex: 1;
        }
    }

    .info-orders {
        padding: 12px 12px 60px 12px;
        overflow: auto;
        flex: 1;
        overflow-x: auto;
        background-color: #e0e0e0;

        .cards {
            display: grid;
            row-gap: 10px;
            width: 100%;
            overflow-x: auto;

            .store-card {
                padding: 12px;
                border-radius: 4px;
                width: 100%;
                overflow-x: auto;
                background: #fff;

                .title {
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .images {
                    display: flex;
                    flex-direction: row;
                    column-gap: 10px;
                    overflow-x: auto;
                    width: 100%;
                    column-gap: 10px;

                    .image {
                        min-width: 100px;
                        width: 100px;
                        display: grid;
                        position: relative;
                        border-radius: 2px;

                        .count {
                            position: absolute;
                            top: 0px;
                            left: 0px;
                            padding: 2px;
                            border-radius: 0 2px 2px 0;
                            background-color: rgba(204, 204, 204, 0.5);
                            display: grid;
                            place-content: center;
                            font-size: 12px;
                            color: #fff;
                        }
                    }
                }

                .result {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .sum {
                        display: flex;
                        justify-content: end;
                        font-size: 14px;
                        color: red;
                        margin-top: 10px;
                    }
                }

            }
        }

    }
}
</style>