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
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import basicSsl from '@vitejs/plugin-basic-ssl'
const root: string = process.cwd()

export default defineConfig(({ mode }) => {
  const envDir = './env'
  const env = loadEnv(mode, envDir)
  return {
    envDir: envDir,
    base: '/jxshop/',
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'src/typings/auto-imports.d.ts',
      }),
      Components({
        dts: 'src/typings/components.d.ts',
        resolvers: [VantResolver()],
      }),
      // svg icon
      createSvgIconsPlugin({
        iconDirs: [path.resolve(root, 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteCompression(),
      basicSsl()
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
        '/api': {
          target: `http://192.168.1.222:9527/`,
          changeOrigin: true,
          ws: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
})
