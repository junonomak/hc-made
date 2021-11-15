<template>
  <div>
    <og-bar></og-bar>
    <h2>这里是添加商品页面</h2>
    <div class="addGoodsForm">
      <el-form ref="form" :model="form" label-width="80px" label-position="top">

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

        <!-- 输入商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- 输入商品价格 -->
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

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

        <!-- 输入搜索相关的关键词 -->
        <el-form-item label="关键词">
          <el-input type="textarea" v-model="form.searchType"></el-input>
        </el-form-item>

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

        <!-- 上传商品图片的点击按钮 -->
      
        <el-button type="text" @click="dialogFormVisible = true">点击此处上传商品图片</el-button>
        <el-dialog title="上传图片" :visible.sync="dialogFormVisible">

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
            </el-upload>
          </el-form-item>
        </el-dialog>

        <!-- 显示上传的图片 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已经上传好的图片</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>

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
      // 需要提交的表单数据
      form: {
        shelfTime: '',
        product_date: '',
        season: '',
        productYear: '',
        name: '',
        price: '',
        type: '',
        searchType: '', 
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        coverImg: 'aaa',
        coverModel: 'aaaa',
        coloarFileList: [],
        detailFileList: [],
        modelFileList: [],
        colouSizeCountList: [],
     }
    };
  },

  components: {
    ogBar
  },

  methods: {
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
    }

},

}

</script>
<style scoped>
.addGoodsForm{
  width: 50%;
  margin: 50px auto;
}

</style>