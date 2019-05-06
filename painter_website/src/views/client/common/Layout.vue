<template>
    <div class="layout-container">
        <div class="nav-container">
                <div class="center">
                    <el-menu
                        :router=true
                        class="nav-menu"
                    >
                        <el-menu-item
                            v-for="(item, index) in navs"
                            :key="index"
                            :index="item"
                            :class="{active: item != '/' && path.indexOf(item) !== -1}"
                        >
                        {{pathMaps[item].title}}
                        </el-menu-item>
                    </el-menu>
                    <!-- <ul class="clearfix" @click="navChnage">
                        <li v-for="(item,index) in navs" :class="{active: item != '/' && path.indexOf(item) !== -1}" :data-index="item" :key="index">{{pathMaps[item].title}}</li>
                    </ul> -->
                </div>
        </div>
        <div class="main-container">
            <h3>{{pathMaps[path].title}}</h3>
            <h4>{{pathMaps[path].subTitle}}</h4>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  name: "Layout",
    data() {
        return {
            navs: ['/','/profile','/works','/album','/news','/contact'],
            pathMaps: {
                '/': {
                    title: '首页'
                },
                '/profile': {
                    title: '个人简介',
                    subTitle: "Personal profile"
                },
                '/works': {
                    title: '作品展示',
                    subTitle: 'Exhibition of works'
                },
                '/works/detail': {
                    title: '作品展示',
                    subTitle: 'Exhibition of works'
                },
                '/album': {
                    title: '相册',
                    subTitle: 'Photo album'
                },
                '/news': {
                    title: '新闻中心',
                    subTitle: 'News Center'
                },
                '/news/detail': {
                    title: '新闻中心',
                    subTitle: 'News Center'
                },
                '/contact': {
                    title: '联系我们',
                    subTitle: 'Contact us'
                },
                
            }
        }
    },
    computed: {
        path() {
            return this.$route.path
        }
    },
    methods: {
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
        background-image: url('../../../assets/img/bg2.png');
        background-size: 100%;
        background-repeat: no-repeat;
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
