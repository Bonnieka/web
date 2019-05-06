<template>
    <div>
        <h3>作品上传</h3>
        <div class="box">
            <div class="item">
                    <p>作品图片：</p>
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
        
            <div class="item">
                <p>作品类型：</p>
                <div class="content">
                    <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>
                
            </div>   

            <div class="item">
                <p>作品名称：</p>
                <div class="content">
                    <el-input type="text" v-model="title" placeholder="请输入作品名称" :maxlength=20></el-input>
                </div>
                
            </div>   

            <div class="item">
                <p>首页展示:</p>
                <div class="content">
                    <el-radio v-model="radio" label="0">否</el-radio>
                <el-radio v-model="radio" label="1">是</el-radio>
                </div>
            </div>  

            <div class="item">
                <p>作品浏览量:</p>
                <div class="content">
                    <el-input type="text" v-model="count" placeholder="请输入作品浏览量" @keyup.native="handleKeyup"></el-input>
                </div>
            </div>  
            
            <div class="item">
                <el-button type="success" class="pull-right" @click="submit">提交</el-button>
            </div>

        </div>
    </div>
    
</template>

<script>

import { worksAdd,delete_pic } from 'api/works';
import { Message } from 'element-ui'

export default {
  data() {
    return {
      fileList: [], //回显用的
       options: [{
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
      value: "", //下拉
      radio: "0", //单选
      count: "",
      url:"", //作品地址，
      title:"",
      pic_name:"", //图片名称
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
    submit(){
        worksAdd({
            type:this.value,
            url:this.url,
            title:this.title,
            show:this.radio,
            count:this.count,
            pic_name:this.pic_name
        })
    },
    handleKeyup(){
        this.count = this.count.replace(/^0|\D+/g,'');
    }
  },
 
};
</script>

<style lang="less" scoped>
.box {
  width: 500px;
  margin: 0 auto;
  .item {
    padding-left: 50px;
    margin-bottom: 20px;

    .content {
      padding-left: 60px;
    }
  }
}
</style>



