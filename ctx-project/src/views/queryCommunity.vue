<template>
  <div class="queryCommunity">
    <div class="row mt-1 mb-4">
      <div class="col col-2 offset-6">
        <!-- 搜索选择类型 -->
        <select v-model="selectContent" class="custom-select">
          <option disabled value>请选择</option>
          <option value="0">社区编号</option>
          <option value="1">社区名称</option>
          <option value="2">社区收费</option>
          <option value="3">社区地址</option>
          <option value="4">社区类型</option>
          <option value="5">查询全部</option>
        </select>
      </div>
      <!-- 搜索输入内容 -->
      <div class="col col-3">
        <span>
          <input type="text" v-model="serachContent" class="d-inline-block form-control">
        </span>
      </div>
      <!-- 点击搜索按钮 -->
      <div class="col col-1">
        <button @click="serach" class="btn btn-outline-dark">搜索</button>
      </div>
    </div>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <td>社区编号</td>
          <td>社区名称</td>
          <td>社区收费</td>
          <td>社区地址</td>
          <td>社区类型</td>
          <td v-if="flage">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.Name}}</td>
          <td>{{item.charge}}</td>
          <td>{{item.address==null?"暂无数据....":item.address}}</td>
          <td >{{item.type}}</td>
          <td v-if="flage">
            <span>
              <button class="btn btn-info" @click="updata(item)">修改</button>
            </span>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <span>
              <button @click="deletfn(item.id)" class="btn btn-danger">删除</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import { get } from "http";
export default {
  data() {
    return {
      flage:false,//判断是否为管理员 true为管理员
      selectContent: "",
      serachContent: "",
      queryData: ""
    };
  },
  computed: {
    data: {
      get() {
        return this.queryData;
      },
      set() {}
    }
  },
  methods: {
    serach() {
      /**
       * 0-->社区编号
       * 1-->社区名称
       * 2-->社区收费
       * 3-->社区地址
       * 4-->社区类型
       */
      let number = this.selectContent;
      console.log(number);
      if (number == "0") {
        this.$options.methods.serachContent_("id", this);
      } else if (number == "1") {
        this.$options.methods.serachContent_("Name", this);
      } else if (number == "2") {
        this.$options.methods.serachContent_("charge", this);
      } else if (number == "3") {
        this.$options.methods.serachContent_("address", this);
      } else if (number == "4") {
        this.$options.methods.serachContent_("type", this);
      } else if (number == "5") {
        this.$options.methods.serachContent_("all", this);
      } else {
        alert("请选择查询类型");
      }
    },
    serachContent_(p, this_) {
      //获取数据
      let data = this_.$store.getters.queryCommunityData;
      if (p == "all") {
        this_.queryData = data;
      } else {
        data.forEach(v => {
          //如果和查询的数据一直更换数据源
          if (v[p] == this_.serachContent) {
            this_.queryData = [v];
          }
        });
      }
    },
    updata(item){
        //点击修改进入修改页面并传递参数过去
      this.$router.push({name:"addCommunity",params:{charge:item.charge,name:item.Name,id:item.id,address:item.address,type:item.type}})
    },
    deletfn(e){//删除社区信息
    let data=new FormData();//创建formData对象存储数据
    data.append("userID",e)//发送请求
       axios.post("/apis/api/user/delete_Community",data).then(res=>{
           if(res.data.code==1){//后台处理成功修改数据源  
            alert(res.data.msg);
            this.$store.state.queryCommunityData.forEach((v,index)=>{
                if(v.id==e){
               this.$store.state.queryCommunityData.splice(index,1);
               this.queryData=this.$store.state.queryCommunityData;
                }
            })
           }else{
               alert(res.data.msg)
           }
       })
        
    }
  },
  created() {
     if(window.sessionStorage.getItem("username")=="root"){
     this.flage=true;
    }else{
      this.flage=false;
    }
    //创建组件时发送请求获取数据
    let data = axios
      .get("/apis/api/user/query_community")
      .then(res => {
        return res.data.data;
      })
      .catch(err => {});

    data.then(res => {
      //将数据给渲染的属性
      this.queryData = res;
      //将数据存在store中
      this.$store.state.queryCommunityData = res;
    });
  },
  beforeRouteLeave(to, from, next) {
   this.flage=false;
    next()
  }
};
</script>
<style scoped>
select:focus,
input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(207, 220, 0, 0.4);
  border-radius: 5px;
}
.row {
  margin: 0px;
  padding: 0px;
}
td {
  vertical-align: middle;
}
</style>

