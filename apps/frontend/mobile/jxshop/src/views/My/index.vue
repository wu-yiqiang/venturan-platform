<template>
  <div class="user-center-page">
    <div class="user-card">
      <div class="card-content">
        <div class="user-info">
          <van-image round width="70px" height="70px" :src="defaultAvatar" class="avatar" />
          <div class="info-text">
            <h2 class="nickname">{{ userName || '点击登录' }}</h2>
            <!-- <div class="tags" v-if="userInfo.level">
              <van-tag type="danger" size="mini" plain>VIP {{ userInfo.level }}</van-tag>
              <van-tag type="primary" size="mini" plain>金牌会员</van-tag>
            </div> -->
          </div>
        </div>

        <div class="assets-row">
          <div class="asset-item" v-for="(item, index) in assetsList" :key="index" @click="handleAssetClick(item.type)">
            <div class="num">{{ formatNumber(item.value) }}</div>
            <div class="label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 订单中心入口 -->
    <!-- <van-card title="我的订单" class="section-card" :border="false">
      <template #default>
        <div class="order-list">
          <div class="order-item" v-for="order in orderTypes" :key="order.type" @click="navigateToOrder(order.type)">
            <div class="icon-box" :style="{ backgroundColor: order.bgColor }">
              <van-icon :name="order.icon" color="#fff" size="20" />
            </div>
            <span class="order-name">{{ order.name }}</span>
            <van-badge :content="order.count" :show-zero="false" class="order-badge" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="card-footer" @click="navigateToOrder('all')">
          全部订单 <van-icon name="arrow" />
        </div>
      </template>
    </van-card> -->

    <!-- 3. 常用工具列表 -->
    <van-cell-group inset class="section-card">
      <van-cell v-for="tool in toolList" :key="tool.name" :title="tool.name" is-link :to="tool.path"
        @click="tool.action ? tool.action() : null" class="custom-cell">
        <template #icon>
          <div class="tool-icon-wrapper" :style="{ color: tool.color }">
            <van-icon :name="tool.icon" size="20" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="bottom-container">
      <van-button type="primary" block @click="handleExitLogin">退出登录</van-button>

    </div>
    <div class="safe-area-bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { useSysStore } from '@/store/modules/sysStore'
const sysStore = useSysStore()

// --- 类型定义 ---
interface UserInfo {
  nickname: string;
  avatar: string;
  level?: number;
}

interface AssetItem {
  label: string;
  value: number;
  type: 'balance' | 'points' | 'coupon';
}

interface OrderType {
  name: string;
  type: string;
  icon: string;
  bgColor: string;
  count: number;
}

interface ToolItem {
  name: string;
  icon: string;
  color: string;
  path?: string;
  badge?: number;
  action?: () => void;
}

// --- 逻辑处理 ---
const router = useRouter();
const defaultAvatar = computed(() => {
  const ava = sysStore.userInfos?.avatar
  if (!ava) return ''
  return import.meta.env.VITE_STORAGE_BASE_URL+ava;
})
const userName = computed(() => {
   const name = sysStore.userInfos?.name
  return name;
})
// 模拟用户状态
const userInfo = ref<UserInfo>({
  nickname: 'Vue3 开发者',
  avatar: '',
  level: 3
});

// 资产数据
const assetsList = reactive<AssetItem[]>([
  // { label: '余额', value: 1280.50, type: 'balance' },
  // { label: '积分', value: 3500, type: 'points' },
  // { label: '优惠券', value: 12, type: 'coupon' },
  // { label: '收藏', value: 8, type: 'coupon' }
]);

// 订单类型
const orderTypes = reactive<OrderType[]>([
  { name: '待付款', type: 'unpaid', icon: 'pending-payment', bgColor: '#ff976a', count: 2 },
  { name: '待发货', type: 'unship', icon: 'logistics', bgColor: '#e64d4d', count: 0 },
  { name: '待收货', type: 'received', icon: 'gift-o', bgColor: '#4fc3f7', count: 1 },
  { name: '售后/退款', type: 'after', icon: 'replay', bgColor: '#a0d911', count: 0 },
]);

const toolList = reactive<ToolItem[]>([
  { name: '我的订单', icon: 'setting-o', color: '#969799', path: '/orders'},
  // { name: '收货地址', icon: 'location-o', color: '#ee0a24', path: '/address' },
  // { name: '设置', icon: 'setting-o', color: '#969799', path: '/settings', badge: 1 },
]);

const handleExitLogin = () => {
  sysStore.setUserInfos(null)
  router.push({ name: 'Login' });
}

const navigateToOrder = (type: string) => {
  if (!userInfo.value.nickname) {
    showToast('请先登录');
    return;
  }
  router.push({ path: '/orders', query: { type } });
};

const handleAssetClick = (type: string) => {
  // showToast(`查看${type}详情`);
};

const formatNumber = (num: number) => {
  return num >= 10000 ? (num / 10000).toFixed(1) + 'w' : num;
};
</script>

<style lang="scss" scoped>
/* --- Sass 变量定义 --- */
$primary-color: #1989fa;
$bg-color: #f7f8fa;
$card-radius: 12px;
$text-main: #323233;
$text-sub: #969799;
$card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

/* --- 页面容器 --- */
.user-center-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 20px;
}

/* --- 用户卡片 --- */
.user-card {
  // 使用 Sass 嵌套
  background: linear-gradient(135deg, #1989fa 0%, #4fc3f7 100%);
  padding: 30px 16px 20px;
  margin-bottom: 12px;

  .card-content {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: $card-radius;
    padding: 20px;
    color: #fff;
  }

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .avatar {
      border: 2px solid rgba(255, 255, 255, 0.3);
      margin-right: 12px;
    }

    .info-text {
      flex: 1;

      .nickname {
        font-size: 18px;
        font-weight: bold;
        margin: 0 0 6px 0;
        color: #fff;
      }

      .tags {
        display: flex;
        gap: 6px;
      }
    }

    .settings-icon {
      font-size: 20px;
      opacity: 0.8;
      padding: 4px;
    }
  }

  .assets-row {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 16px;

    .asset-item {
      text-align: center;
      flex: 1;
      cursor: pointer;

      .num {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .label {
        font-size: 12px;
        opacity: 0.9;
      }
    }
  }
}

/* --- 通用卡片样式 --- */
.section-card {
  margin: 0 16px 12px;
  border-radius: $card-radius;
  box-shadow: $card-shadow;
  overflow: hidden;

  // 覆盖 Vant 默认边框
  :deep(.van-card__header),
  :deep(.van-cell-group) {
    background-color: #fff;
  }
}

/* --- 订单列表 --- */
.order-list {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  .order-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    cursor: pointer;

    .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      transition: transform 0.2s;

      &:active {
        transform: scale(0.95);
      }
    }

    .order-name {
      font-size: 12px;
      color: $text-main;
    }

    .order-badge {
      position: absolute;
      top: -5px;
      right: 10px;

      :deep(.van-badge__content) {
        font-size: 10px;
        padding: 2px 5px;
      }
    }
  }
}

.bottom-container {
  padding: 20px 16px;
}

.card-footer {
  text-align: center;
  padding: 12px 0;
  font-size: 13px;
  color: $text-sub;
  border-top: 1px solid #f5f5f5;
  cursor: pointer;

  &:active {
    background-color: #f9f9f9;
  }
}

/* --- 工具列表自定义 --- */
.custom-cell {
  :deep(.van-cell__title) {
    display: flex;
    align-items: center;
  }

  .tool-icon-wrapper {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }

  .cell-badge {
    margin-right: 4px;
  }
}

/* --- 底部安全区 (适配 iPhone X+) --- */
.safe-area-bottom {
  height: env(safe-area-inset-bottom, 20px);
}
</style>