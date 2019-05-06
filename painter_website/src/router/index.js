import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import md5 from 'md5'
import adminRouter from './admin'
import clientRouter from './client'

Vue.use(Router)

const router = new Router({
  routes:adminRouter.concat(clientRouter)
})

router.beforeEach((to,from,next)=>{
  // 如果是属于后台管理才做拦截
  if(!to.meta.admin){
    next()
    return false;
  } 
  //登录拦截
  if(sessionStorage.getItem("login") && sessionStorage.getItem("login") === md5('access')){
    next()
  }else if(to.path!=="/login"){
    Message({
      message:"请登录",
      type:"warning"
    });
    next({
        path: '/login',
        query: {redirect: to.fullPath}  //登录成功后进入上次点击的页面
    })
  }else{
    next()
  }
 
})

export default router