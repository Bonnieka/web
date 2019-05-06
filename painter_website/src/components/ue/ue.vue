<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
        html:'',
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", function () {

        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
        _this.editor.execCommand('insertHtml', _this.html); //用于回显
       
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      //获取存文本
      getContentTxt(){
         return this.editor.getContentTxt()
      },
      // 插入给定的内容
      insertHtml(html){
        this.html = html;
        this.editor.execCommand('insertHtml', html); //用于回显
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
