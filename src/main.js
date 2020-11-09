// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router' //1.引入路由模块
import {routes} from './router/index' //2.引入静态路由表
import axios from 'axios'
import COS from 'cos-js-sdk-v5'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VueVideoPlayer)
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.use(VueRouter)//3.使用路由模块
import store from './store'
Vue.use(Vuex);
// 在跳转前执行




//4.创建一个VueRouter模块的实例
const router = new VueRouter({
  mode:'history',
  routes:routes
});

// router.beforeEach((to, form, next) => {
//
//   let isLogin = sessionStorage.getItem('isLogin');
//   if (to.path == '/logout') {
//     sessionStorage.clear();
//     next({path: '/login'});
//   }
//   else if (to.path == '/login') {
//     if (isLogin != null) {
//       next({path: '/home'});
//     }
//   }
//   // else if (isLogin == null) {
//   //   next({path: '/login'});
//   // }
//   next();
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
