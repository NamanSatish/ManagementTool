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

            @click = "resetPassword(props.row)"
           
          >Reset Password</b-button>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
        <span v-if="props.column.field == 'terminate'">
          <b-button
            squared
            variant="outline-danger"
            class="myButton"
            @click = "terminate(props.row)"
          >Terminate</b-button>
        </span>
        
      </template>
    </vue-good-table>
  </div>
</template>







<script>
import VuejsDialog from "vuejs-dialog";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "Secure",
  components: {
    VueGoodTable
  },
  data() {
    return {
      newpassword: "",
      columns: [
        {
          label: "Name",
          field: "name"
        },
        {
          label: "Computer Number",
          field: "compnum"
        },
        {
          label: "Last Recorded Login",
          field: "logintime",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM do Y"
        },
        {
          label: "Reset Password",
          field: "action"
        },
        {
          label: "Terminate",
          field: "terminate",
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
    resetPassword: function(user) {
      console.log(user);
      this.$dialog.prompt({title: "Reset Password", body: "What is the new Password for " + user.name, loader: true,promptHelp: 'Type in the box below and click "[+:okText]"' })
          .then((dialog)=>{
            console.log(user);
            this.newpassword = dialog.data;
            console.log(this.newpassword)
            console.log(dialog.data)
            console.log("password set");
            this.$dialog.prompt({       
              title: "Check Password",
              body: "Type the new password in again.",
              promptHelp: 'Type in the box below and click "[+:okText]"',
              loader: true}).then((dialog) => {
                console.log("sending password");
                console.log(user);
                this.sendPassword(user,this.newpassword);
                
              })
              .catch( e =>{
              console.log(e);
              console.log("Password Test Dissmissed");
              });
          })
        .catch( e =>{
              console.log(e);
              console.log("New Password Dissmissed");
        });

    },
    doNothing: function() {
      console.log("Did nothing");
    },
    terminate: function(user) {
        this.$dialog.confirm("You are about to <b>terminate " + user.name + "</b>. This is <b>irreversible</b>.", {type: 'hard', html: true, verification: 'Terminate'})
          .then(() => {
            this.$notify({type: 'success', html:true ,text: "A command is now being sent to <b>terminate</b> "})
          })
          .catch(() => {
            this.$notify({type: 'error', text: "An error has occured"})
          })
      
    },
    sendPassword: function(user,newpassword){
      //someapi stuff
      console.log("should have done some api stuff :)");
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