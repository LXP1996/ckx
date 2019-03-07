import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'//引入状态管理
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:"/home/welcome",
      beforeEnter(to, from, next) {//路由守卫=》登录进入管理页面 非登录进入登录页面
        if (store.getters.isLogin) {
        next();
      }else if(window.sessionStorage.getItem("isLogin")){//登录成功将存入sessionStorage
        next();
      } else{
        next({name:"login"})
      }
     
      },
      children:[{
        path:'/home/welcome',
          name:'welcome',
          component:()=>import('./views/welcome.vue')
      },
        {
          path:'/home/addCommunity',
          name:'addCommunity',
          component:()=>import('./views/addCommunity.vue')
        },{
          path:'/home/queryCommunity',
          name:'queryCommunity',
          component:()=>import('./views/queryCommunity.vue')
        },
        {
          path:"/queryUser",
          name:"queryUser",
          component:()=>import("./views/queryUser")
        },
        {
          path:"/repairpassword",
          name:"repairpassword",
          component:()=>import("./views/repairpassword")
        },
        {
          path:"/Therepair",
          name:"Therepair",
          component:()=>import("./views/Therepair")
          
        },{
          path:"/queryrepairecontent",
          name:"queryrepairecontent",
          component:()=>import("./views/queryrepairecontent")
          
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path:"/login",
      name:'login',
      component:()=>import('./views/login.vue'),
      beforeEnter(to,from,next){
        if(window.sessionStorage.getItem("isLogin")){//登录成功将存入sessionStorage
          next({name:"home"});
        } else{
          next()
        }
      }
    },
    {
      path:"/register",
      name:"register",
      component:()=>import("./views/register")
    },
   
  ]
})
