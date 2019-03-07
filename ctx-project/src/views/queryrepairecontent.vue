<template>
  <div class="queryUserrepair">
    <table class="table">
      <thead>
        <tr>
          <td>序号</td>
          <td>住户</td>
          <td>社区</td>
          <td>时间</td>
          <td>内容</td>
          <td v-if="flage">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.user.name}}</td>
          <td>{{item.user.communityInfo.Name}}</td>
          <td>{{item.createdAt}}</td>
          <td>
            <textarea :value="item.content"></textarea>
          </td>
          <td v-if="flage">
            <button
              @click="dealwith(item,item.id)"
              v-if="item.state==0"
              class="btn btn-dark"
            >处理</button>
            <button @click="dealwith(item,item.id)" v-if="item.state==1" class="btn btn-dark">正在处理</button>
            <button  v-if="item.state==2" class="btn btn-dark">已处理</button>
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
      flage:false,
      data: ""
    };
  },
  created() {
 
    if(this.$store.getters.Username=="root"){
     
     this.flage=true;
    }

    axios.get("/apis/api/user/queryrepair").then(res => {
      if (res.data.code == 1) {
        this.data = res.data.data;
        console.log(res);
      }
    });
  },
  methods: {
    dealwith(item, id) {
      let data = new FormData();
    
       if (item.state == 0) {
            data.append("state", 1);
          } else {
            data.append("state", 2);
          }
      data.append("id",id)
      axios.post("/apis/api/user/updatarepair", data).then(res => {

        if (res.data.code == 1) {
          if (item.state == 0) {
            item.state = 1;
          } else {
            item.state = 2;
          }
        }
      });
    }
  }
};
</script>
