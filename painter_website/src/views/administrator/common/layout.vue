<template>
  <div class="layout">
      <header class="header">
          <span class="title pull-left"><i class="el-icon-menu" style="margin-right:10px;"></i>何笑勤个人网站后台管理系统</span>
          <div class="pull-right">
              <span style="margin-right:20px;cursor:pointer;font-size:14px;" @click="$router.push('/')">
                <i class="el-icon-location-outline"></i><span style="margin-left:5px;">回到网站首页</span>
              </span>
               <el-dropdown @command='handleCommand'>
                <span class="el-dropdown-link">
                  管理员<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item command='changePsd'>修改密码</el-dropdown-item>
                  <el-dropdown-item command='quit'>退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </div>
      </header>
      <div class="main">
        <aside>
          <slider></slider>
        </aside>
        <section class="main-content">
            <div class="content">
                 <router-view></router-view>
            </div>
        </section>
      </div>
     
  </div>
</template>

<script>
import slider from "admin/common/slider";

export default {
  components: {
    slider
  },
  data() {
    return {};
  },
  methods:{
    handleCommand(command){
        //退出系统 
        if(command === 'quit'){
            sessionStorage.removeItem('login')
            this.$router.push('/login');
        }
        // 修改密码
        if(command === 'changePsd'){
            this.$router.push('/admin/changePsd');
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 50px;
  line-height: 50px;
  background: #4f4e4e;
  color: #fff;
  padding: 0 50px;
}

.header .title {
  font-size: 18px;
}

.layout {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  height: 100%;
}

.main {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  flex: 1;
}

.aside {
  width: 200px;
}

.main-content {
  flex: 1;
}

.main-content .content{
  padding:20px 50px 0px;
  height: 100%;
  /* width: 100%; */
  overflow-y: auto;
  background: url(../../../assets/img/adminbg2.jpg) no-repeat;
  background-size:cover; 
  box-sizing: border-box;
}

.el-dropdown{
  color: #fff;
  font-size: 14px;
}
</style>
