import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import echarts from 'echarts'

import './styles/index.less'
import './utils/rem'

Vue.config.productionTip = false

const AV = require('leancloud-storage');
Vue.prototype.AV =  AV
Vue.prototype.$echarts = echarts


AV.init({
  appId: "iP8GQaXYfLhpujigWa2oj42V-gzGzoHsz",
  appKey: "DEYjjMKLU8dobAyn9NconYcL",
  serverURL: 'https://ip8gqaxy.lc-cn-n1-shared.com'
});

document.title = '靓车饰界'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
