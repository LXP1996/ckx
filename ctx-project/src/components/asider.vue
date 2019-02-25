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
        <li
          class="list-group-item"
          v-for="item in asiderItem.userData"
          :key="item.title"
        ><router-link :to="{name:item.url}">{{item.title}}</router-link></li>
      </ul>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      asiderData: [
        {
          status: true,
          title: "欢迎页",
          userData: []
        },
        {
          status: false, //点击住户管理显示下拉列表开关
          title: "住户管理",
          userData: [
            {
              title: "添加住户",
              status: false //默认未选中
            },
            {
              title: "查询住户",
              status: false //默认未选中
            }
          ]
        },
        {
          status: false, //点击社区管理显示下拉列表开关
          title: "社区管理",
          userData: [
            {
              url:"addCommunity",
              title: "添加社区",
              status: false //默认未选中
            },
            {
              url:"queryCommunity",
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
          v.status=false;
      });
      asiderItem.status=true;
    }
  }
};
</script>
<style scoped>
li {
  cursor: pointer;
}
</style>


