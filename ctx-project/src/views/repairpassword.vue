<template>
  <div class="repairPassword">
    <h3>修改密码</h3>
    <form @submit.prevent="repairpassword" class="m-auto">
      <input placeholder="输入要修改的密码" v-model="password" type="password" class="mt-5 form-control">
      <input placeholder="再次输入密码" v-model="pwd" type="password" class="mt-5 form-control">
      <input type="submit" class="form-control mt-5 btn btn-dark" value="提交">
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      pwd: ""
    };
  },
  methods: {
    repairpassword() {
        //修改密码
      if (this.password == this.pwd) {
        let data = new FormData();
        data.append("password", this.password);
        data.append("userID", window.sessionStorage.getItem("userid"));
        axios.post("/apis/api/user/update_pwd", data).then(res => {
          if (res.data.code == 1) {
            alert(res.data.msg);
            window.sessionStorage.clear();
            this.$store.state.isLogin = false;
            this.$router.push({ name: "login" });
          }
        });
      } else {
        alert("两次输入的密码不一致");
      }
    }
  }
};
</script>
<style scoped>
.rerepairPassword {
  width: 100%;
}
form {
  width: 50%;
}
.form-control:focus {
  background: transparent;
  outline: none;
  box-shadow: 0 0 5px rgba(207, 220, 0, 0.4);
  border-radius: 5px;
}
</style>
