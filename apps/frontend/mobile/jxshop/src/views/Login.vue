<template>
  <div class="login-container">
    <!-- 顶部装饰背景 -->
    <div class="header-bg">
      <h1 class="app-title">吉星商城登录</h1>
      <p class="app-subtitle">欢迎回来，发现好物</p>
    </div>
    <div class="form-card">
      <form @submit.prevent="handleLogin">
        <!-- 手机号输入 -->
        <div class="input-group">
          <label class="input-label">手机号码</label>
          <div class="input-wrapper">
            <span class="prefix-icon">📱</span>
            <input type="tel" v-model="form.phone" placeholder="请输入手机号" maxlength="11" class="custom-input"
              :class="{ error: errors.phone }" @blur="validatePhone" />
          </div>
          <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
        </div>

        <div class="input-group">
          <label class="input-label">密码</label>
          <div class="input-wrapper">
            <span class="prefix-icon">🔒</span>
            <input type="text" v-model="form.code" placeholder="请输入密码" minlength="8" maxlength="16" class="custom-input"
              :class="{ error: errors.code }" />
          </div>
          <span v-if="errors.code" class="error-msg">{{ errors.code }}</span>
        </div>

        <div class="agreement-group">
          <div class="agree">
            <input type="checkbox" id="agree" v-model="form.agree" class="checkbox" />
          <label for="agree" class="agreement-text">
            我已阅读并同意 <a href="#">《用户服务协议》</a> 和 <a href="#">《隐私政策》</a>
          </label>
          </div>
          <div v-if="!form.agree && errors.agree" class="error-msg">{{ errors.agree }}</div>
        </div>
                  
        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ isLoading ? '登录中...' : '立即登录' }}
        </button>
      </form>

      <div class="footer-links">
        <!-- <div class="extra-links">
          <a href="#">忘记密码？</a>
          <span>|</span>
          <a href="#">注册账号</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSysStore } from '@/store/modules/sysStore'
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
const sysStore = useSysStore()
interface LoginForm {
  phone: string;
  code: string;
  agree: boolean;
}

interface FormErrors {
  phone: string;
  code: string;
  agree: string;
}

// --- 状态管理 ---
const router = useRouter();
const isLoading = ref(false);
const isPhoneValid = ref(false);

const form = reactive<LoginForm>({
  phone: '13417967936',
  code: '1234@Abcd',
  agree: false
});

const errors = reactive<FormErrors>({
  phone: '',
  code: '',
  agree: ''
});

let timer: number | null = null;

// --- 验证逻辑 ---
const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!form.phone) {
    errors.phone = '手机号不能为空';
    isPhoneValid.value = false;
  } else if (!phoneRegex.test(form.phone)) {
    errors.phone = '手机号格式不正确';
    isPhoneValid.value = false;
  } else {
    errors.phone = '';
    isPhoneValid.value = true;
  }
};

const validateForm = (): boolean => {
  let isValid = true;

  // 验证手机号
  validatePhone();
  if (errors.phone) isValid = false;
  if (!form.code) {
    errors.code = '密码不能为空';
    isValid = false;
  } else {
    errors.code = '';
  }
  // 验证协议
  if (!form.agree) {
    errors.agree = '请勾选用户协议'
    isValid = false;
  }

  return isValid;
};


// 提交登录
const handleLogin = async () => {
  if (!validateForm()) return;
  isLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    // const res = await userLogin({ phone: form.phone, code: form.code });
    const data = {
      token: '12121',
      username: "1212",
      phone: '1212'
    }
    sysStore.setUserInfos(data)
    router.push('/home');

  } catch (error) {
    console.error('登录失败', error);
    alert('登录失败，请稍后重试');
  } finally {
    isLoading.value = false;
  }
};

// 组件卸载时清理定时器
import { onBeforeUnmount } from 'vue';
import { error } from 'console';
import { userLogin } from '@/api/user';
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
/* --- 基础重置 --- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.login-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* --- 头部背景 --- */
.header-bg {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  margin-bottom: -40px;
  /* 让卡片上浮 */
  z-index: 1;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.3);
}

.app-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}

.app-subtitle {
  font-size: 14px;
  opacity: 0.9;
}

/* --- 表单卡片 --- */
.form-card {
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 30px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.input-group {
  margin-bottom: 24px;
}

.input-label {
  display: block;
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 12px 16px;
  background: #fafafa;
  transition: all 0.3s;
}

.input-wrapper:focus-within {
  border-color: #ff9a9e;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(255, 154, 158, 0.1);
}

.input-wrapper.error {
  border-color: #ff4d4f;
  background: #fff;
}

.prefix-icon {
  margin-right: 10px;
  font-size: 18px;
}

.custom-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  outline: none;
}

.custom-input::placeholder {
  color: #ccc;
}

.error-msg {
  display: block;
  font-size: 12px;
  color: #ff4d4f;
  margin-top: 6px;
  padding-left: 4px;
}

/* --- 验证码特殊样式 --- */
.code-wrapper {
  padding: 0;
  overflow: hidden;
}

.code-wrapper .custom-input {
  padding: 12px 16px;
}

.code-btn {
  border: none;
  background: transparent;
  color: #ff9a9e;
  font-weight: 600;
  font-size: 14px;
  padding: 0 12px;
  cursor: pointer;
  white-space: nowrap;
  border-left: 1px solid #eee;
  height: 48px;
  /* 与 input 高度一致 */
  display: flex;
  align-items: center;
}

.code-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
  border-left-color: #f5f5f5;
}

/* --- 协议 --- */
.agreement-group {

  font-size: 12px;
  color: #666;
  margin-bottom: 24px;
  .agree {
      display: flex;
  align-items: flex-start;
  }
}

.checkbox {
  margin-right: 8px;
  margin-top: 2px;
  accent-color: #ff9a9e;
  cursor: pointer;
}

.agreement-text a {
  color: #ff9a9e;
  text-decoration: none;
}

/* --- 登录按钮 --- */
.login-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
}

.login-btn:active {
  transform: scale(0.98);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* 简单的 loading 动画 */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* --- 底部链接 --- */
.footer-links {
  margin-top: 30px;
  text-align: center;
  font-size: 13px;
  color: #999;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}

.icon-box {
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.icon-box:active {
  background: #e0e0e0;
}

.extra-links {
  margin-top: 15px;
}

.extra-links a {
  color: #666;
  text-decoration: none;
  margin: 0 8px;
}

.extra-links span {
  color: #ddd;
}
</style>