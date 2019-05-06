<template>
  <div>
     <el-button type="deflaut" class="pull-right" @click="addPhoto">添加照片</el-button>
     <div class="pic-show">
        <div class="pic-box" v-for="(item,index) in data" :key='index' @mouseenter='handleMouseEnter(index)'  @mouseleave='handleMouseLeave'>
            <transition name="el-fade-in">
            <div class="mask" v-show="index==currentIndex">
              <div class="btn">
                <i class="el-icon-edit icon" @click="handleEdit(item.pic_id)"></i>
                <i class="el-icon-delete icon" @click="handleDelete(item.pic_id,item.pic_name,index)"></i>
              </div>
              <p class="icon" @click="currentBigPic=index">查看大图</p>
              <div class='big-pic' v-show='currentBigPic==index' @click='currentBigPic=-1'>
                <img :src="item.pic_url" alt="图片未加载成功">
              </div>
            </div>
            </transition>
            <img :src="item.pic_url" alt="图片未加载成功">
            <p class='title' :title="item.pic_title">{{item.pic_title}}</p>
        </div>
     </div>
    <el-pagination
      style="margin-top:40px;"
      class="pull-right"
      layout="prev, pager, next"
      :page-size="limit"
      @current-change = 'pageChange'
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { photo_select,delete_photo } from 'api/photo';

export default {
  async mounted(){
    document.body.addEventListener('mouseenter',()=>{
      this.currentIndex = -1;
    },false)

    // 首次请求数据
    let { count,list } = await photo_select({limit:this.limit,currentPage:this.currentPage});
    this.total = count;
    this.data = list;

  },
  data(){
    return{
      currentBigPic:-1, // 当前显示的大图
      currentIndex:-1,      // 当前指向的索引
      tableData: [], //表格数据
      limit:8,  //每页显示数量
      total:0,  //总数
      currentPage:1, //当前页,
      data:[], //相册数据
    }
  },
  methods:{
    addPhoto(){
       this.$router.push('/admin/photoAdd');
    },
    // 切换分页
    async pageChange(size){
      this.currentPage = size;
      let { list } = await photo_select({limit:this.limit,currentPage:this.currentPage});
      this.data = list;
    },
    handleMouseEnter(index){
      this.currentIndex = index; 
    },
    handleMouseLeave(){
       this.currentIndex = -1; 
    },
     // 相片编辑
    handleEdit(id){
      this.$router.push("/admin/photoEdit?id="+id);
    },
    // 相片删除
    async handleDelete(id,pic_name,index){
      // 删除后返回新数据
      let res = await delete_photo({id,pic_name});
      if(res == 1){
         this.total--;
         this.data.splice(index,1);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.pic-show{
  clear: both;
  display: flex;
  flex-wrap: wrap;
  .pic-box{
    margin:60px 20px 0px 20px;
    position: relative;
    border:1px solid #ccc;
    height: 150px;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    >img{
      display: block;
      max-width:80%;
      max-height: 80%; 
    }
    .title{
      width: 320px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: absolute;
      top:140px;
      left: 0;
      font-size: 14px;
    }
    .mask{
      position: absolute;
      z-index: 1;
      left: 0;
      top:0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, .5);
      color:#fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn{
        position: absolute;
        right:5px;
        top:5px;
      }
    }
  }
}
.icon{
  cursor: pointer;
  &:hover{
    color:#409eff;
  }
}
</style>


