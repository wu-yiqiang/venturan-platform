import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const root: string = process.cwd()

export default defineConfig(({ mode }) => {
  // 环境变量
  const env = loadEnv(mode, root, '')
  return {
    base: env.VITE_PUBLIC_PATH || '/',
    plugins: [
      vue(),
      vueJsx(),
      // 自动导入 Vue/Vue Router/Pinia API
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'src/typings/auto-imports.d.ts',
      }),
      // vant 组件自动按需引入
      Components({
        dts: 'src/typings/components.d.ts',
        resolvers: [VantResolver()],
      }),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, 'src/icons/svg')],
        // 指定 symbolId 格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // 生产环境 gzip 压缩资源
      viteCompression(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8888,
      hmr: true,
      proxy: {
        '^/dev-api': {
          target: '',
        },
      },
    },
    build: {
      rolldownOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
})
