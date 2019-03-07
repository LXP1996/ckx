<template>
  <div class="header bg-light border-bottom">
    <div class="container-fluid bg-light">
      <nav class="navbar navbar-expand bg-light justify-content-between">
        <span class="navbar-brand">
          <span>
            社区居民信息管理系统
            <img src="./../assets/admin.png" width="25" alt srcset>
          </span>
        </span>
        <ul class="navbar-nav">
          <li class="nav-link"><span><img src="../assets/user-name.png" width="25" alt="" srcset="">&nbsp;{{Username}}</span></li>
          <li class="nav-link">|</li>
           <li @click="out" class="nav-link" style="cursor:pointer"><span><img src="../assets/out.png" width="25" alt="" srcset="">&nbsp;退出登录</span></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            Username:window.sessionStorage.getItem("username")
        }
    },
    methods:{
      out(){
        if(confirm("你确定要退出吗")){
          window.sessionStorage.clear();
           this.$store.state.isLogin=false;
          this.$router.push({name:"login"})
         
          
        }
      }
    }
};
</script>
<style scoped>
</style>
