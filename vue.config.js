
console.log('process.env.NODE_ENV ++++++', process.env.NODE_ENV )
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/liangche-echarts/dist/" : "/dist/",
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