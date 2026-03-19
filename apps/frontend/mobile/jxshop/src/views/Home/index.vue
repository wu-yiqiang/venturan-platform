<template>
  <div  class="store-list-page">
    <div class="topbar">
      <van-nav-bar title="销售门店" />
    </div>
    <div class="info-cards">
      <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
        <div v-for="store in storeList" :key="store.id" class="store-card" @click="goToStoreDetail(store)">
          <div class="store-img-box">
            <van-image :src="avatar(store.fileName)" width="100%" height="100%" fit="cover" />
            <div class="Tag">
                <status-tag  type="ShopStatus" :value="store?.status"/>
            </div>
          </div>
          <div class="store-info">
            <div class="store-name">{{ store.name }}</div>
            <div class="store-desc">{{ store.shopAddress }}</div>
            <!-- <div class="store-meta">
              <span class="distance">📍 {{ store.distance }}km</span>
              <span class="delivery">💰¥{{ store.minPrice }}起送</span>
              <span class="time">⏱️ {{ store.deliveryTime }}分钟</span>
            </div> -->
          </div>
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getShops } from '@/api/shop';
import StatusTag from '@/components/StatusTag.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const loading = ref(false);
const finished = ref(false);
const storeList = ref<any[]>([]);
const onLoad = async () => {
  const data = await getShops()
  storeList.value = data ?? []
  loading.value = false;
  finished.value = true;
};
const avatar = (fileName: string) => {
  if (!fileName) return ''
  return import.meta.env.VITE_STORAGE_BASE_URL + fileName
}
const goToStoreDetail = (store: any) => {
  router.push({
    name: 'Shop', query: {
    shopId: store?.id
  } });
};
</script>

<style lang="scss" scoped>
.store-list-page {
  background: #f7f8fa;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  .topbar {
    position: sticky;
  }

  .info-cards {
    padding:0 12px 60px 12px;
    overflow: auto;
    flex: 1;

    .store-card {
      background: #fff;
      border-radius: 8px;
      display: flex;
      margin-top: 12px;
      padding: 12px;
      &:active {
        background: #f9f9f9;
      }

      .store-img-box {
        width: 90px;
        height: 90px;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 12px;
        position: relative;
        flex-shrink: 0;

        .Tag {
          position: absolute;
          top: -2px;
          left: -3px;
          font-size: 10px;
        }
      }

      .store-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .store-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 4px;
        }

        .store-desc {
          font-size: 12px;
          color: #999;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .store-meta {
          font-size: 11px;
          color: #666;
          display: flex;
          gap: 8px;
        }
      }

      .arrow-icon {
        align-self: center;
        color: #ccc;
      }
    }
  }
}
</style>