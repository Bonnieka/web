<template>
    <div class="photos-container">
        <h3>相册</h3>
        <h4>Photos</h4>
        <hr class="solid-hr-b" />
        <div class="clearfix">
            <h5>相册</h5>
            <span class="more" @click="$router.push('/album')" style="cursor:pointer">更多</span>
        </div>
        <hr class="dashed-hr-t" />
        <div class="photos-content">
            <div class="photo-wrapper" v-for="(item,index) in photoList" :key="index" >
                <img class="photo-pic" :src="item.pic_url" alt="照片未加载成功" @click="currentBigPic=index">
                <p style="color:#222;text-align:center;" class="photo_title" :title="item.pic_title">{{item.pic_title}}</p>
                <div class='big-pic' v-show='currentBigPic==index' @click='currentBigPic=-1'>
                    <img :src="item.pic_url" alt="图片未加载成功">
                </div>
            </div>
            
        </div>
    </div>

</template>

<script>
import { photo_select } from 'api/photo';

export default {
  name: 'Photos',
  async mounted(){
       let { list } = await photo_select({limit:4,currentPage:1});
       this.photoList = list;
  },
  data(){
      return {
          currentBigPic:-1, // 当前显示的大图
          photoList:[]
      }
  }
}
</script>

<style lang="less" scoped>
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
        margin: 12px 20px;
        display: inline-block;
    }
    hr {
        border: none;
        margin: 0;
    }
    .photo_title {
        font-size: 16px;
    }
    .solid-hr-b {
        height: 4px;
        margin-top: 22px;
        background-color: #222;
    }
    .dashed-hr-t {
        height: 0;
        border-top: 1px dashed  #222;
    }
    .photos-content {
        height: 305px;
        width: 1015px;
        // background-image: url('../../../assets/img/index_nav_bk.jpg');
        background-size: 100px;
        overflow: hidden;
        padding: 15px 4.5px;
        font-size: 0;
    }
    .photo_title{
        overflow: hidden;
        width: 84%;
        margin: 0 auto;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .photo-wrapper {
        cursor: pointer;
        background-color: #f5f5f5;
        width: 235px;
        height: 275px;
        margin: 15px 0 15px 15px;
        display: inline-block;
        font-size: 0;
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
        display: inline-block;
        margin: 10px 20px;
        margin-left: 833px;
    }
    .photo-pic{
        display: block;
        width: 210px;
        height: 200px;
        margin:  20px auto;
    }
</style>
