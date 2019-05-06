<template>
    <div class="center">
        <div class="works-detail-wrapper">
            <div class="works-detail-image">
                <div class="prev" @click="prevPic"><i class="el-icon-arrow-left"></i></div>
                <img style="max-width:720px;max-height:450px;cursor:pointer" :src="pic_url" alt="作品图片" @click="currentBigPic=true" />
                <div class="next" @click="nextPic"><i class="el-icon-arrow-right"></i></div>
            </div>
            
            <h5>《{{work_title}}》</h5>
            <p class="works-label clearfix">
                <span class="view-num">浏览{{view_count}}次</span>
                <!-- <span class="comment-num pull-right"><i class="el-icon-edit-outline"></i>217</span> -->
            </p>
            <el-input type="textarea" v-model="txt" placeholder="120个字以内" :maxlength=120 :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            <div style="text-align:right;">
                <span class="comment-btn" @click="commit">发表</span>
            </div>
            <div style="clear:both;"></div>
            <div class="works-comments">
                <div class="comment-item" v-for="(item,index) in tableData" :key="index">
                    <p class="comment-person">游客评论</p>
                    <p class="comment-date">{{convertUTCTimeToLocalTime(item.comment_date)}}</p>
                    <p class="comment-content">{{item.comment}}</p>
                </div>
                <div class="page-wrapper works">
                    <el-pagination
                        :background=true
                        layout="prev, pager, next"
                        :page-size="limit"
                        @current-change = 'pageChange'
                        :total="total"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <span class="close-modal" v-show="currentBigPic" @click="handleClose"><i class="el-icon-close"></i></span>
        <el-slider v-show="currentBigPic" :min="50" :max="500" class="work-zoom-slider" v-model="zoomValue" vertical height="300px" :show-tooltip="false"></el-slider>
        <div @mousewheel="handleWheel" class='big-pic' v-show='currentBigPic'>
            <div ref='imgContainer' @mouseup="handleUp" @mousedown="handleDown" @mousemove="handleMove" class="img-contaier" :style="{top: '50%',left: '50%'}">
                <img ref='img' draggable="false" :style="{width: $refs.img ? $refs.img.naturalWidth * zoomValue / 100 + 'px' : 'auto'}" :src="pic_url" alt="图片未加载成功">
            </div>
        </div>
    </div>
</template>

<script>
import { comment_all,comment_add } from 'api/comment';
import { work_select_id,work_select } from 'api/works';
import { convertUTCTimeToLocalTime } from 'utils/index.js' 

export default {
  name: "WorksContent",
  data() {
    return {
      lastIndex:0,  
      currentWork:0, //当前作品的在所有作品中处的位置
      allworks:[],
      tableData: [],
      work_id:0, //作品id
      limit:5,  //每页显示数量
      total:0,  //总数
      currentPage:1, //当前页,
      pic_url:'',
      view_count:0,
      work_title:'',
      currentBigPic:false,
      txt:"", //评论内容
      zoomValue: 100,
      convertUTCTimeToLocalTime:convertUTCTimeToLocalTime,
      lastY: 0,
      lastX: 0,
      isDraging: false,
    };
  },
    async mounted(){
    //获取作品id
    this.work_id = this.$route.query.id*1;


    work_select().then((res=>{
       this.allworks = res.list;
       this.lastIndex = res.count-1;
       let i = 0;
       for(let obj of this.allworks){
           if(obj.work_id == this.work_id){
               this.currentWork = i;
               break;
           }
           i++
       }
    }))

   this.showPage(this.work_id);

    
  },
  methods:{
    //回显
    async showPage(id){
         //回显
        let res = await work_select_id({id:id});
        this.pic_url = res.pic_url;
        this.work_title = res.work_title;
        this.view_count = res.view_count;

        // 首次请求数据
        let { count,list } = await comment_all({limit:this.limit,currentPage:this.currentPage,work_id:id});
        this.total = count;
        this.tableData = list;
    },
    //上一幅作品
    prevPic(){
        this.currentWork = (this.currentWork<=0)?this.lastIndex:(this.currentWork-1);
        let prevId = this.allworks[this.currentWork].work_id
        this.work_id = prevId;
        this.$router.push(`/works/detail?id=${prevId}`)
        this.showPage(prevId);
    },
    //下一副作品
    nextPic(){
        this.currentWork = (this.currentWork>=this.lastIndex)?0:(this.currentWork+1);
        let nextId = this.allworks[this.currentWork].work_id
        this.work_id = nextId;
        this.$router.push(`/works/detail?id=${nextId}`)
        this.showPage(nextId);
    },
    // 切换分页
    async pageChange(size){
      this.currentPage = size;
      let { list } = await comment_all({limit:this.limit,currentPage:this.currentPage,work_id:this.work_id});
      this.tableData = list;
    },
    commit(){
        if(!this.txt) return
        let res = comment_add({id:this.work_id,comment:this.txt}).then(res=>{
            if(res != '0'){
                this.total ++;
                this.tableData.unshift(res);
                this.txt = '';
            }
        })
    },
    handleClose() {
        this.zoomValue = 100;
        this.currentBigPic = false;
    },
    handleUp(e) {
        this.isDraging = false
        e.currentTarget.style.cursor = 'auto'
    },
    handleMove(e) {
        if (!this.isDraging) {
            return
        }

        let currentTarget = e.currentTarget
        let left = parseInt(window.getComputedStyle(currentTarget).left)
        let top = parseInt(window.getComputedStyle(currentTarget).top)
        console.log(e.clientX)
        console.log(e.clientY)
        let deltaX =  e.clientX - this.lastX
        let deltaY =  e.clientY - this.lastY
        this.$refs.imgContainer.style.left = left + deltaX + 'px'
        this.$refs.imgContainer.style.top = top + deltaY + 'px'
        this.lastX = e.clientX
        this.lastY = e.clientY
    },
    handleDown(e) {
        this.lastX = e.clientX
        this.lastY = e.clientY
        this.isDraging = true
        e.currentTarget.style.cursor = 'move'
    },
    handleWheel(e) {
        this.zoomValue += e.wheelDelta / 12

    }
  }
}
</script>

<style lang="less" scoped>
    .big-pic {
        overflow: scroll;
        &>.img-contaier {
            position: absolute;
            transform:translate(-50%,-50%);
        }
    }
    .work-zoom-slider {
        position: fixed;
        right: 20px;
        top: 20%;
        z-index: 999;
    }
    .close-modal {
        position: fixed;
        right: 25px;
        top: 10px;
        color: #f00;
        font-size: 30px;
        cursor: pointer;
        z-index: 999;
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
    h5 {
        font-size: 23px;
        text-align: left;
        color: #b23e2f;
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .works-detail-wrapper {
        width: 800px;
        margin: 0 auto;
    }
    
    .view-num,.comment-num {
        color: #666;
        margin: 10px 20px;
        display: inline-block;
    }

    .comment-text {
        border: 1px solid #999;
        color: #999;
        padding: 12px 18px;
        font-size: 20px;
    }

    .comment-person {
        color: #4c4c4c;
        font-size: 22px;
        margin-bottom: 10px;
        &::before {
            content: '';
            display: inline-block;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background-color: #999;
            position: relative;
            vertical-align: middle;
            margin-right: 5px;
            top: 10px;
        }
    }

    .comment-date {
        color: #999;
        font-size: 16px;
        margin-left: 60px;
        margin-top: -16px;
    }

    .comment-content {
        margin-left: 60px;
        color: #4c4c4c;
        font-size: 18px;
        word-break: break-all;
    }

    .page-wrapper {
        text-align: center;
        margin: 30px 0 80px;
    }
    
    .works-detail-image{
        display: flex;
        justify-content: space-around;
        white-space: nowrap;
        align-items: center;
        .next,.prev{
            cursor: pointer;
            i{
                font-size: 100px;
                color:#999;
            }
            &:hover i{
                opacity: 0.5;
            }
        }
    }
    .comment-btn{
        width: 90px;
        height: 30px;
        line-height: 30px;
        background: #b23e2f;
        color: #fff;
        display: block;
        text-align: center;
        letter-spacing: 5px;
        margin-top:20px; 
        display: inline-block;
        cursor: pointer;
    }
    
    .page-wrapper {
        text-align: center;
        margin: 30px 0 80px;
    }
</style>

<style>
    div.page-wrapper .el-pagination * {
        background-color: transparent;
    }
    div.page-wrapper .el-pager > .number.active {
        background-color: #b23e2f;
        color: #fff;
    }
</style>