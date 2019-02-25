<template>
  <div class="home">
   <app-header></app-header>
    <div class="container-fluid">
      <div class="row mt-2">
      <div class="col col-2">
        <!-- 引入侧边导航 -->
        <app-asider></app-asider>
      </div>
      <div class="col col-10">
        <!-- 路由内容区域数据 -->
        <router-view></router-view>
      </div>
   </div>
    </div>
  </div>
</template>

<script>
// @ is an  to /src
import header from './../components/header'
import asider from './../components/asider'
export default {
  name: 'home',
  components: {
    "app-header":header,
    "app-asider":asider
  },
  data(){
    return{
      data:this.$slots.ss
    }
  }
}
</script>
<style scoped>
.container-fluid,.row,.col {
  padding: 0px;
  margin: 0px;
}
</style>

