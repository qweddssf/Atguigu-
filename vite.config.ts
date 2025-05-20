import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteMockServe} from "vite-plugin-mock";
import path from 'path'
// https://vite.dev/config/

export default defineConfig( () => {
  return {
    plugins: [vue(), viteMockServe({
      enable: true
    })],
    resolve: {
      alias:{
        "@":path.resolve(__dirname,"src"),
      }
    },
    server: {
      // proxy: {
      //   '/api':{
      //     target: "http://sph-api.atguigu.cn",
      //     changeOrigin: true,
      //     rewrite:(path) => path.replace(/^\/api/, '')
      //   }
      // },
      proxy: {
        '/myServer':{
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite:(path) => path.replace(/^\/myServer/, '')
        }
      }
    }
  }
})

// export default defineConfig({
//   plugins: [vue(), viteMockServe({
//     mockPath: '/mock',
//     localEnabled: command === 'serve'
//   })],
// })
