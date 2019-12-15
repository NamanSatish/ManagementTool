<template>
  <div id="login">
    <h1>DWC Management Tools Login</h1>
    <p>
      You
      <b>must</b> be authorized to use this tool. The username &amp; password are
      <b>capital sensitive</b>.
    </p>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button
      type="button"
      id="loginbutton"
      class="btn btn-outline-success"
      v-on:click="login()"
    >{{btnText}}</button>
  </div>
</template>

<script>
/*eslint no-unused-vars: "error"*/
import axios from "axios";
export default {
  name: "Login",

  data() {
    return {
      btnText: "Login",
      address:"http://4cd00975.ngrok.io/api/v1/posts/",
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.btnText = "Loading...";
      axios.get(this.address+"reset")
        .then(res =>{
          this.$store.commit("mutate_confirmation", res);
          console.log(this.$store.getters.confirmation);
          axios.get(this.address+"accounts")
                .then(res=>{ 
                this.$store.commit("mutate_accounts",res)
                console.log(this.$store.getters.accounts);
                        axios.get(this.address+"computers")
                .then(res=>{ 
                this.$store.commit("mutate_computers",res)
                console.log(this.$store.getters.computers);
                if (this.input.username != "" && this.input.password != "") {
            if (
              this.input.username == this.$parent.mockAccount.username &&
              this.input.password == this.$parent.mockAccount.password
            ) {
              this.$emit("authenticated", true);
              this.$router.replace({ name: "secure" });
            } else {
              alert("The username and / or password is incorrect");
            }
          } else {
            alert("A username and password must be present");
          }
                })
                .catch(err => {console.log(err)})     
                })
                .catch(err => {console.log(err)})
        })
        .catch(err => {
          console.warn(err);
        });
        
   
    }
  }
};
</script>

<style scoped>
#login {
  width: 600px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
  text-align: center;
  vertical-align: middle;
}
</style>