import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
<<<<<<< HEAD
import VDistpicker from 'v-distpicker'
=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977

Vue.component('v-distpicker', VDistpicker)
Vue.config.productionTip = false

Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
