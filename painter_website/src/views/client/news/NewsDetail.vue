<template>
    <div class="container">
        <div class="center">
            <h5>{{news_title}}</h5>
            <p class="news-date">{{news_date}}</p>
            <div id="news-content" class="news-content"  ref="content">
                {{news_content}}     
            </div>
        </div>
    </div>
</template>

<script>
import { news_select_id } from 'api/news';

export default {
  name: "NewsContent",
   async mounted(){
    //获取作品id
    this.news_id = this.$route.query.news_id*1;

    //回显
    let res = await news_select_id({id:this.news_id});
    this.news_title = res.news_title;
    this.news_date = res.news_date.substr(0,10)+" "+res.news_date.substr(11,8);
    let {news_content} = res;
    this.$refs.content.innerHTML =  news_content;
  },
  data() {
    return {
      news_id:-1,
      news_title:"",
      news_date:"",
      news_content:""
    };
  },
}

</script>

<style lang="less" scoped>
    .center {
        width: 1024px;
        margin: 0 auto;
        height: 100%;
    }
    p {
        text-indent: 2em;
        color: #666;
        font-size: 22px;
        line-height: 38px;
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
    h5 {
        font-size: 30px;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .news-date {
        color: #989898;
        font-size: 17px;
        text-align: center;
        margin-bottom: 40px;
    }
    .news-content {
        width: 800px;
        margin: 0 auto;
        background: transparent;
        & * {
            background-color: transparent !important;
        }
    }
</style>
<style lang="less">
    #news-content {
        background: transparent;
        & * {
            background-color: transparent !important;
        }
    }
</style>
