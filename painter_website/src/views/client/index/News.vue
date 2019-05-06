<template>
    <div class="news-container">
        <h3>新闻中心</h3>
        <h4>News Center</h4>
        <hr class="solid-hr-b" />
        <div>
            <h5>新闻中心</h5>
            <span class="more"  @click="$router.push('/news')">更多</span>
        </div>
        <div class="photos-content">
            <div v-for="(item,index) in newsList" :key="index">
                <hr class="solid-hr-t" />
                <div class="news-item clearfix" >
                    <div class="news-item-l">
                        <h6>{{item.news_title}}</h6>
                        <p class="news-date">{{convertUTCTimeToLocalTime(item.news_date)}}</p>
                        <p class="news-content">{{item.news_plainText.substr(0,200)+'...'}}</p>
                    </div>
                    <div class="news-item-r">
                        <span class="news-detail"  @click="$router.push('/news/detail?news_id='+item.news_id)">详细</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { news_select } from 'api/news';
import { convertUTCTimeToLocalTime } from 'utils/index.js' 

export default {
  name: 'News',
  async mounted(){
    // 首次请求数据
    let { list } = await news_select({limit:3,currentPage:1});
    this.newsList = list;
  },
  data(){
      return {
          newsList:[],
          convertUTCTimeToLocalTime:convertUTCTimeToLocalTime
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
    h6 {
        font-size: 23px;
        color: #222;
        margin: 30px 20px 10px;
    }
    hr {
        border: none;
        margin: 0;
    }
    .solid-hr-b {
        height: 4px;
        margin-top: 22px;
        background-color: #222;
    }
    .solid-hr-t {
        height: 0;
        border-top: 1px solid  #222;
    }
    .news-date {
        font-size: 17px;
        color: #666;
        margin: 15px 20px;
    }
    .news-content {
        font-size: 12px;
        color: #666;
        margin: 15px 20px;
        line-height: 18px;
    }
    .news-item-l {
        width: 860px;
        display: inline-block;
    }
    .news-item-r {
        display: inline-block;
        vertical-align: top;
        margin-left: 70px;
    }
    .news-detail {
        display: block;
        width: 65px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border: 1px solid #222;
        color: #222;
        font-size: 23px;
        margin: 30px 20px 0 0;
        cursor: pointer;
    }

    .more {
        cursor: pointer;
        display: block;
        width: 68px;
        height: 35px;
        background-color: #222;
        color: #fff;
        font-size: 23px;
        text-align: center;
        line-height: 35px;
        margin-top: 10px;
        margin-left: 778px;
        display: inline-block;
    }
</style>
