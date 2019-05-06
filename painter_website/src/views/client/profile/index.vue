<template>
    <div class="center">
        <div class="portrait-content pull-left">
            <img style="width: 100%" :src="require('assets/img/protrait_01.jpg')" alt="大师肖像">
        </div>
        <div class="profile-desc pull-right">
            <h5 class="name">叶梓颐</h5>
            <p class="profile-text">
              90后的北京女孩，外表看似柔弱，却有着独有的韧劲和执着。从小就有一份对于宇宙的好奇。她曾经不远万里奔赴至肯尼亚，在沙暴中等待日全食的出现；她曾经只身前往新西兰，感受那里最纯净清澈的星空；她曾经背着50公斤的设备，在零下25度的北极见证了万年一遇的日全食。
            </p>
            <p class="main-works">
                 主要作品：《北极日全食》、《玻利维亚的天空之境》
            </P>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile'
}
</script>

<style lang="less" scoped>
    .center {
        width: 1024px;
        margin: 0 auto;
        height: 100%;
    }
    h5 {
        font-size: 30px;
        margin: 0;
        padding: 0;
        padding-top: 30px;
        padding-left: 30px;
    }
    p {
        padding-left: 30px;
        color: #666;
        font-size: 18px;
        line-height: 32px;
    }
    .portrait-content {
        width: 400px;
        height: 470px;
        overflow: hidden;
//         &>img {
//             height: 100%;
//         }
    }
    .profile-desc {
        width: 600px;
    }
    .main-works {
        font-size: 20px;
    }
	.profile-text{
		text-indent: 40px;
	}
</style>