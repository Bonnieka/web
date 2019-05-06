<template>
    <div class="center">
        <p><span class="attention">关注</span><span class="web-name">何笑勤个人网站</span></p>
        <div class="footer-content clearfix">
            <div class="links-l pull-left clearfix">
                <a class="attention-link" href="https://weibo.com/u/6410592208"><i class="weibo"></i></a>
                <a class="attention-link" href=""><i class="qq"></i></a>
                <a class="attention-link" href=""><i class="weixin"></i></a>
            </div>
            <div class="adds-m pull-left">
                <p>地址：四川省眉山市洪雅县</p>
                <p>电话：13778888820</p>
            </div>
            <div class="adds-r pull-right">
                <p>邮箱：762426@qq.com</p>
                <p>邮编：aaa</p>
                <!-- <p>地址：18183272222</p> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contact'
}
</script>

<style lang="less" scoped>
    .contact-index-container {
        background-color: #f6f0e2;
        min-height: calc(100% - 100px);
        background-image: url('../../../assets/img/bg2.png');
        background-size: 100%;
        background-repeat: no-repeat;
        height: 100%;
        overflow: auto;
    }
    .center {
        width: 1024px;
        margin: 0 auto;
        height: 100%;
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
    .solid-hr-b {
        height: 4px;
        margin-top: 22px;
        background-color: #b23e2f;
    }
    .solid-hr-t {
        height: 0;
        border-top: 1px solid  #b23e2f;
    }
    .attention {
        font-size: 25px;
        color: #666;
        margin: 60px 30px;
    }
    .web-name {
        font-size: 25px;
        color: #666;
        margin: 60px 30px;
        margin-left: 250px;
    }
    .attention-link {
        width: 35px;
        height: 35px;
        float: left;
        margin: 0 0 65px 50px; 
    }
    .attention-link+.attention-link {
        margin-left: 45px;
    }
    i.weibo {
        display: block;
        width: 35px;
        height: 35px;
        background-image: url('../../../assets/img/weibo.png');
        background-size: 35px 35px;
    }
     i.qq {
        display: block;
        width: 35px;
        height: 35px;
        background-image: url('../../../assets/img/QQ.png');
        background-size: 35px 35px;
    }
     i.weixin {
        display: block;
        width: 35px;
        height: 35px;
        background-image: url('../../../assets/img/weixin.png');
        background-size: 35px 35px;
    }
    .adds-m,.adds-r {
        font-size: 23px;
        color: #989898;
        margin-top: 60px;
        margin-left: 120px;
        &>p {
            padding: 0;
            margin: 0;
            &+p {
                margin-top: 35px;
            }
        }
    }
    .links-l {
        margin-top: 60px;
    }
</style>