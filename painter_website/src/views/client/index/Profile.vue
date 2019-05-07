<template>
  <article class="clearfix">
      <h3>个人简介</h3>
      <h4>Personal profile</h4>
      <div class="video">
         <video  style="width:100%;height:100%" src="../../../assets/video.mp4" controls="controls">
            您的浏览器不支持 video 标签。
        </video>
      </div>
      <div class="profile-content">
            <section class="summary">
                <div class="portrait-content">
                    <img style="width: 100%" :src="require('assets/img/portrait.jpg')" alt="大师肖像">
                </div>
                <h5 class="name">叶梓颐</h5>
                <p class="profile-text">90后的北京女孩，外表看似柔弱，却有着独有的韧劲和执着。从小就有一份对于宇宙的好奇。她曾经不远万里奔赴至肯尼亚，在沙暴中等待日全食的出现；她曾经只身前往新西兰，感受那里最纯净清澈的星空；她曾经背着50公斤的设备，在零下25度的北极见证了万年一遇的日全食。</p>
                <!-- <section class="qr-section">
                    <div class="qr-content pull-left">
                        <img style="width: 100%" :src="require('assets/img/qr_code.jpg')" alt="二维码">
                    </div>
                    <div class="qr-text pull-left">
                        <span>扫描二维码访问</span>
                        </br>
                        <span>该艺术家微官网</span>
                    </div>
                </section> -->
            </section>
            <section class="shows">
                 <div class="photo-shows2">
                    <hr class="solid-line"/>
                    <div class="clearfix">
                        <h5 class="pull-left">作品展示</h5>
                        <span class="pull-right more" @click="handleMoreClick">更多</span>
                    </div>
         
                </div>

                <el-carousel
                    class="photo-shows1"
                    :interval="4000"
                    type="card"
                    height="360px"
                    @change="handleImgChange"
                >
                    <el-carousel-item
                        v-for="(img, index)  in imgArrs"
                        :key="index"
                        class="show1-Wrapper"
                    >
                        <img  @click="handleImgClick(img)" style="height:100%" :src="img.pic_url" :alt="img.work_title">
                    </el-carousel-item>
                    <h5 class="wrks-title-1">{{imgArrs[activeIndex]? imgArrs[activeIndex].work_title : ''}}</h5>
                </el-carousel>
               
            </section>
      </div>
  </article>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { work_home_show } from 'api/works'
export default {
    name: 'Profile',
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            imgArrs: [],
            swiperOption: {
                loop: true,
                loopAdditionalSlides: 3,
                autoplay: true,
                slidesPerView: 4,
                spaceBetween: 13.333,
                height: 160,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            activeIndex: 0
        }
    },
    async mounted() {
        this.imgArrs = await work_home_show()
    },
    methods: {
        handleImgChange(activeIndex, prevIndex) {
            this.activeIndex = activeIndex
        },
        handleImgClick(img) {
            this.$router.push(`/works/detail?id=${img.work_id}`)
        },
        handleMoreClick() {
            this.$router.push(`/works`)
        },
        handleCjsxClick() {
            this.$router.push('/works?type=长江三峡')
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
}
</script>


<style lang="less" scoped>
    .cjsx {
        cursor: pointer;
        & img {
            width: 100%;
        }
    }
    .wrks-title-1 {
        position: absolute;
        top: 308px;
        left: 250px;
        z-index: 10000;
        color: #fff;
        font-weight: normal;
        font-size: 24px;
    }
    .swiper-button-prev {
        width: 29px;
        height: 56px;
        position: relative;
        left: 15px;
        top: -98px;
        font-size: 50px;
        background-image: url('../../../assets/img/prev.png');
        background-repeat: no-repeat;
    }
    .swiper-button-next {
        width: 29px;
        height: 56px;
        position: relative;
        left: 645px;
        top: -130px;
        background-image: url('../../../assets/img/next.png');
        background-repeat: no-repeat;
    }
    h3 {
        font-size: 35px;
        color: #222;
        text-align: center;
        margin: 25px 0 10px;
    }
    h4 {
        font-size: 24px;
        color: #999999;
        text-align: center;
        
        margin: 15px 0 30px;
        margin-top: 10px;
        padding-top: 0;
    }

    h5 {
        font-size: 28px;
        color: #222;
        margin: 12px 20px
    }
    h5.name {
        margin: 12px 5px;
    }

    hr {
        outline: none;
        border: none;
        margin: 0;
        padding: 0;
    }

    .solid-line {
        height: 4px;
        margin-top: 22px;
        background-color: #222;
    }

    .dash-line {
        height: 0;
        border-top: 1px dashed  #222;
    }

    .portrait-content {
        width: 275px;
        height: 300px;
    }
    .img-title-2 {
        text-align: center;
        width:130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .profile-text {
        width: 260px;
        margin: 12px 10px 10px 5px;
        font-size: 14px;
        line-height: 28px;
        text-indent: 2rem;
    }

    .qr-content {
        width: 72px;
        height: 72px;
    }

    .qr-text {
        font-size: 18px;
        line-height: 30px;
        margin: 8px 20px;
        &>span {
            padding: 0;
            margin: 0;
            
        }
    }

    .summary {
        width:  280px;
        height: 600px;
        padding: 10px 15px;
        overflow: hidden;
        background-color: #f5f5f5;
        display: inline-block;

    }

    .shows {
        width: 690px;
        height: 639px;
        overflow: hidden;
        display: inline-block;
        margin-left: 17px;
    }

    .photo-shows1 {
        height: 360px;
        width: 1190px;
        margin-left: -250px;
        background-color:rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .show1-Wrapper {
        text-align: center;
        cursor: pointer;
    }

    .photo-shows2 {
        height: 80px;
        width: 100%;
    }
    .img-wrapper2 {
        width: 130px;
        height: 130px;
        overflow: hidden;
        background-color: #e6e6e6;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .photo-shows2-container {
        // background-image: url('../../../assets/img/index_nav_bk.jpg');
        background-size: 100px;
        height: 100%;
        width: 100%;
    }
    .photo-shows2-content {
        width: 560px;
        height: 180px;
        padding: 10px;
        margin-top: 40px;
        margin-left: 55px;
        background-color: #f5f5f5;
    }
    
    .more {
        display: block;
        width: 68px;
        height: 35px;
        background-color: #222;
        color: #fff;
        font-size: 23px;
        text-align: center;
        line-height: 35px;
        margin: 10px 20px;
        cursor: pointer;
    }
</style>
<style lang="less">
    .photo-shows1>.el-carousel__indicators.el-carousel__indicators--outside {
        position: relative;
        background-color: rgba(0, 0, 0, 0.5);
        width: 690px;
        left: 250px;
        top: -50px;
        height: 50px;
        text-align: right;
        line-height: 50px;
        &>li.el-carousel__indicator {
            width: 15px;
            height: 15px;
            border: none;
            padding: 0;
            margin: 5px;
            border-radius: 100%;
            background-color: #eee;
            &>.el-carousel__button {
                width: 15px;
                height: 15px;
                border-radius: 50%;
            }
            &.is-active {
                &>.el-carousel__button {
                    background-color: #222;
                }
            } 
        }
    }
    .photo-shows1 .el-carousel__mask {
        background-color: rgba(0,0,0,0);
    }
    .wrks-title-1{
        width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .video{
        margin:10px auto;
        width:772px;
        height: 443px;
    }
</style>
