<template>
  <div class="clearfix">
    作品类型：
     <el-select v-model="type" placeholder="请选择"  @change="handleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
         >
        </el-option>
     </el-select>
    <el-button type="deflaut" class="pull-right" @click="addWork">添加作品</el-button>
     <el-table
      :data="tableData"
      style="width: 100%;margin-top:30px;border:2px solid #ccc;">
      <el-table-column
        prop="work_title"
        label="名称"
       >
      </el-table-column>
      <el-table-column
         prop="pic_url"
         label="图片"
      >
       <template slot-scope="scope">
          <img :src="scope.row.pic_url" alt="图片未加载成功" height="40px" >
       </template>
      </el-table-column>
      <el-table-column
        prop="view_count"
        label="浏览量"
        >
      </el-table-column>
      <el-table-column
        prop="work_type"
        label="作品类型">
      </el-table-column>
      <el-table-column
        prop="home_show"
        label="首页展示">
        <template slot-scope="scope">
          <span>{{(scope.row.home_show=='1')?'是':'否'}}</span>
       </template>
      </el-table-column>
      <el-table-column
        width="250"
        prop="handle"
        label="操作"
        type="index"
        :index="index"
      >
        <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.work_id,scope.row.pic_name,scope.$index)">删除</el-button>
            <el-button type="info" size="mini" @click="handleEdit(scope.row.work_id)">编辑</el-button>
            <el-button type="success" size="mini" @click="handleDetail(scope.row.work_id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    style="margin-top:20px;"
    class="pull-right"
    layout="prev, pager, next"
    :page-size="limit"
    @current-change = 'pageChange'
    :total="total">
  </el-pagination>
  </div>
   
  </template>

  <script>
import { work_select,delete_work } from 'api/works';
import { comment_delete_all } from 'api/comment';

export default {
  async mounted(){
    // 首次请求数据
    let { count,list } = await work_select({limit:this.limit,currentPage:this.currentPage});
    this.total = count;
    this.tableData = list;
  },
  methods:{
    addWork(){
       this.$router.push('/admin/worksAdd');
    },
    // 切换分页
    async pageChange(size){
      this.currentPage = size;
      let { list } = await work_select({limit:this.limit,currentPage:this.currentPage});
      this.tableData = list;
    },
    // 作品编辑
    handleEdit(id){
      this.$router.push("/admin/worksEdit?id="+id);
    },
    // 作品删除
    async handleDelete(id,pic_name,index){
      // 删除后返回新数据
      let res = await delete_work({id,pic_name});
      if(res == 1){
         this.total--;
         this.tableData.splice(index,1);
         //删除作品并删除相关所有评论
         comment_delete_all({work_id:id});
      }
    },
    //查看作品详情
    handleDetail(id){
       this.$router.push("/admin/worksDetail?id="+id);
    },
    //选择查看的作品类型
    async handleChange(){
      let { count,list } = await work_select({limit:this.limit,currentPage:this.currentPage,type:this.type});
      this.total = count;
      this.tableData = list;
    }
  },
  data() {
    return {
      index:0,//表格索引
      tableData: [], //表格数据
      limit:5,  //每页显示数量
      total:0,  //总数
      currentPage:1, //当前页,
      options: [{     //下拉选项
        value: '全部',
        label: '全部'
      }, {
        value: '创作',
        label: '创作'
      }, {
          value: "临摹对比",
          label: "临摹对比"
        },
        {
          value: "长江三峡",
          label: "长江三峡"
        }],
        type: '全部'
    };
  }
};
</script>