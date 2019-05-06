<template>
  <div class="components-container">
    <!-- <div class="info"></div> -->
    
    <h3 class="title">添加新闻</h3>
    <div class="main">
        <div class="box">
                    <p>新闻封面：</p>
                    <div class="content">
                        <el-upload
                        class="upload-demo"
                        action="/api/upload/"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                        list-type="picture"
                        :limit='1'>
                        <el-button size="small" type="primary">点击上传作品图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png图片，且不超过500kb</div>
                    </el-upload>
                    </div>
                
            </div>

          <div class="box">
            <p>新闻标题：</p>
            <el-input type="text" placeholder="请输入新闻标题" v-model="title" :maxlength=30></el-input>
          </div>

          

          <div class="box">
              <p>新闻发布的日期：</p>
              <el-date-picker
                v-model="date"
                type="datetime"
                placeholder="选择日期时间"
               	>
              </el-date-picker>
          </div>
  
          <div class="editor-container">
            <p>新闻内容：</p>
            <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
            <!-- <UE :defaultMsg=defaultMsg :config=config :id=ue2 ref="ue2"></UE> -->
          </div>
           <el-button type="success" class="pull-right" @click="submit()" style="margin-bottom:30px;">提交</el-button>
    </div>
    
    
  </div>
</template>
<style scoped lang='less'>
.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
}
.editor-container {
  margin-bottom: 20px;
}
.main{
  padding-left: 40px;
  padding-bottom: 40px;
}
.box {
  width: 500px;
  margin: 10px 0 20px;
}

</style>
<script>
import UE from "components/ue/ue.vue";
import { newsAdd } from 'api/news';
import { delete_pic } from 'api/works';
import { Message } from 'element-ui'

export default {
  components: { UE },
  data() {
    return {
      fileList: [], //回显用的
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350,
      },
      ue1: "ue1", // 不同编辑器必须不同的id
      title: "", //新闻标题
      content: "", //新闻内容
      date: new Date() ,//新闻发布的日期
      pic_name:"", //新闻封面的图片的名称
      url:"" //新闻封面图的路径
    };
  },
  methods: {
    beforeUpload(file){
       let size = file.size;
       let type = file.type;
       if((size/1024)>500){
            Message.error({
                    message: "图片太大，请压缩后上传！"
            });
            return false
       }

       if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png'){
           Message.error({
                    message: "格式不正确，请上传jpg、jpeg、png格式的图片！"
            });
            return false
       }
    },    
    submit() {
      let content = this.$refs.ue.getUEContent(); // 调用子组件方法
      let plainText =  this.$refs.ue.getContentTxt(); //获得纯文本
  
      newsAdd({
        title:this.title
        ,date:this.date,
        content,plainText,
        pic_name:this.pic_name,
        url:this.url
        });
    },
    handleSuccess(data) {
        this.url = data;
        this.pic_name = data.replace('/api/static/img/','');
    },
    handleRemove() {
        //删除图片
        delete_pic({pic_name:this.pic_name});
        this.url = "";
        this.pic_name = "";
    },
  }
};
</script>



