<template>
  <div class="addCommunity mt-5 mr-5">
    <div class="mb-5 h4">
      <span>
        <img src="../assets/add.png" width="25" alt srcset>&nbsp;添加社区
      </span>
    </div>
    <form @submit.prevent="addCommunity" class="m-auto">
      <!-- 社区 -->
      <div class="input-group">
        <span class="m-auto">
          <img src="../assets/community.png" width="25" alt srcset>&nbsp;社区名称:
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          v-model="CommunityName"
          required
          type="text"
          class="d-inline-block form-control"
        >
      </div>
      <!-- 地址 -->
      <div class="input-group mt-4">
        <span class="m-auto">
          <img src="../assets/address.png" width="25" alt srcset>&nbsp;社区地址:
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          v-model="address"
          required
          type="text"
          class="d-inline-block form-control"
        >
      </div>
      <!-- 物业费 -->
      <div class="input-group mt-4">
        <span class="m-auto">
          <img src="../assets/charge.png" width="25" alt srcset>&nbsp;社区收费:
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          v-model="charge"
          required
          type="text"
          class="d-inline-block form-control"
        >
      </div>
      <!-- 社区类型 -->
      <div class="input-group mt-4">
        <span class="m-auto">
          <img src="../assets/type.png" width="25" alt srcset>&nbsp;社区类型:
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          v-model="type"
          required
          type="text"
          class="d-inline-block form-control"
        >
      </div>
      <input
        v-if="!status"
        type="submit"
        name
        id
        value="添加社区"
        class="btn btn-outline-dark form-control mt-5"
      >
      <input
        v-if="status"
        type="submit"
        name
        id
        value="修改"
        class="btn btn-outline-dark form-control mt-5"
      >
    </form>
  </div>
</template>
<script>
import axios from "axios";
 console.log(window.navigator.userAgent)
export default {
  data() {
    return {
      status: false, //判断是否是修改还是增加的开关 默认是false(增加)
      CommunityName: "", //只能输入中文和英文和数字
      charge: "", //只能输入数字
      address: "",
      type: ""
    };
  },
  methods: {
    addCommunity() {
      //实例化formData对象
      let formdata = new FormData();
      formdata.append("name", this.CommunityName);
      formdata.append("charge", this.charge);
      formdata.append("address", this.address);
      formdata.append("type", this.type);
      if (this.status) {
        formdata.append("userID", this.$route.params.id);
        axios
          .post("/apis/api/user/updata_community", formdata)
          .then(res => {
            alert(res.data.msg);
            if (res.data.code == 1) {
              //成功删除输入框中的数据
              this.CommunityName = "";
              this.charge = "";
              this.type = "";
              this.address = "";
              this.$router.go(-1)//返回上一级目录
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .post("/apis/api/user/add_community", formdata)
          .then(res => {
            alert(res.data.msg);
            if (res.data.code == 1) {
              //成功删除输入框中的数据
              this.CommunityName = "";
              this.charge = "";
              this.type = "";
              this.address = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //判断进入才组件是增加还是修改
      let data = vm.$route.params;
      if (data.id > 0) {
        vm.CommunityName = data.name;
        vm.charge = data.charge;
        vm.address = data.address;
        vm.type = data.type;
        vm.status = true;
      } else {
      }
    });
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(207, 220, 0, 0.4);
  border-radius: 5px;
}
form {
  width: 60%;
}
</style>
