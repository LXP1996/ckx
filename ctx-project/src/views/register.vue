<template>
  <div class="register pt-5 container-fluid">
    <div class="row">
      <span class="m-auto">
        <img src="./../assets/add.png" width="25" alt srcset>&nbsp;&nbsp;添加用户
      </span>
    </div>
    <div class="row">
      <form @submit.prevent="register" class="m-auto">
        <input v-model="useremail" type="text" placeholder="输入邮箱地址" class="form-control">
        <input
          v-model="userpasword"
          type="password"
          placeholder="密码必须以英文开头并且包含数字或者英文&6-15位"
          class="form-control"
        >
        <input v-model="userpwd" type="password" placeholder="再次输入密码" class="form-control">
        <input v-model="username" type="password" placeholder="输入真实姓名" class="form-control">
        <b-radio-group v-model="usersex" class="mt-3">
          <b-radio value="男">男</b-radio>
          <b-radio value="女">女</b-radio>
        </b-radio-group>
        <select class="custom-select mt-3" v-model="community">
          <option disabled value>请选择</option>
          <option v-for="item in communityData" :key="item.id" :value="item.id">{{item.Name}}</option>
        </select>
        <input type="submit" value="立即注册" class="form-control btn btn-outline-dark mt-5">
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      useremail: "", //用户邮箱地址
      userpasword: "", //用户密码
      userpwd: "", //用户确认密码
      username: "", //用户真实姓名
      usersex: "", //用户性别
      community: "", //用户所在的小区
      communityData: null
    };
  },
  created() {
    //获取小区信息
    axios.get("/apis/api/user/query_community").then(res => {
      this.communityData = res.data.data;
    });
  },
  methods: {
    register() {
      if (this.userpasword != this.userpwd) {
        alert("两次输入的密码不一致");
      } else {
        let data = new FormData();
        data.append("username", this.useremail); //用户名
        data.append("password", this.userpasword); //密码
        data.append("sex", this.usersex);
        data.append("address", this.community);
        data.append("name", this.username);
        axios.post("/apis/api/user/add_user", data).then(res => {
          if (res.data.code == "1") {
            //清空数据
            this.useremail = "";
            this.userpasword = "";
            this.userpwd = "";
            this.community = "";
            this.usersex = "";
            this.username = "";
            alert(res.data.msg);
            this.$router.push("/login"); //如果注册成功返回登录界面
          } else {
            alert(res.data.msg);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
form {
  width: 50%;
}
form input {
  margin-top: 15px;
}
.register {
  width: 100%;
  height: 100vh;
  background: whitesmoke;
}
select:focus,
input:focus {
  background: transparent;
  outline: none;
  box-shadow: 0px 0px 0px rgba(223, 0, 0, 0.8);
}
</style>
