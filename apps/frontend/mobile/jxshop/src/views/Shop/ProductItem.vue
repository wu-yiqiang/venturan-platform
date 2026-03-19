<!-- src/components/ProductItem.vue -->
<template>
  <div class="product-item">
    <img :src="avatar(item.fileName)" alt="商品图" class="product-img" />
    <div class="product-info">
      <h3 class="product-title">{{ item?.name }}</h3>
      <p class="product-desc">{{ item?.desc }}</p>
      <p class="product-sales">已售 {{ item.sales }}件</p>
      <div class="product-price">
        <span class="price-now">¥{{ item?.price }}</span>
      </div>
    </div>
    <div class="product-action">
      <button :disabled="item.count <= 0" class="btn-minus" @click="decrease(item)">−</button>
      <span class="count">{{ item?.count }}</span>
      <button :disabled="item.count >= item?.inventory" class="btn-plus" @click="increase(item)">+</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update-count'])
const avatar = (fileName: string) => {
  if (!fileName) return ''
  return import.meta.env.VITE_STORAGE_BASE_URL + fileName
}
const decrease = (item: any) => {
  item.count--;
  emit('update-count');
}
const increase = (item: any) => {
  item.count++;
  emit('update-count');
}
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .product-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }

  .product-info {
    flex: 1;
    margin-left: 12px;

    .product-title {
      font-size: 16px;
      color: #333;
      margin: 0;
    }

    .product-desc {
      font-size: 14px;
      color: #666;
      margin: 4px 0;
    }

    .product-sales {
      font-size: 12px;
      color: #999;
    }

    .product-price {
      margin-top: 8px;

      .price-now {
        font-size: 18px;
        color: #f44;
        font-weight: bold;
      }

      .price-old {
        font-size: 14px;
        color: #999;
        text-decoration: line-through;
        margin-left: 8px;
      }
    }
  }

  .product-action {
    display: flex;
    align-items: center;
    gap: 8px;

    .btn-minus,
    .btn-plus {
      width: 32px;
      height: 32px;
      border: 1px solid #f44;
      border-radius: 50%;
      background: transparent;
      color: #f44;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(244, 68, 68, 0.1);
      }
    }

    .count {
      width: 32px;
      text-align: center;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>