import Vue from 'vue'
import App from './App.vue'
import VueSignature from 'vue-signature-pad';
Vue.use(VueSignature);
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
   
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
