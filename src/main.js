import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import VueGoodTablePlugin from 'vue-good-table';
import VuejsDialog from 'vuejs-dialog';
import BootstrapVue from 'bootstrap-vue';
import Notifications from 'vue-notification';
import Vuex from 'vuex';
import VueCrypt from 'vue-crypt'


import 'vue-good-table/dist/vue-good-table.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'es6-promise/auto';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
Vue.use(VueGoodTablePlugin);
Vue.use(VuejsDialog);
Vue.use(VueCrypt)
Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(Vuex);

import { store } from './store/store.js';

Vue.config.productionTip = false
new Vue({
  router: Router,
  store,
  render: h => h(App),
}).$mount('#app')
