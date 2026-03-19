<!-- src/components/CartItem.vue -->
<template>
  <div class="cart-item">
    <label class="checkbox-wrapper">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="handleChange"
        class="checkbox-input"
      />
      <span class="checkbox-custom"></span>
    </label>

    <div class="item-content">
      <img :src="item.image" :alt="item.title" class="item-image" />
      <div class="item-info">
        <h3 class="item-title">{{ item.title }}</h3>
        <div class="item-price">¥{{ item.price.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface CartItem {
  id: number;
  title: string;
  desc: string;
  price: number;
  image: string;
}

export default defineComponent({
  name: 'CartItem',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object as () => CartItem,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      emit('update:modelValue', target.checked);
    };

    return {
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    margin-right: 16px;
    position: relative;

    .checkbox-input {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .checkbox-custom {
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &::after {
        content: '';
        width: 8px;
        height: 4px;
        border: 2px solid white;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
        opacity: 0;
        transition: opacity 0.2s;
      }
    }

    .checkbox-input:checked + .checkbox-custom {
      background-color: #ff6700;
      border-color: #ff6700;

      &::after {
        opacity: 1;
      }
    }
  }

  .item-content {
    display: flex;
    flex: 1;
    gap: 16px;

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      background: #f5f5f5;
    }

    .item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .item-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0 0 8px 0;
        line-height: 1.4;
      }

      .item-desc {
        font-size: 13px;
        color: #999;
        margin: 0 0 8px 0;
        line-height: 1.4;
      }

      .item-price {
        font-size: 16px;
        font-weight: bold;
        color: #ff6700;
      }
    }
  }
}
</style>