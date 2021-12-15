<template>
  <div>
    <og-bar></og-bar>
    <h2>这里是添加商品页面</h2>
    <div class="addGoodsForm">
      <el-form ref="form" :model="form" label-width="80px" label-position="top">

<<<<<<< HEAD



=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 选择年份和aw/ss -->
        <el-form-item label="上架时间">
          <el-col :span="11">
            <el-date-picker type="year" placeholder="选择年份" v-model="form.product_date" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-select v-model="form.season" placeholder="请选择型录季节">
            <el-option label="a/w" value="aw"></el-option>
            <el-option label="s/s" value="ss"></el-option>
          </el-select>
        </el-form-item>

<<<<<<< HEAD



=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 输入商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

<<<<<<< HEAD



=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 输入商品价格 -->
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

<<<<<<< HEAD



=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 选择商品类型 -->
        <el-form-item label="商品类型">
          <el-select v-model="form.type" placeholder="请选择型商品类型">
            <el-option label="hat" value="hat"></el-option>
            <el-option label="summer hat" value="summerhat"></el-option>
            <el-option label="cap" value="cap"></el-option>
            <el-option label="navy hat" value="navyhat"></el-option>
            <el-option label="beret" value="beret"></el-option>
            <el-option label="buckethat" value="buckethat"></el-option>
          </el-select>
        </el-form-item>

<<<<<<< HEAD

      <!-- 输入商品信息 -->
        <el-form-item label="商品信息">
          <el-input v-model="form.message"></el-input>
        </el-form-item>

        <!-- 输入商品尺码信息 -->
        <el-form-item label="商品尺码信息,若无则不输入">
          <el-input v-model="form.detailsize"></el-input>
        </el-form-item>


=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 输入搜索相关的关键词 -->
        <el-form-item label="关键词">
          <el-input type="textarea" v-model="form.searchType"></el-input>
        </el-form-item>

<<<<<<< HEAD




=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 上传商品的尺码属性 -->
        <el-form-item label="商品的尺码颜色属性">
          <el-input placeholder="请输入添加的商品颜色" v-model="colourInput" class="input-with-select">
            <el-button slot="append" @click="colourAdd">添加</el-button>
          </el-input>
          <el-checkbox-group v-model="sizelist" @change="arrChange()">
            <el-checkbox label="free"></el-checkbox>
            <el-checkbox label="34"></el-checkbox>
            <el-checkbox label="36"></el-checkbox>
            <el-checkbox label="38"></el-checkbox>
            <el-checkbox label="40"></el-checkbox>
          </el-checkbox-group>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>请输入已输入的颜色的库存</span>
          </div>  
          <!-- 展示已经输入的尺码和库存数据 -->
            <div v-for="item in colouSizeCountList"  class="text item">
              {{item.colour}}
              <span v-for="(items , index) in item.stock" style="padding-left: 40px">
                {{items.size}}  
                <span>
                   <input v-model="items.count" type="text" style="margin-left: 10px; width: 30px; height: 30px" onkeyup="this.value=this.value.replace(/^\.+|[^\d\.]/g,'')" onblur="if(this.value !/^\d+(\.\d{1,2})?$/.test(this.value))this.value=''">
                </span>
              </span>
              <el-button style="float: right; padding: 3px 0" @click="colourItemDelete(item.colour)">删除</el-button>
            </div>
          </el-card>
        </el-form-item>
        <el-button @click="zhenghe">整合数据</el-button><br><br>

<<<<<<< HEAD







=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 上传商品图片的点击按钮 -->
      
        <el-button type="text" @click="dialogFormVisible = true">点击此处上传商品图片</el-button>
        <el-dialog title="上传图片" :visible.sync="dialogFormVisible">

<<<<<<< HEAD
          <!-- 上传封面图片 -->
          <el-form-item label="请上传商品封面图片">
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="Upload_cover"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :file-list="coverfilelist">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传1份jpg/png文件，且不超过500kb</div>
            </el-upload>
            <hr>
          </el-form-item>

          <!-- 上传封面图片 -->
          <el-form-item label="请上传模特封面图片">
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="Upload_covermodel"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :file-list="covermodelfilelist">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传1份jpg/png文件，且不超过500kb</div>
            </el-upload>
            <hr>
          </el-form-item>

          <!-- 上传商品颜色图片 -->
          <el-form-item label="请上传商品颜色图片">
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="Upload_colour"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :file-list="colourfilelist">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">最多上传10份jpg/png文件，且不超过500kb</div>
            </el-upload>
            <hr>
          </el-form-item>

          <!-- 上传商品细节图片 -->
          <el-form-item label="请上传商品细节图片">
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="Upload_detail"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :file-list="detailfilelist">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">最多上传10份jpg/png文件，且不超过500kb</div>
            </el-upload>
            <hr>
          </el-form-item>

          <!-- 上传商品模特图片 -->
          <el-form-item label="请上传商品模特图片">
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="Upload_model"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :file-list="modelfilelist">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">最多上传10份jpg/png文件，且不超过500kb</div>
=======
            <!-- 上传封面图片 -->
          <el-form-item label="请上传封面图片">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>

          <!-- 上传颜色图片 -->
          <el-form-item label="请上商品颜色图片">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.coloarFileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>

          <!-- 上传细节图片 -->
          <el-form-item label="请上商品细节图片">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.detailFileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>

          <!-- 上传模特图片 -->
          <el-form-item label="请上商品模特图片">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.modelFileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
            </el-upload>
          </el-form-item>
        </el-dialog>

<<<<<<< HEAD



=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        <!-- 显示上传的图片 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已经上传好的图片</span>
<<<<<<< HEAD
          </div>
          <div v-for="item in form.fileList" :key="item.url" class="text item"  style="height: 30px">
            <span>
              {{item.type}}
              <span style="margin: 0px 0px 10px 50px" @click="PictureBig(item.url)">点击此处查看上传好的图片</span>
            </span>
            <el-button style="float: right; padding: 3px 0" @click="picdelete(item.url)">删除</el-button>
          </div>
        </el-card>
        <el-dialog :visible.sync="pic_view" append-to-body width="50%" top="3vh">
              <el-image width="100%" :src="bigPicture"></el-image>
        </el-dialog>




=======
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977

        <!-- 创建和取消 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import {goodsInfoPost} from '../../network/goodsInfoPost'

import ogBar from '../../components/common/ogBar.vue'

<<<<<<< HEAD
// 初始化oss上传图片
const OSS = require('ali-oss');
const client = new OSS({
  accessKeyId: 'LTAI5t72PuL2U6HLkb1xoaHm',  // 查看你自己的阿里云KEY
  accessKeySecret: 'teBjaSV5w69DBAacyJqy52Vt9KRqUq', // 查看自己的阿里云KEYSECRET
  bucket: 'hcmdpic', // 你的 OSS bucket 名称
  region: 'oss-cn-shenzhen', // bucket 所在地址，我的是 华北2 北京
});

=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
export default {
  name: 'AddGoods',
  data () {
    return {
      dialogFormVisible: false,
      colouSizeCountList: [],
      sizelist: [],
      colourInput: '',
      colourList: [],
      size: '',
<<<<<<< HEAD
      pic_view: false,
      bigPicture: null,
=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
      // 需要提交的表单数据
      form: {
        shelfTime: '',
        product_date: '',
        season: '',
        productYear: '',
        name: '',
        price: '',
        type: '',
<<<<<<< HEAD
        detailsize: '',
        message: '',
        searchType: '', 
        fileList: [],
     },
      coverfilelist:[],
      covermodelfilelist:[],
      colourfilelist:[],
      detailfilelist: [],
      modelfilelist:[]
=======
        searchType: '', 
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        coverImg: 'aaa',
        coverModel: 'aaaa',
        coloarFileList: [],
        detailFileList: [],
        modelFileList: [],
        colouSizeCountList: [],
     }
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
    };
  },

  components: {
    ogBar
  },

  methods: {
<<<<<<< HEAD
    PictureBig(img) {
      this.pic_view = true
      this.bigPicture = img
    },
=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
    // 提交按钮
    onSubmit() {

      const date = new Date()
      this.form.shelfTime = date.getYear().toString() + date.getMonth().toString() + date.getDate().toString() + date.getHours().toString()
      
      let productYear = 1
      if(this.form.season == 'ss'){
        productYear = this.form.product_date.getYear() + '0'
      }else {
        productYear = this.form.product_date.getYear() + '1'
      }
      
      this.form.productYear = productYear.substring(1)

      this.form.colouSizeCountList = this.colouSizeCountList
  
      goodsInfoPost('/addgoods', this.form)

      console.log(this.form);

    },
<<<<<<< HEAD
    
=======



    // element组件的方法,暂时用不上
    submitUpload() {
        this.$refs.upload.submit();
      },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977

    // 颜色添加按钮
    colourAdd(){
      if(this.colourInput != ''){
        this.colourList.push(this.colourInput)
        this.colouSizeCountList.push({
          colour: this.colourInput,
          stock: [] 
        })
        this.colourInput = ''
        // console.log(this.goodsSizeCountList); 
        // console.log(this.colouSizeCountList);
        this.arrChange()
      }
    },

    // 颜色删除按钮
    colourItemDelete(colour){
      for(let i=0; i<this.colouSizeCountList.length; i++){
        if(this.colouSizeCountList[i].colour == colour){
          this.colouSizeCountList.splice(i , 1)
        }
      }
    },

    // 查看库存数据
    zhenghe(){
      console.log(this.colouSizeCountList);
    },

    // 监听单选框变化,若变化则根据数组长度添加数组或者删除数组,并且将数据添加进总list中
    arrChange(){
      if(this.colouSizeCountList.length != 0){
        for(let i =0; i<this.colouSizeCountList.length; i++){
          this.colouSizeCountList[i].stock = []
          for(let j=0;j<this.sizelist.length; j++){
            this.colouSizeCountList[i].stock.push({
            size: this.sizelist[j],
            count: 0
            })
          }
          // console.log(this.colouSizeCountList)
      }
      }
<<<<<<< HEAD
    },


    // element组件上传文件的方法
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
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
    // 向服务器发送数据
    // 下面五个分别是封面,封面模特,颜色,细节,模特
    async Upload_cover(options) {
      try {
        let file = options.file; // 拿到 file
        let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
        let date = new Date().getTime()
        let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
        // 上传文件,这里是上传到OSS的 uploads文件夹下
        client.put("hcmdpic/"+fileNames, file, {
            // 一定要加上请求头,不然会是直接下载图片
            headers: {
                'Content-Type': 'image/jpg'
            }
        }).then(res=>{
            if (res.res.statusCode === 200) {
                options.onSuccess(res)
                if(this.form.fileList == null){
                  this.form.fileList = [{
                  type: 'cover',
                  url: res.url
                  }]
                }else{
                  this.form.fileList.push({
                  type: 'cover',
                  url: res.url
                  })
                }
            }else {
                options.onError("上传失败")
            }
        })
      }catch (e) {
          options.onError("上传失败")
      }
    },
    async Upload_covermodel(options) {
      try {
        let file = options.file; // 拿到 file
        let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
        let date = new Date().getTime()
        let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
        // 上传文件,这里是上传到OSS的 uploads文件夹下
        client.put("hcmdpic/"+fileNames, file, {
            // 一定要加上请求头,不然会是直接下载图片
            headers: {
                'Content-Type': 'image/jpg'
            }
        }).then(res=>{
            if (res.res.statusCode === 200) {
                options.onSuccess(res)
                if(this.form.fileList == null){
                  this.form.fileList = [{
                  type: 'covermodel',
                  url: res.url
                  }]
                }else{
                  this.form.fileList.push({
                  type: 'covermodel',
                  url: res.url
                  })
                }
            }else {
                options.onError("上传失败")
            }
        })
      }catch (e) {
          options.onError("上传失败")
      }
    },
    async Upload_colour(options) {
      try {
        let file = options.file; // 拿到 file
        let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
        let date = new Date().getTime()
        let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
        // 上传文件,这里是上传到OSS的 uploads文件夹下
        client.put("hcmdpic/"+fileNames, file, {
            // 一定要加上请求头,不然会是直接下载图片
            headers: {
                'Content-Type': 'image/jpg'
            }
        }).then(res=>{
            if (res.res.statusCode === 200) {
                options.onSuccess(res)
                if(this.form.fileList == null){
                  this.form.fileList = [{
                  type: 'colour',
                  url: res.url
                  }]
                }else{
                  this.form.fileList.push({
                  type: 'colour',
                  url: res.url
                  })
                }
            }else {
                options.onError("上传失败")
            }
        })
      }catch (e) {
          options.onError("上传失败")
      }
    },
    async Upload_detail(options) {
      try {
        let file = options.file; // 拿到 file
        let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
        let date = new Date().getTime()
        let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
        // 上传文件,这里是上传到OSS的 uploads文件夹下
        client.put("hcmdpic/"+fileNames, file, {
            // 一定要加上请求头,不然会是直接下载图片
            headers: {
                'Content-Type': 'image/jpg'
            }
        }).then(res=>{
            if (res.res.statusCode === 200) {
                options.onSuccess(res)
                if(this.form.fileList == null){
                  this.form.fileList = [{
                  type: 'detail',
                  url: res.url
                  }]
                }else{
                  this.form.fileList.push({
                  type: 'detail',
                  url: res.url
                  })
                }
            }else {
                options.onError("上传失败")
            }
        })
      }catch (e) {
          options.onError("上传失败")
      }
    },
    async Upload_model(options) {
      try {
        let file = options.file; // 拿到 file
        let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
        let date = new Date().getTime()
        let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
        // 上传文件,这里是上传到OSS的 uploads文件夹下
        client.put("hcmdpic/"+fileNames, file, {
            // 一定要加上请求头,不然会是直接下载图片
            headers: {
                'Content-Type': 'image/jpg'
            }
        }).then(res=>{
            if (res.res.statusCode === 200) {
                options.onSuccess(res)
                if(this.form.fileList == null){
                  this.form.fileList = [{
                  type: 'model',
                  url: res.url
                  }]
                }else{
                  this.form.fileList.push({
                  type: 'model',
                  url: res.url
                  })
                }
            }else {
                options.onError("上传失败")
            }
        })
      }catch (e) {
          options.onError("上传失败")
      }
    },

    // 图片删除按钮
    picdelete(url){
      if(this.form.fileList != null){
        for(let i=0; i<this.form.fileList.length; i++){
        if(this.form.fileList[i].url == url){
          this.form.fileList.splice(i , 1)
        }
      }
      }
    },


},

  

=======
    }

},

>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
}

</script>
<style scoped>
.addGoodsForm{
  width: 50%;
  margin: 50px auto;
}

</style>