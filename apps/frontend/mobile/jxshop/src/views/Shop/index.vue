<template>
  <div class="store-page">
    <div class="store-header">
      <div class="back-btn" @click="$router.back()">
        <van-icon name="arrow-left" color="#fff" size="20" />
      </div>
      <img :src="avatar(shopDetails?.fileName)" alt="门店横幅" class="banner-img" />
      <div class="store-name">{{ shopDetails?.name }}</div>
    </div>
    <div class="product-list">
      <ProductItem v-for="item in products" :key="item.id" :item="item" @update-count="updateTotal" />
    </div>
    <!-- 底部结算栏 -->
    <div class="footer-bar">
      <div class="total">
        合计：<span class="amount">¥{{ total }}</span>
      </div>
      <button v-if="shopDetails.status == 1 && selectedLists?.length" class="sum-btn" @click="goToCheckout">去结算</button>
    </div>
  </div>
  <Pay v-if="payStatus" v-model:visible="payStatus" :datas="selectedLists" />
</template>

<script lang="ts" setup>
import Pay from '@/views/Pay/index.vue'
import { ref, computed } from 'vue';
import ProductItem from './ProductItem.vue';
import { useSysStore } from '@/store/modules/sysStore'
import { getShopCommodities, getShopDetail } from '@/api/shop';
import { formattedAmountCNY, formattedAmountCent } from '@/utils';
const payStatus = ref(false)
const route = useRoute()
const shopDetails = ref({})
const shopId = computed(() => {
  return Number(route.query.shopId)
})
const sysStore = useSysStore()
console.log("sdsd", sysStore.$state)
interface Product {
  id: number;
  name: string;
  desc: string;
  image: string;
  price: number;
  sales: number;
  count: number;
}
const avatar = (fileName: string) => {
  if (!fileName) return ''
  return import.meta.env.VITE_STORAGE_BASE_URL + fileName
}
const products = ref<Product[]>([]);
const selectedLists = computed(() => {
  return products?.value?.filter((item) => item.count)
})
const total = computed(() => {
  return formattedAmountCNY(products.value.reduce((sum, item) => sum + formattedAmountCent(item.price) * item.count, 0));
});

const updateTotal = () => {
  // 重新计算总价
};
const getShopsDetails = async () => {
  const data = await getShopDetail(shopId.value)
  shopDetails.value = data ?? {}
}
const getProducts = async () => {
  const data = await getShopCommodities(shopId.value)
  products.value = data?.map(item => {
    item.count = 0
    item.price = formattedAmountCNY(item?.price)
    return item
  }) ?? []
}
const goToCheckout = () => {
  payStatus.value = true
};
onMounted(() => {
  nextTick(() => {
    getShopsDetails()
    getProducts()
  })
})
</script>

<style lang="scss">
.store-page {
  height: 100dvh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .store-header {
    position: relative;
    width: 100%;
    overflow: hidden;

    .back-btn {
      position: absolute;
      top: 10px;
      left: 10px;
      cursor: pointer;
      background-color: #333;
      border-radius: 50%;
      padding: 4px;
      display: grid;
      place-content: center;
    }

    .banner-img {
      width: 100%;
      height: fit-content;
    }

    .store-name {
      position: absolute;
      top: 70px;
      left: 16px;
      transform: translateY(-50%);
      color: white;
      font-size: 18px;
      font-weight: bold;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 4px 8px;
      border-radius: 4px;
    }
  }

  .product-list {
    flex: 1;
    padding: 16px;
    background-color: white;
    border-top: 1px solid #eee;
    overflow: auto;
  }

  .footer-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: white;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;

    .total {
      font-size: 16px;
      color: #333;

      .amount {
        color: #f44;
        font-weight: bold;
      }
    }

    .sum-btn {
      padding: 8px 20px;
      background-color: #f44;
      color: white;
      border: none;
      border-radius: 24px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #e00;
      }
    }
  }
}
</style>