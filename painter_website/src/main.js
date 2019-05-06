// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'assets/css/common.css'
import 'assets/css/normalize.css';
import 'babel-polyfill';
Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';

// 引入富文本编辑器
import '../static/UE/ueditor.config.js';
import '../static/UE/ueditor.all.min.js';
import '../static/UE/lang/zh-cn/zh-cn.js';
import '../static/UE/ueditor.parse.min.js';

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
