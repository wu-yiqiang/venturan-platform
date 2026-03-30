import { createApp } from 'vue'
import { initializeDarkMode } from '@/utils/dark-mode'
import App from './App.vue'
import router from './router'
import store from './store'
// normalize.css
import 'normalize.css/normalize.css'
// 全局样式
import './styles/index.less'
// tailwindcss
import './styles/tailwind.css'
// svg icon
import 'virtual:svg-icons-register'
import VConsole from 'vconsole'
if (import.meta.env.MODE == 'start') {
    new VConsole()
}
initializeDarkMode()
function preventZoom() {
    let lastTouchEnd = 0;

    document.addEventListener(
        'touchend',
        (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        },
        { passive: false }
    );

    document.addEventListener(
        'touchmove',
        (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        },
        { passive: false }
    );
}

document.addEventListener('DOMContentLoaded', preventZoom);
const app = createApp(App)
app.use(store as any).use(router)

app.mount('#app')
