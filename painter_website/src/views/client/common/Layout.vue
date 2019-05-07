<template>
    <div class="layout-container">
        <head-content></head-content>
        <div style="margin-top:120px;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeadContent from '../index/HeadContent'

export default {
  name: "Layout",
  components:{
      HeadContent
  },
   
}
</script>

<style lang="less" scoped>
    .nav-menu {
        background-color: transparent;
        padding: 20px;
    }
    .layout-container {
        background-color: #f6f0e2;
        min-height: calc(100% - 100px);
        background-image: url('../../../assets/img/bg.jpg');
        // background-size: 100%;
        background-repeat: repeat;
        height: 100%;
        overflow: auto;
    }
    ul {
        width: 750px;
        list-style: none;
        font-size: 20px;
        overflow: hidden;
        float: right;
        & > li {
            float: left;
            width: 125px;
            height: 45px;
            color: #666;
            text-align: center;
            line-height: 45px;
            font-size: 18px;
            cursor: pointer;
            &.active {
                background-color: #b23e2f;
                color: #fff;
            }
            &:hover {
                background-color: #b23e2f;
                color: #fff;
            }
        }
    }
    .center {
        width: 1024px;
        height: 100px;
        margin: 0 auto;
        overflow: hidden;
    }
    .main-container {
        width: 1024px;
        margin: 0 auto;
    }
    h3 {
        color: #b23e2f;
        font-size: 30px;
        border-left: 5px solid #b23e2f;
        padding-left: 45px;
        margin-left: -45px;
        margin-top: 50px;
        margin-bottom: 15px;
    }
    h4 {
        color: #989898;
        font-size: 23px;
        margin-top: 15px;
        margin-bottom: 40px;
    }
</style>
