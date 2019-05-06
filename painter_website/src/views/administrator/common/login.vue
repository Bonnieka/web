<template>
  <div class="bg">
    <div class="login-box">
        <p class="title">欢迎来到何笑勤网站后台管理系统</p>
        <div class="login-item">
          <span class="login-item-title">账号:</span>
        <el-input type="text" v-model="username" placeholder="请输入管理员账号"></el-input>
        </div>
      <div class="login-item">
        <span class="login-item-title">密码:</span>
        <el-input type="password" v-model="password" placeholder="请输入管理员密码"></el-input>
      </div>
      <div class="login-item" style="text-align:right">
          <el-button type="success" @click="submit" class="btn-submit">登录</el-button>
      </div>
    </div>
  </div>
 
</template>

<script>
import loginHttp from 'api/loginhttp.js'
import md5 from 'md5'

export default {
  data(){
    return {
      username:'',
      password:'',
    }
  },
  methods:{
    submit(){
      loginHttp({'username':this.username,'password':md5(this.password)});
    }
  }
};
</script>

<style>
.login-box {
  background: rgba(157,157,157,.5);
  width: 700px;
  margin: 0 auto;
  border-radius: 8px;
  height: 500px;
  position: fixed;
  top: calc(50% - 300px);
  left: calc(50% - 300px);
  box-sizing: border-box;
  padding: 50px 50px; 
}
.login-box .title {
  text-align: center;
  margin-bottom: 40px;
  font-size:36px;
  color: #000;
}
.login-box .login-item {
  margin-bottom: 20px;
}
.login-box .login-item .login-item-title{
    margin-bottom: 10px;
    display: block;
    font-size:20px;
    color:#000;
}
.btn-submit{
  letter-spacing: 3px;
  width: 100%;
  margin-top: 30px;
  font-size: 16px;
}

.bg{
  height: 100%;
  width:100%;
  background:url('../../../assets/img/adminbg.jpg') no-repeat 0 0;
  background-size:cover; 
}
</style>

