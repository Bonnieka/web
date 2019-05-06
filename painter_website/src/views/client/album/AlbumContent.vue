<template>
    <div class="center">
        <div class="photo-wrapper">
            <div class="photo-item" v-for="(item,index) in data" :key='index'>
                <div class="photo-content">
                    <img :src="item.pic_url" alt="图片"  @click="currentBigPic=index">
                </div>
                <p class="photo-desc" :title="item.pic_title">{{item.pic_title}}</p>
                <div class='big-pic' v-show='currentBigPic==index' @click='currentBigPic=-1'>
                    <img :src="item.pic_url" alt="图片未加载成功">
                </div>
            </div>
        </div>
            <div class="page-wrapper album">
                    <el-pagination
                        :background=true
                        layout="prev, pager, next"
                        :page-size="limit"
                        :total="total"
                        @current-change = 'pageChange'
                    >
                    </el-pagination>
            </div>
    </div>
</template>

<script>
import { photo_select } from 'api/photo';
export default {
    name: 'AlbumContent',
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
        // 切换分页
        async pageChange(size){
            this.currentPage = size;
            let { list } = await photo_select({limit:this.limit,currentPage:this.currentPage});
            this.data = list;
        }
    }
}
</script>

<style scoped lang="less">
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
    .photo-wrapper {
        width: 1032px;
        margin-left: -8px;
        font-size: 0;
    }
    .photo-item {
        width: 250px;
        height: 300px;
        margin-left: 8px;
        display: inline-block;
        font-size: 0;
        &>.photo-content {
            width: 220px;
            height: 220px;
            overflow: hidden;
            text-align: center;
            border: 15px solid #fff;
            &>img {
                height: 100%;
            }
        }
        &>.photo-desc {
            text-align: center;
            color: #b23e2f;
            font-size: 15px;
            width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
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