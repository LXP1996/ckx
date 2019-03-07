<template>
  <div class="asider">
    <ul class="list-group" v-for="asiderItem in asiderData" :key="asiderItem.title">
      <!-- 点击是否显示子菜单 -->
      <li
        :class="{'bg-info':asiderItem.status}"
        class="list-group-item"
        @click="change(asiderItem)"
      >
        <!-- 渲染内容 -->
        <span>{{asiderItem.title}}</span>
      </li>
      <!-- 子菜单 -->
      <ul v-if="asiderItem.status" class="list-group">
        <!-- 循环拿到数据 -->
        <li class="list-group-item"  v-for="(item,index) in asiderItem.userData" :key="index" v-if="item.flage">
          <router-link :to="{name:item.url}">{{item.title}}</router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      asiderData: [
        // {
        //   status: true,
        //   title: "欢迎页",
        //   userData: [],
        // },
        {
          status: true, //点击住户管理显示下拉列表开关
          title: "住户管理",
          userData: [
            {
              flage: true,
              url: "repairpassword",
              title: "修改密码",
              status: false //默认未选中
            },
            {
              flage: true,
              url: "queryUser",
              title: "查询住户",
              status: false //默认未选中
            },
            {
              flage: true,
              url: "Therepair",
              title: "住户报修",
              status: false //默认未选中
            },
            {
              flage: true,
              url: "queryrepairecontent",
              title: "报修管理",
              status: false //默认未选中
            },
            {
              flage: true,
              url: "queryrepairecontent",
              title: "报修查询",
              status: false //默认未选中
            }
          ]
        },
        {
          status: false, //点击社区管理显示下拉列表开关
          title: "社区管理",
          userData: [
            {
              flage: true,
              url: "addCommunity",
              title: "添加社区",
              status: false //默认未选中
            },
            {
              flage: true,
              url: "queryCommunity",
              title: "查询社区",
              status: false //默认未选中
            }
          ]
        }
      ]
    };
  },
  methods: {
    change(asiderItem) {
      //展示子菜单的内容
      this.asiderData.forEach(v => {
        v.status = false;
      });
      asiderItem.status = true;
    }
  },
  created() {
    //判断是否是管理员
    if (window.sessionStorage.getItem("username") !== "root") {
        this.asiderData.forEach(v => {
        v.userData.forEach(v1=>{
          console.log(11)
          if(v1.title=="添加社区"||v1.title=="查询住户"||v1.title=="报修管理"){
            v1.flage=false;
          }
        })
      });
    }else{
        this.asiderData.forEach(v => {
        v.userData.forEach(v1=>{
          if(v1.title=="修改密码"||v1.title=="住户报修"||v1.title=="报修查询"){
            v1.flage=false;
          }
        })
      });
    }
  },
  beforeRouteLeave (to, from, next) {
      this.asiderData.forEach(v => {
        v.userData.forEach(v1=>{
       
            v1.flage=false;
          
        })
      });
  }
};
</script>
<style scoped>
li {
  cursor: pointer;
}
</style>


