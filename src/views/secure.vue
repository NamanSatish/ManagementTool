<template>
  <div id="secure">
    <!-- use this when ready to implement api : 
https://github.com/xaksis/vue-good-table/wiki/Remote-Mode-Workflow
mode="remote"  
@on-page-change="onPageChange"
@on-sort-change="onSortChange"
@on-column-filter="onColumnFilter"
@on-per-page-change="onPerPageChange"

updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    
    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.loadItems();
    },

    onPerPageChange(params) {
      this.updateParams({perPage: params.currentPerPage});
      this.loadItems();
    },

    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params.sortType,
          field: this.columns[params.columnIndex].field,
        },
      });
      this.loadItems();
    },
    
    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    }

    // load items is what brings back the rows from server
    loadItems() {
      getFromServer(this.serverParams).then(response => {
         this.totalRecords = response.totalRecords;
         this.rows = response.rows;
      });
    }

    -->
    <notifications group = "success" position="top left"/>
    <notifications group = "canceled" position="center"/>
    <vue-good-table
      pagination-options="{
      enabled: true,
    }"
      :columns="columns"
      :rows="rows"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'reset'">
          <b-button
            squared
            variant="outline-danger"
            class="myButton"
            size="lg"
            @click = "resetPassword(props.row)"
           
          >Reset</b-button>
        </span>
        
        
        <span v-if="props.column.field == 'logintime'">
          <span v-if="props.row.logintime == 'Sunday, December 31, 1600 4:00:00 PM'">
             <span style="font-weight: bold; color: red;">Not in Use</span> 
          </span>
          <span v-if="Number(props.row.timecompare) <= (ts)">
             <span style="font-weight: bold; color: teal;"> >6 months </span> 
          </span>
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
       </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>


        <span v-if="props.column.field == 'terminate'">
          <b-button
            squared
            variant="outline-danger"
            class="myButton"
            size="lg"
            @click = "terminate(props.row)"
          >Terminate</b-button>
        </span>
        
        <span v-if="props.column.field == 'compchange'">
          <b-button
            squared
            variant="outline-danger"
            class="myButton"
            size="lg"
            @click = "changeComp(props.row)"
          >Change</b-button>
        </span>

        
      </template>
    </vue-good-table>
  </div>
</template>







<script>
/* eslint-disable */
import { VueGoodTable } from "vue-good-table";
import axios from 'axios';
export default {
  name: "Secure",
  components: {
    VueGoodTable
  },
  mounted(){
    this.rows = this.$store.getters.display
    console.log(this.$store.getters.confirmation)
    this.ts = Math.round((new Date()).getTime()) - (1000 * 15552000);
  },
  created(){
    
    
  },
  data() {
    return {
      accountcomp:[],
      post:[],
      obj:{},
      errors: [],
      url:"http://6622ec7c.ngrok.io/api/v1/posts/",
      ts:"",
      rows:[],
      newpassword: "",
      columns: [
        {
          label: "Name",
          field: "name",
          width: "30%"
        },
        {
          label: "Computer Name",
          field: "compnum",
          width:"20%"
        },
        {
          label: "Last Recorded Login",
          field: "logintime",
          width:"20%",
        },
        {
          label: "Activity",
          field: "timecompare",
          width:"10%",
          hidden:true
        },
        {
          label: "Change Computer Name",
          field: "compchange",
          width:"9%",
          
        },
        {
          label: "Reset Password",
          field: "reset",
          width:"7%"
        },
        {
          label: "Terminate",
          field: "terminate",
          width:"10%",
        },
      ],
    };
  },
  methods: {
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    resetPassword: function(user) {
      console.log(user);
      this.$dialog.prompt({title: "Reset Password", html: true, body: "What is the new password for " + user.name +". Requirements : 10 characters minimum, cannot contain any part of the user's name,One uppercase and lowercase character, one number, and one special character !@#$%^&*()", loader: true,promptHelp: 'Type in the box below and click "[+:okText]"' })
          .then((dialog)=>{
            this.newpassword = dialog.data;
            if( dialog.data.trim() == "" && dialog.data.match(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{10,50}$/) ){
              this.notification('warn', 'Password' , "canceled", 10000,"Your password <b>cannot</b> be that weak. Security Protocols are:  10 characters minimum, cannot contain any part of the user's name,One uppercase and lowercase character, one number, and one special character !@#$%^&*() ")
              throw new Error("Cannot have empty password");
            }
            this.$dialog.prompt({       
              title: "Check Password",
              body: "Type the new password in again.",
              promptHelp: 'Type in the box below and click "[+:okText]"',
              loader: true})
              .then((dialog) => {
                if(dialog.data != this.newpassword){
                  this.notification('warn', 'Password', "canceled", 5000,"The passwords did not match, ensure that it is correctly typed. If this was an error, contact Relion.")
                }else {
                  this.sendPassword(user,this.newpassword);
                  this.notification('success', 'Password' , "success", 2000,"A command is now being sent to <b>change the password</b> ")
                }
              })
              .catch( e =>{
                this.notification('warn', 'Password', "canceled", 5000,"There was either an error (Do not use enter key) or you have canceled this process. If this was an error, contact Relion.")
              if(e){ console.error(e);}
              });
          })
        .catch( err =>{
          this.notification('warn', 'Password', "canceled", 5000,"There was either an error (Do not use enter key) or you have canceled this process. If this was an error, contact Relion.")
              if(err){ console.error(err);}
        });

    },
    doNothing: function() {
      console.warn("Did nothing");
      
    },
    terminate: function(user) {
        this.$dialog.confirm("You are about to <b>terminate " + user.name + "</b>. This is <b>irreversible</b>.", {type: 'hard', html: true, verification: 'Terminate'})
          .then(() => {
            this.notification('success','Terminate' , "success", 2000,"A command is now being sent to <b>terminate</b> ")
            this.sendTerminate(user)
          })
          .catch((e) => {
            this.notification('warn','Terminate',"canceled",5000,"There was either an error (Do not use enter key) or you have canceled this process. If this was an error, contact Relion.")
            if(e){ console.error(e);}
          })
      
    },
    sendTerminate: function(user){
      axios.post(this.url+"terminate", {
                  user: user.SAMAccountName
                })
                .then(response => {
                  console.warn(response)
                  if(response.status ==201){
                  this.notification('success','Termination' , "success", 2000,user.name + "'s account has been terminated")
                  }else{
                    this.notification('warn', 'Error' , "canceled", 5000,"There has been an error, contact Relion")
                  }
                })
                .catch(e => {
                  console.error(e);
                  this.errors.push(e)
                  this.notification('warn', 'Error' , "canceled", 5000,"There has been an error, contact Relion")
                })

    },
    sendPassword: function(user,newpassword){
      //someapi stuff
      this.newpassword = newpassword
      axios.post(this.url+"reset", {
                  text: this.newpassword,
                  user: user.SAMAccountName
                })
                .then(response => {
                  console.warn(response.status)
                  if(response.status == 201){
                  this.notification('success','Computer Name' , "success", 2000,user.name + "'s password has been changed to " + this.newpassword)
                  }else{
                    this.notification('warn', 'Error' , "canceled", 5000,"There has been an error, contact Relion")
                  }
                })
                .catch(e => {
                  console.error(e);
                  this.errors.push(e)
                  this.notification('warn', 'Error' , "canceled", 5000,"There has been an error, contact Relion")
                })
    
    },
    notification: function(type1,title1,group1,time,text1){
      this.$notify({
        type: type1,
        title: title1,
        group: group1,
        duration : time,
        text : text1
      })
    },
    changeComp: function(user){
      this.$dialog.prompt({title: "New Computer Name", html: true, body: "What is the computer name of " + user.name +"", loader: true,promptHelp: 'Type in the box below and click "[+:okText]"' })
          .then((dialog)=>{
            this.accountcomp = this.$store.getters.accountcomp
            this.newpassword = dialog.data;
            if( dialog.data.trim() == "" ){
              this.notification('warn', 'Computer Name' , "canceled", 5000,"Your computer name <b>cannot</b> be empty.")
              throw new Error("Cannot have empty password");
            }else{
              for(var i =0 ; i<this.accountcomp.length;i++){
                if(this.accountcomp[i].SAMAccountName == user.SAMAccountName){
                  this.accountcomp[i].compnum = dialog.data;
                  console.log(user.name)
                }
              }
              this.$store.commit("mutate_accountcomp", this.accountcomp);


               axios.post(this.url+"acupdate", {
                  body: this.$store.getters.accountcomp
                })
                .then(response => {
                  console.warn(response)
                  
                  if(response.status ==201){
                    for(var i =0; i<this.rows.length;i++){
                      if(this.rows[i].id == user.id){
                        this.rows[i].compnum = dialog.data
                        
                      }
                    }
                  }
                  })
                .catch(e => {
                  console.error(e);
                  this.errors.push(e)
                  
                })
            
              this.notification('success','Computer Name' , "success", 2000,"A command is now being sent to <b>change the computer name</b> of " + user.name + " to " + dialog.data)
            }
          })
        .catch( err =>{
          this.notification('warn', 'Computer Name', "canceled", 5000,"There was either an error (Do not use enter key) or you have canceled this process. If this was an error, contact Relion.")
              if(err){ console.error(err);}
        });

    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>