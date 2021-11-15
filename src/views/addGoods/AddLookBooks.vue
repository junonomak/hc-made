<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div>

      <el-input v-model="productYear" id="a" style="width: 80px"></el-input>

      <el-upload
        class="uploada"
        action="#"
        :http-request="upload"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="40"
        :on-exceed="handleExceed"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">最多上传40份jpg/png文件，且不超过500kb</div>
      </el-upload>

      <el-button @click="uploadmessage">点击上传</el-button>


    </div>
    
  </div>
</template>

<script>
import {addLookBooks} from '../../network/lookbook.js'

import ogBar from '../../components/common/ogBar.vue'

// 初始化oss上传图片
const OSS = require('ali-oss');
const client = new OSS({
  accessKeyId: 'LTAI5t72PuL2U6HLkb1xoaHm',  // 查看你自己的阿里云KEY
  accessKeySecret: 'teBjaSV5w69DBAacyJqy52Vt9KRqUq', // 查看自己的阿里云KEYSECRET
  bucket: 'hcmdpic', // 你的 OSS bucket 名称
  region: 'oss-cn-shenzhen', // bucket 所在地址，我的是 华北2 北京
});

export default {
  name: 'AddLookBooks',
  data () {
    return {
      fileList:[],
      productYear: '',
    };
  },

  components: {
    ogBar
  },

  created() {
  },

  methods: {
    // element组件上传文件的方法
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleAvatarSuccess(res){
      console.log(res) // 有兴趣的自己查看API的返回格式
      console.log('上传成功');
    },
    beforeAvatarUpload(file) { 
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    async upload(options){
      try {
        let file = options.file; // 拿到 file
        let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
        let date = new Date().getTime()
        let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
        // 上传文件,这里是上传到OSS的 uploads文件夹下
        client.put("lookbooks/"+fileNames, file, {
            // 一定要加上请求头,不然会是直接下载图片
            headers: {
                'Content-Type': 'image/jpg'
            }
        }).then(res=>{
            if (res.res.statusCode === 200) {
                options.onSuccess(res)
                if(this.fileList == null){
                  this.fileList = [{
                  name: fileNames,
                  productYear: this.productYear,
                  imgUrl: res.url
                  }]
                }else{
                  this.fileList.push({
                  name: fileNames,
                  productYear: this.productYear,
                  imgUrl: res.url
                  })
                }
              console.log(this.fileList);
            }else {
                options.onError("上传失败")
            }
        })
      }catch (e) {
          options.onError("上传失败")
      }
    },

    uploadmessage(){
    // console.log(document.getElementById(a));
      addLookBooks('/addlookbooks', this.fileList)
    }


  }
}

</script>
<style scoped>
</style>