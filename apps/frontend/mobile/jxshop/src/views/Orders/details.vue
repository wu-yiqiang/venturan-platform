<template>
    <div class="OrdersDetails">
        <div class="topbar">
            <van-icon name="arrow-left" @click="handleback"/>
            <div class="title"><van-nav-bar title="订单详情" /></div>
            <van-nav-bar />
        </div>
        <div class="info-orders">
                                    <div class="sum">总金额：¥ {{ formattedAmountCNY(formStates?.amount) }}</div>
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
const formStates = ref({});
const avatar = (fileName: string) => {
    if (!fileName) return ''
    return import.meta.env.VITE_STORAGE_BASE_URL + fileName
}
const handleback = () => {
    router.back()
}
</script>

<style lang="scss" scoped>
.OrdersDetails {
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
                        place-items: center;
                    }
                }

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
</style>