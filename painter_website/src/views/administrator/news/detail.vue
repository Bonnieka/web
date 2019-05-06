<template>
    <div class="detail">
        <h3>新闻详情</h3>
        <div class="head">
            <h2>{{news_title}}</h2>
            <span class="date">{{news_date}}</span>
        </div>
        
        <div class="detail-content" ref="content">
            {{news_content}}
        </div>
    </div>
</template>

<script>
import { news_select_id } from 'api/news';
import { convertUTCTimeToLocalTime } from 'utils/index'

export default {
  data() {
    return {
      news_title:"",
      news_date:"",
      news_content:""
    };
  },
  async mounted(){
    //获取作品id
    this.work_id = this.$route.query.id*1;

    //回显
    let res = await news_select_id({id:this.work_id});
    this.news_title = res.news_title;
    this.news_date = convertUTCTimeToLocalTime(res.news_date);
    let {news_content} = res;
    this.$refs.content.innerHTML =  news_content;
  },
  methods:{
  }
};
</script>

<style lang="less" scoped>
.head{
    text-align: center;
    .date{
        color:#999;
    }
}

</style>


