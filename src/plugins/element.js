import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
const AV = require('leancloud-storage');

Vue.use(Element)

AV.init({
  appId: "iP8GQaXYfLhpujigWa2oj42V-gzGzoHsz",
  appKey: "DEYjjMKLU8dobAyn9NconYcL",
  serverURL: "https://please-replace-with-your-customized.domain.com"
});