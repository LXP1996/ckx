<template>
  <div class="queryuser">
    <table class="table">
      <thead>
        <tr>
          <td>ID</td>
          <td>账号</td>
          <td>密码</td>
          <td>真实姓名</td>
          <td>状态</td>
          <td>地址</td>
          <td>性别</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
          <td>{{item.password}}</td>
          <td>{{item.name}}</td>
          <td>{{item.state=="false"?"拉黑":"正常"}}</td>
          <td>{{item.communityInfo==null?"暂无数据":item.communityInfo.Name}}</td>
          <td>{{item.sex}}</td>
          <td>
            <button
              @click="addblack(item.id,item.state)"
              class="btn btn-dark"
              v-if="item.state=='true'"
            >加入黑名单</button>
            <button
              @click="addblack(item.id,item.state)"
              class="btn btn-dark"
              v-if="item.state=='false'"
            >加入白名单</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      data: null
    };
  },
  created() {
    //获取住户信息
    axios.get("apis/api/user/query_user").then(res => {
      if (res.data.code == 1) {
        this.data = res.data.data;
      }
    });
  },
  methods: {
    addblack(id, state) {
      if (state == "true") {
        state = "false";
         this.add_black_adn_white(id, state);
      } else {
        state = "true";
         this.add_black_adn_white(id, state);
      }
     
    },
    add_black_adn_white(id, state) {
      let data = new FormData();
      data.append("state", state);
      data.append("userID", id);
      axios.post("apis/api/user/add_back", data).then(res => {
        if (res.data.code == 1) {
          //刷新数据
          axios.get("apis/api/user/query_user").then(res => {
            if (res.data.code == 1) {
              this.data = res.data.data;
            }
          });
        } else {
          alert(res.data.msg);
        }
      });
    }
  }
};
</script>
<style >
</style>
