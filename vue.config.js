module.exports = {
  devServer: {
    proxy: {
      // iP8GQaXY.api.lncldglobal.com
      '/apis': {
        target: 'https://please-replace-with-your-customized.domain.com',//目标地址
        ws: true,//是否代理websocket
        changeOrigin: true,//是否跨域
        pathRewrite: {
          '^/apis': ''//url重写
        }
      }
    }
  }
}