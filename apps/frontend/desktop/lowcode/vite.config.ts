import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      eslintrc: {
        enabled: true
      }
    }),
    basicSsl()
  ],
  resolve: {
    // extensions: ['.js', '.vue', '.json', 'scss', '.ts'],
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 6688,
    https: true,
    hmr: true
  }
})
