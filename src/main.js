import Vue from 'vue'
import App from './App.vue'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueGoodTablePlugin);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
