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
        <span v-if="props.column.field == 'action'">
          <b-button
            squared
            variant="outline-danger"
            class="myButton"
            size="lg"
            @click = "resetPassword(props.row)"
           
          >Reset Password</b-button>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
        <span v-if="props.column.field == 'terminate'">
          <b-button
            squared
            variant="outline-danger"
            class="myButton"
            size="lg"
            @click = "terminate(props.row)"
          >Terminate Staff</b-button>
        </span>
        
      </template>
    </vue-good-table>
  </div>
</template>







<script>
import { VueGoodTable } from "vue-good-table";

export default {
  name: "Secure",
  components: {
    VueGoodTable
  },
  created(){
    console.log(this.$store.getters.confirmation)
  },
  data() {
    return {
      newpassword: "",
      columns: [
        {
          label: "Name",
          field: "name",
          width: "25%"
        },
        {
          label: "Computer Number",
          field: "compnum",
          width:"25%"
        },
        {
          label: "Last Recorded Login",
          field: "logintime",
          type: "date",
          width:"25%",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM do Y"
        },
        {
          label: "Reset Password",
          field: "action",
          width:"12%"
        },
        {
          label: "Terminate",
          field: "terminate",
          width:"12%"
        },
      ],
      rows: [
        {
          id: 1,
          name: "John",
          age: "20",
          createdAt: "2019-9-2",
          score: 0.033843
        },
        {
          id: 2,
          name: "Jane",
          age: "24",
          createdAt: "2019-10-31",
          score: 0.013343
        },
        {
          id: 3,
          name: "Susan",
          age: "16",
          createdAt: "2019-10-30",
          score: 0.038343
        },
        {
          id: 4,
          name: "Chris",
          age: "55",
          createdAt: "2019-10-11",
          score: 0.032343
        },
        {
          id: 5,
          name: "Dan",
          age: 40,
          createdAt: "2019-10-21",
          score: 0.033343
        },
        {
          id: 6,
          name: "John",
          age: 20,
          createdAt: "2019-10-31",
          score: 0.035343
        }
      ]
    };
  },
  methods: {
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    resetPassword: function(user) {
      this.$dialog.prompt({title: "Reset Password", html: true, body: "What is the new password for " + user.name +". Suggestions : 7 characters, 1 capital letter, contain 1 number.", loader: true,promptHelp: 'Type in the box below and click "[+:okText]"' })
          .then((dialog)=>{
            this.newpassword = dialog.data;
            if( dialog.data.trim() == "" ){
              this.notification('warn', 'Password' , "canceled", 3000,"Your password <b>cannot</b> be empty.")
              throw new Error("Cannot have empty password");
            }
            this.$dialog.prompt({       
              title: "Check Password",
              body: "Type the new password in again.",
              promptHelp: 'Type in the box below and click "[+:okText]"',
              loader: true})
              .then((dialog) => {
                if(dialog.data != this.newpassword){
                  this.notification('warn', 'Password', "canceled", 3000,"The passwords did not match, ensure that it is correctly typed. If this was an error, contact Relion.")
                }else {
                  this.sendPassword(user,this.newpassword);
                  this.notification('success', 'Password' , "success", 2000,"A command is now being sent to <b>change the password</b> ")
                }
              })
              .catch( e =>{
                this.notification('warn', 'Password', "canceled", 3000,"There was either an error or you have canceled this process. If this was an error, contact Relion.")
              if(e){ console.error(e);}
              });
          })
        .catch( err =>{
          this.notification('warn', 'Password', "canceled", 3000,"There was either an error or you have canceled this process. If this was an error, contact Relion.")
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
          })
          .catch((e) => {
            this.notification('warn','Terminate',"canceled",3000,"There was either an error or you have canceled this process. If this was an error, contact Relion.")
            if(e){ console.error(e);}
          })
      
    },
    sendPassword: function(user,newpassword){
      //someapi stuff
     console.warn("should have done some api stuff :)" + user + newpassword);
    },
    notification: function(type1,title1,group1,time,text1){
      this.$notify({
        type: type1,
        title: title1,
        group: group1,
        duration : time,
        text : text1
      })


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