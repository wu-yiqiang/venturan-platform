<template>
  <div class="checkout-page">
    <div class="cart-list">
      <CartItem v-for="item in cartItems" :key="item.id" v-model="selectedMap[item.id]" :item="item" />
    </div>
    <!-- 底部结算栏 -->
    <div class="checkout-footer">
      <div class="footer-left">
        <label class="select-all">
          <!-- <input type="checkbox" :checked="isAllSelected"  class="select-all-input" /> -->
          <div class="select-all-text" @click="toggleSelectAll">{{ isAllSelected ? '取消' : '全选' }}</div>
        </label>
      </div>
      <div class="footer-center">
        <div class="total-info">
          合计：
          <span class="total-price">¥ {{ totalPrice }}</span>
        </div>
        <div class="total-count">
          已选 {{ selectedCount }} 件商品
        </div>
      </div>
      <button class="pay-btn" :class="{ disabled: selectedCount === 0 }" :disabled="selectedCount === 0"
        @click="handlePay">
        去支付
      </button>
    </div>
  </div>

  <van-popup v-model:show="open" destroy-on-close round position="bottom">
    <van-picker title="选择支付方式" :columns="columns"  @confirm="onConfirm" @cancel="handleClosePayType" />
  </van-popup>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, reactive } from 'vue';
import { cloneDeep } from 'lodash-es'
import CartItem from './CartItem.vue';
import { formattedAmountCent, formattedAmountCNY } from '@/utils';
import { payPay } from '@/api/pay';
import { showSuccessToast } from 'vant';
const emit = defineEmits(['success'])
const props = defineProps({
  checkedlist: {
    type: Array<Object>,
    default: () => []
  },
})
interface CartItemData {
  id: number;
  name: string;
  count: number;
  price: number;
  fileName: string;
}
const open = ref(false)
const cartItems = ref<CartItemData[]>([]);
enum PayType {
  ALIPAY = 'alipay',
  WEPAY = 'wepay'
}
const columns = [
  { text: '支付宝', value: PayType.ALIPAY },
  { text: '微信支付', value: PayType.WEPAY },
];
const selectedMap = ref<Record<number, boolean>>(
  cartItems.value.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {} as Record<number, boolean>)
);
const handleClosePayType = () => {
  open.value = false
  emit('success')
}
const onConfirm = async ({ selectedValues }) => {
  const payType = selectedValues[0]
  // console.log("支付方式", payType)
  // console.log('选择的商品', selectedMap.value)
  const submitDatas = cartItems.value.filter((item) => selectedMap.value[item?.id])
  if (payType === PayType.ALIPAY) {

  }
  if (payType === PayType.WEPAY) {

  }
  await handlePaySubmit(submitDatas)
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
const selectedCount = computed(() =>
  cartItems.value.filter(item => selectedMap.value[item.id]).reduce((sum, item) => sum + item?.count, 0)
);

const totalPrice = computed(() => {
  return formattedAmountCNY(cartItems.value
    .filter(item => selectedMap.value[item.id])
    .reduce((sum, item) => sum + (formattedAmountCent(item.price) * item?.count), 0))
})

const isAllSelected = computed(() => {
  return cartItems.value.map(item => item.id).every(it => selectedMap.value[it])
}
);

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedMap.value = {}
  } else {
    cartItems.value.forEach(item => {
      selectedMap.value[item.id] = true;
    });
  }
};

const handlePay = () => {
  open.value = true
};
onMounted(() => {
  cartItems.value = cloneDeep(props?.checkedlist)
})
</script>

<style lang="scss" scoped>
.checkout-page {
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 6px;
  flex: 1;

  .cart-list {
    display: grid;
    row-gap: 10px;
    overflow: auto;
    margin-top: 10px;
    margin-bottom: 70px;
  }

  .checkout-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 12px;
    display: flex;
    align-items: center;

    .footer-left {
      .select-all {
        display: flex;
        align-items: center;
        cursor: pointer;

        .select-all-input {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .select-all-text {
          margin-left: 8px;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          user-select: none;
        }
      }
    }

    .footer-center {
      flex: 1;
      text-align: right;
      margin: 0 16px;

      .total-info {
        font-size: 16px;
        color: #333;
        margin-bottom: 4px;

        .total-price {
          color: #f44;
          font-weight: bold;
          font-size: 18px;
        }
      }

      .total-count {
        font-size: 12px;
        color: #999;
      }
    }

    .pay-btn {
      background: #f44;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: bold;
      min-width: 100px;
      cursor: pointer;
      transition: background 0.2s;

      &.disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      &:not(.disabled):active {
        background: #f44;
      }
    }
  }
}
</style>