<!-- src/views/Checkout.vue -->
<template>
  <div class="checkout-page">

    <!-- 商品列表 -->
    <main class="cart-list">
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        v-model="selectedMap[item.id]"
        :item="item"
      />
    </main>

    <!-- 底部结算栏 -->
    <footer class="checkout-footer">
      <div class="footer-left">
        <label class="select-all">
          <input
            type="checkbox"
            :checked="isAllSelected"
            @change="toggleSelectAll"
            class="select-all-input"
          />
          <span class="select-all-text">全选</span>
        </label>
      </div>

      <div class="footer-center">
        <div class="total-info">
          合计：
          <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="total-count">
          已选 {{ selectedCount }} 件商品
        </div>
      </div>

      <button
        class="pay-btn"
        :class="{ disabled: selectedCount === 0 }"
        :disabled="selectedCount === 0"
        @click="handlePay"
      >
        去支付
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import CartItem from './CartItem.vue';

interface CartItemData {
  id: number;
  title: string;
  desc: string;
  price: number;
  image: string;
}

export default defineComponent({
  name: 'CheckoutPage',
  components: {
    CartItem,
  },
  setup() {
    // 模拟购物车数据
    const cartItems = reactive<CartItemData[]>([
      {
        id: 1,
        title: 'Apple iPhone 15 Pro Max 256GB',
        desc: '钛金属 黑色',
        price: 9999.00,
        image: 'https://placehold.co/80x80/eee/999?text=iPhone',
      },
      {
        id: 2,
        title: '小米智能空气炸锅 4.5L',
        desc: '触控屏 家用大容量',
        price: 299.00,
        image: 'https://placehold.co/80x80/eee/999?text=AirFryer',
      },
      {
        id: 3,
        title: '华为 FreeBuds Pro 3 耳机',
        desc: '无线降噪蓝牙耳机',
        price: 1499.00,
        image: 'https://placehold.co/80x80/eee/999?text=Earbuds',
      },
    ]);

    // 选中状态映射 { id: boolean }
    const selectedMap = reactive<Record<number, boolean>>(
      cartItems.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {} as Record<number, boolean>)
    );

    // 计算属性
    const selectedCount = computed(() =>
      cartItems.filter(item => selectedMap[item.id]).length
    );

    const totalPrice = computed(() =>
      cartItems
        .filter(item => selectedMap[item.id])
        .reduce((sum, item) => sum + item.price, 0)
    );

    const isAllSelected = computed(() =>
      cartItems.length > 0 && selectedCount.value === cartItems.length
    );

    // 方法
    const toggleSelectAll = () => {
      const newChecked = !isAllSelected.value;
      cartItems.forEach(item => {
        selectedMap[item.id] = newChecked;
      });
    };

    const handlePay = () => {
      if (selectedCount.value === 0) return;
      const selectedItems = cartItems.filter(item => selectedMap[item.id]);
      console.log('去结算:', selectedItems);
      alert(`已选择 ${selectedCount.value} 件商品，总价 ¥${totalPrice.value.toFixed(2)}`);
      // 这里跳转到订单确认页
      // router.push('/order-confirm')
    };

    return {
      cartItems,
      selectedMap,
      selectedCount,
      totalPrice,
      isAllSelected,
      toggleSelectAll,
      handlePay,
    };
  },
});
</script>

<style lang="scss" scoped>
.checkout-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: white;
  padding: 16px 16px 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;

  h1 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
}

.cart-list {
  padding: 0 16px;
  flex: 1;
}

.checkout-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;

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
        color: #ff6700;
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
    background: #ff6700;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    min-width: 100px;
    cursor: pointer;
    transition: background 0.2s;

    &.disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    &:not(.disabled):active {
      background: #e05a00;
    }
  }
}
</style>