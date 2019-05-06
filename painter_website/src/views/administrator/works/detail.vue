<template>
    <div class="detail">
        <h3>作品详情</h3>
        <div class="detail-pic">
             <img :src="pic_url" alt="">
             <p class="title ">{{work_title}}<span class="view-count">浏览量:{{view_count}}</span></p>
             
        </div>
        <hr/>
       <el-table
     empty-text="暂时无评论"
    :data="tableData"
    style="width: 100%;"
    max-height="350">
    <el-table-column
      prop="comment"
      label="评论"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          删除该评论
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block" style="margin:20px 0;">
  <el-pagination
    class="pull-right"
    layout="prev, pager, next"
    :total="total"
    :page-size="limit"
     @current-change="pageChange"
    >
  </el-pagination>
</div>
    </div>
</template>

<script>
import { comment_all,comment_delete } from 'api/comment';
import { work_select_id } from 'api/works';

export default {
  data() {
    return {
      tableData: [],
      work_id:0, //作品id
      limit:5,  //每页显示数量
      total:0,  //总数
      currentPage:1, //当前页,
      pic_url:'',
      view_count:0,
      work_title:''
    };
  },
  async mounted(){
    //获取作品id
    this.work_id = this.$route.query.id*1;

    //回显
    let res = await work_select_id({id:this.work_id});
    this.pic_url = res.pic_url;
    this.work_title = res.work_title;
    this.view_count = res.view_count;

    // 首次请求数据
    let { count,list } = await comment_all({limit:this.limit,currentPage:this.currentPage,work_id:this.work_id});
    this.total = count;
    this.tableData = list;
  },
  methods:{
      // 切换分页
    async pageChange(size){
      this.currentPage = size;
      let { list } = await comment_all({limit:this.limit,currentPage:this.currentPage,work_id:this.work_id});
      this.tableData = list;
    },
    //删除评论
    async deleteRow(index,data){
        let comment_id = data[index].comment_id;
        let res = await comment_delete({comment_id:comment_id});
        if(res == '1'){
            data.splice(index,1);
        }
        
    }
  }
};
</script>

<style lang="less" scoped>
.detail-pic {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  img {
    max-height: 300px;
    display: block;
  }
  .title {
    text-align: center;
    width: 100%;
    font-size: 18px;
    .view-count {
      font-size: 14px;
      margin-left: 20px;
      color: #999;
      font-style:italic
    }
  }
}
</style>


