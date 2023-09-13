<template>
  <form @submit.prevent="register">
    用户名：<input type="text" v-model="username">
    密码：<input type="password" v-model="password">
    电话号码：<input type="text" v-model="phone">
    邮箱：<input type="email" v-model="email">
    <input type="submit" value="注册">
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data(){
    return{
      username:'',
      password:'',
      phone:'',
      email:''
    }
  },
  methods:{
    register(){
      axios.post("/api/user/register",{
        "username":this.username,
        "password":this.password,
        "phone":this.phone,
        "email":this.email
      }).then(r=>{
        console.log(r)
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>