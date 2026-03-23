<template>
    <div class="Orders">
        <div class="topbar">
            <van-nav-bar title="我的订单" />
        </div>
        <div class="info-orders">
            <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
                <div class="cards">
                    <div v-for="store in storeList" :key="store.id" class="store-card" @click="goToStoreDetail(store)">
                        <div class="title">订单号： 98989898998</div>
                        <div class="images">
                            <van-image v-for="(item, index) in [1,2,3,4,5,8]" :key="index" :src="avatar(store.fileName)" width="100%" height="100%" fit="cover"  />
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getShops } from '@/api/shop';
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
        name: 'order', query: {
            shopId: store?.id
        }
    });
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
    }
    .info-orders {
        padding: 12px 12px 60px 12px;
        overflow: auto;
        flex: 1;
        width: 100vw;
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
                    column-gap: 10px;
                    overflow-x: auto;
                    width: 100%;
                }
            }
        }

    }
}
</style>