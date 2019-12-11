import Vue from 'vue'
import App from './App.vue'
import Router from './router';
import VueGoodTablePlugin from 'vue-good-table';
import VuejsDialog from 'vuejs-dialog';
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'

import 'vue-good-table/dist/vue-good-table.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueGoodTablePlugin);
Vue.use(VuejsDialog);
Vue.use(BootstrapVue);
Vue.use(Notifications);

Vue.config.productionTip = false
new Vue({
  router: Router,
  render: h => h(App),
}).$mount('#app')
