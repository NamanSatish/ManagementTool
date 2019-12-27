import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
      confirmation:"",
      computers:"",
      accounts:"",
      accountcomp:"",
      display:"",
    },
    mutations:{
      change(state,payload){
        state.tabledata = payload;
      },
      mutate_confirmation(state,payload){
        state.confirmation = payload;
      },
      mutate_computers(state,payload){
        state.computers = payload;
      },
      mutate_accounts(state,payload){
        state.accounts = payload;
      },
      mutate_accountcomp(state,payload){
        state.accountcomp = payload;
      },
      mutate_display(state,payload){
        state.display = payload;
      },
    },
    getters: {
      confirmation: state => state.confirmation,
      computers: state => state.computers,
      accounts: state => state.accounts,
      accountcomp: state => state.accountcomp,
      display: state => state.display
    }
})
export default store