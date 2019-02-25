<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <form @submit.prevent="login">
            <span class="text-info h4">登录信息管理系统</span>
            <input type="text" v-model="username" class="form-control mt-4" placeholder="输入用户名">
            <input type="password" v-model="password" class="form-control mt-4" placeholder="输入密码">
            <input type="submit" class="btn btn-outline-dark form-control mt-5">
            <router-link tag="input" style="cursor:pointer" class="mt-2 btn btn-outline-info form-control" :to="{name:'register'}" value="立即注册"></router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      //生成 formdata 对象
      let formdata = new FormData();
      //添加数据
      formdata.append("username", this.username);
      formdata.append("password", this.password);
      axios //发送请求
        .post("/apis/api/user/user_login", formdata)
        .then(res => {
          if (res.data.code == 1) {
            //登录成功改变登录状态为true并跳转到管理页面
            this.$store.state.isLogin = true;
            window.sessionStorage.setItem("isLogin", true);
            this.$router.push({ name: "home" });
          } else {
            alert("账号或密码错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.login {
  height: 100vh;
  background-image: url("../assets/login.jpg");
  background-size: 100% 100%;
}
input {
  background: transparent;
}
input:focus {
  background: transparent;
  outline: none;
  box-shadow: 0 0 5px rgba(207, 220, 0, 0.4);
  border-radius: 5px;
}
form {
  margin-top: 25vh;
}
</style>
