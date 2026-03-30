<template>
    <div class="User">
        <div class="topbar">
            <div class="title"><van-nav-bar title="订单详情" /></div>
        </div>
        <div class="user-info">
            <div class="info-container">
                <div class="image">
                    <van-image round width="16vw" height="16vw" :src="avatarUrl(formStates?.order?.User?.avatar)" />
                </div>
                <div class="top-container">{{ formStates?.order?.User?.nick_name }}</div>
                <div class="bottom-container">
                    <div v-if="isUnPay" class="unpay">
                        <div class="payCount">需付款：￥<span class="count">{{ formattedAmountCNY(formStates?.order?.amount) }}</span></div>
                        <div class="payTime">
                            剩余支付时间&nbsp
                            <van-count-down v-if="time" :time="time"@change="onChange">
                                <template #default="timeData">
                                    <span class="time">{{minutes  }}</span>
                                    &nbsp<strong>:</strong>&nbsp
                                    <span class="time">{{seconds }}</span>
                                </template>
                            </van-count-down>
                        </div>
                        <van-button round block type="success" @click="handlePay">
                            为好友买单
                        </van-button>
                        <PasswordInput :value="password" :focused="showKeyboard" @focus="showKeyboard = true" />
                    </div>
                    <div v-if="isSuccessPay" class="paysuccess">
                        <div class="contents">
                            <div class="title">支付成功</div>
                            <div class="tips">如发生退款，则原路返回</div>
                        </div>
                    </div>
                    <div v-if="isPayTimeout" class="paysuccess">
                        <div class="contents">
                            <div class="title">已过期</div>
                            <div class="tips">代付链接已过期,请重新生成订单</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orders">
                <div v-for="(order, index) in formStates?.order?.OrderItems" :key="index" class="order">
                    <div class="title">{{ order?.Commodity?.Shop?.name }}</div>
                    <div class="content-container">
                        <div class="image">
                            <van-image width="50px" height="50px" :src="avatarUrl(order?.Commodity?.fileName)" />
                        </div>
                        <div class="title">
                            <div class="name">{{ order?.Commodity?.name }}</div>
                            <div class="count">× {{ order?.Quantity }}</div>
                        </div>
                        <div class="price">￥{{ formattedAmountCNY(order?.total_price) }}</div>
                    </div>
                </div>
            </div>
            <div class="tips">
                <div class="title">代付说明</div>
                <ol>
                    <li>1、付款前请先与好友确认无误，避免受骗。</li>
                    <li>2、付款成功后，如需申请退款，可以联系好友申请退款。</li>
                    <li>3、当代付订单退款成功后，实付金额将原路退还代付人。</li>
                </ol>
            </div>
        </div>
    </div>
    <input id="image-code" accept="image/*" style="display: none" type="file" />
    <PayDialog :submitDatas="submitDatas" v-model:open="open" @close="handleClose"/>
</template>

<script setup lang="ts">
import { getPrepaidPaymentDetails } from "@/api/pay";
import PayDialog from '@/components/PayDialog.vue';
import { PasswordInput  } from 'vant';
import { avatarUrl, formattedAmountCNY } from '@/utils/index'
import { useSysStore } from '@/store/modules/sysStore'
const sysStore = useSysStore()
const route = useRoute()
const showKeyboard = ref(true)
const password = ref('')
const submitDatas = computed(() => {
    return orders.value ?? []
})
const open = ref(false)
const minutes = ref('00')
const seconds = ref('00')
const orders = ref([])
const isUnPay = computed(() => {
    return formStates.value?.order?.status === 0
})
const isPayTimeout = computed(() => {
    return formStates.value?.order?.status === 1
})
const onChange = (data: any) => {
    minutes.value = String(data?.minutes)?.padStart(2, '0')
    seconds.value = String(data?.seconds)?.padStart(2,'0')
}
const isSuccessPay = computed(() => {
    return formStates.value?.order?.status === 2
})
const formStates = ref({
    amount: 95,
    status: 1,
    timeLeft: 1,
})
const time = computed(() => {
    return formStates.value?.timeLeft ?  formStates.value?.timeLeft * 1000 : 0
})
const handlePay = () => {
    showKeyboard.value = true
    open.value = true
}
const handleClose = () => {
    // open.value = false
}
const init = async () => {
    const data = await getPrepaidPaymentDetails({ serialNumber: route.query.serialNumber })
    formStates.value = data ?? {}
}
onMounted(() => {
    nextTick(() => {
        init()
        // userInfo.value = cloneDeep(sysStore.userInfos)
    })
})
</script>

<style lang="scss" scoped>
$--image-width: 40px;

.User {
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
        width: 100%;
        background-color: #fff;

        .title {
            flex: 1;
        }

        .left,
        .right {
            width: 30px;
        }
    }

    .user-info {
        flex: 1;
        padding: 12px;
        background-color: rgb(240, 239, 239);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;
        overflow: auto;

        .info-container {
            background-color: #fff;
            width: 100%;
            border-radius: 4px;
            position: relative;
            margin-bottom: 10px;

            .image {
                margin-bottom: 30px;
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
            }

            .top-container {
                background-color: rgb(242, 211, 113);
                padding-top: 10vw;
                padding-bottom: 10px;
                border-radius: 4px 4px 0 0;
                display: grid;
                place-items: center;
                font-weight: 600;
                font-size: 14px;
            }

            .bottom-container {
                padding: 14px;

                .unpay {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    row-gap: 10px;

                    .payCount {
                        font-weight: 600;
                        font-size: 14px;

                        .count {
                            font-size: 26px;
                        }
                    }

                    .payTime {
                        font-size: 13px;
                        display: flex;
                        align-items: center;

                        .van-count-down {
                            display: flex;

                            .time {
                                display: inline-block;
                                background-color: #000;
                                color: #fff;
                                padding: 0px 2px;
                                display: grid;
                                place-items: center;
                                border-radius: 2px;
                                font-size: 12px;
                            }
                        }

                    }

                }

                .paysuccess {
                    display: grid;
                    place-items: center;

                    .contents {

                        .title {
                            font-weight: 600;
                            font-size: 14px;
                            color: #030303;
                            display: grid;
                            place-items: center;
                        }

                        .tips {
                            font-weight: 500;
                            font-size: 13px;
                            color: #c7c6c6;
                            display: grid;
                            place-items: center;
                        }
                    }

                }
            }

        }

        .orders {
            display: grid;
            row-gap: 10px;
            width: 100%;

            .order {
                padding: 14px;
                border-radius: 4px;
                background-color: #fff;
                width: 100%;

                .title {
                    font-size: 14px;
                    font-weight: 600;
                }

                .content-container {
                    display: flex;
                    justify-content: space-between;
                    column-gap: 8px;

                    .title {
                        flex: 1;
                        font-size: 14px;
                        font-weight: 400;

                        .count {
                            color: #d1d1d1;
                        }
                    }

                    .price {
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
            }
        }

        .tips {
            margin-top: 10px;
            width: 100%;
            .title {
                font-weight: 600;
                font-size: 16px;
            }

            li {
                font-size: 13px;
            }
        }
    }

}
</style>