const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // module.exports = {
  transpileDependencies: true,
  // 生产环境不生成map文件
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true
      }
    },
    proxy: {
      '/myServer': {
        target: 'http://localhost:5005',
        changeOrigin: true
      }
    }
  }
})
