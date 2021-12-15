<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="showGoods">
      <!-- 商品的轮播图 -->
      <div class="goodsSwiper">
        <el-carousel indicator-position="outside" height="595px">
<<<<<<< HEAD
          <el-carousel-item v-for="item in goodsShowImg">
            <el-image :src="item"></el-image>
=======
          <el-carousel-item v-for="item in goodsShowImg" :key="item">
            <el-image :src="item" lazy></el-image>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
          </el-carousel-item>
        </el-carousel> 
      </div>
      <!-- 商品的名字和价钱 -->
      <div class="goodsInfo" v-if="goodsmessage">
        <div class="goodsInfo-Title">
          <h2 style="margin:0 0 20px 0;">{{goodsmessage.name}}</h2>
<<<<<<< HEAD
          <p style="margin:0 0 30px 0;">¥{{goodsmessage.price}}-含税</p>
=======
          <p style="margin:0 0 30px 0;">{{goodsmessage.price}}-含税</p>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
          <hr style="height:1px;border:none;border-top:1px solid rgba(0, 0, 0, 0.1);" />
        </div>

        <div class="goodsInfostock">
          <!-- 商品的颜色单选框 -->
<<<<<<< HEAD
          <el-radio-group class="goodsInfo-Colour" text-color="white" fill="gray" v-model="radioColour" v-for="(item, index) in goodsmessage.goodsInformation" @change="colourClick(item.colour)">
=======
          <el-radio-group class="goodsInfo-Colour" text-color="white" fill="gray" v-model="radioColour" v-for="(item, index) in goodsmessage.detail.goodsInformation" @change="colourClick(item.colour)">
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
            <el-radio-button :label="item.colour"></el-radio-button>
          </el-radio-group>
          <!-- 商品颜色所对应的尺码单选框 -->
          <div class="goodsInfo-Size">
<<<<<<< HEAD
            <div v-for="(item, index) in goodsmessage.goodsInformation">
=======
            <div v-for="(item, index) in goodsmessage.detail.goodsInformation">
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
              <el-radio-group  text-color="white" fill="gray" v-model="radioSize" v-for="(items, indexs) in item.stock" v-show="item.colour == choiceColour">
                <el-radio-button :label="items.size" :disabled="items.count==0"></el-radio-button>
              </el-radio-group>
            </div>
          </div>

<<<<<<< HEAD
          <button class="addToCart" @click="addToCart">添加到购物车</button>
=======
          <button class="addToShop">添加到购物车</button>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977

        </div>  

        <!-- 产品介绍以及尺码表等 -->
        <div class="productIntroduction">
<<<<<<< HEAD
          <p style="margin:0 0 20px 0;">{{goodsmessage.message}}</p>
          <div v-show="goodsmessage.detailsize" class="aaa">
            <p class="goodsdetailsize">{{goodsmessage.detailsize}}</p>
=======
          <p style="margin:0 0 20px 0;">{{goodsmessage.detail.introduce}}</p>
          <div v-show="goodsmessage.detail.detailsize" class="aaa">
            <p class="goodsdetailsize">{{goodsmessage.detail.detailsize}}</p>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
            <el-popover placement="top-start" title="尺码表" width="360" trigger="hover" content="通用尺码:  34/56cm 36/57cm 38/58.5cm 40/60cm">
              <el-button  class="sizechart" slot="reference">鼠标移动到此处查看尺码表</el-button>
            </el-popover>
          </div>
          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import {getIdGoodsList , getGoodsImgList, getGoodsSizeList} from '../../network/goods'
import {addCart, getCart} from '../../network/user'
=======
import {getGoodsList} from '@/network/goods'
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
 
import ogBar from '../../components/common/ogBar.vue'

export default {
  name: 'ShowGoodsDetail',
  data () {
    return {
      goodsid: null,
      goodsmessage: null,
<<<<<<< HEAD
      goodsShowImg: [],
      choiceColour: null,
      radioColour: '',
      radioSize: '',
      cartmessage: {},
      res: '',
      ishave: false,
=======
      goodsShowImg: null,
      choiceColour: null,
      radioColour: '',
      radioSize: '',
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
    };
  },

  components: {
    ogBar,
  },

  methods: {
    //请求商品数据并且初始化
<<<<<<< HEAD
    getIdGoodsList(id){
      getIdGoodsList(id).then(res =>{
        // console.log(res.data);
        this.goodsmessage = res.data[0]

        // 获取图片和尺码详情
          getGoodsImgList(this.goodsmessage.id).then(res => {
            for(let i=0;i<res.data.length;i++){
              this.goodsmessage.goodsimg.push({
              imgType: res.data[i].imgType,
              imgUrl: res.data[i].imgUrl
              })
            }
          })
          getGoodsSizeList(this.goodsmessage.id).then(res => {
            for(let i=0;i<res.data.length;i++){
              // console.log(res);
              this.goodsmessage.goodsInformation.push({
              colour: res.data[i].colour,
              stock: res.data[i].stock
              })
            }
          })
      })
    },

    getCart(username){
      getCart(username).then(res => {
        this.res = res.data
=======
    getGoodsList(){
      getGoodsList().then(res =>{
        for(let i = 0; i<res.data.length; i++){
          if(res.data[i].id == this.goodsid){
            this.goodsmessage = res.data[i]
          }
        }
        this.goodsShowImg = this.goodsmessage.detail.goodsimg
        this.choiceColour = this.goodsmessage.detail.goodsInformation[0].colour
        this.radioColour = this.goodsmessage.detail.goodsInformation[0].colour
        for(let j = 0; j<this.goodsShowImg.length; j++){
          const a = '../../assets/'
          this.goodsShowImg[j] = a + this.goodsShowImg[j]
          this.goodsShowImg[j] = require('' + this.goodsShowImg[j])
          console.log(this.goodsShowImg[j])
        }

>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
      })
    },

    //选择颜色绑定数据
    colourClick(e){
      this.choiceColour = e
      this.radioSize = null
    },
<<<<<<< HEAD

  // 添加购物车点击事件
    addToCart(){
      if(this.$store.state.isUserLogin === true){
        this.getCart(this.$store.state.username)
      }
      setTimeout(() => {
        this.cartmessage = {
          username: this.$store.state.username,
          goodsid: this.goodsid,
          colour: this.radioColour,
          size: this.radioSize
        }
        for(let i=0;i<this.res.length;i++){
          if(this.res[i].goodsid == this.cartmessage.goodsid && this.res[i].colour == this.cartmessage.colour && this.res[i].size == this.cartmessage.size){
            this.ishave = true
          }
        }
        if(this.radioColour == ''||this.radioSize == ''){
          alert('请选择商品颜色及尺码!')
        }else if(this.$store.state.isUserLogin === false){
          alert('请先登录账号!')
          this.$router.push('/login')
        }else if(this.ishave == true){
          alert('购物车中已经有此商品!')
        }else{
          // console.log(this.cartmessage);
          addCart(this.cartmessage)
          alert('添加商品成功!')
        }
      }, 50);
    }
=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
    
  },

  created() {
    this.goodsid = this.$route.params.goodsid

<<<<<<< HEAD
    this.getIdGoodsList(this.goodsid)

    setTimeout(() => {
    for(let j = 0;j< this.goodsmessage.goodsimg.length; j++){
      for(let z = 0; z <this.goodsmessage.goodsimg[j].imgUrl.length;z++){
        this.goodsShowImg.push(this.goodsmessage.goodsimg[j].imgUrl[z])
      }
    }
    this.choiceColour = this.goodsmessage.goodsInformation[0].colour
    this.radioColour = this.goodsmessage.goodsInformation[0].colour
    }, 500);
=======
    setTimeout(() => {
      this.getGoodsList()
    }, 500);
    
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  },

}

</script>
<style scoped>
*{
  font-family: Georgia;
}

.showGoods{
  position: relative;
  margin: 100px 15% 100px 15%;
}

.el-carousel{
  width: 50%;
}

.el-carousel img{
  width: 595px;
  height: 595px;
}

.el-radio-button{
  margin-right: 15px;
}

.goodsInfo{
  position: absolute;
  width: 45%;
  top: 0;
  right: 0;
}

.goodsInfostock{
  position: relative;
  margin-top: 30px;
}

.goodsInfo-Colour{
  margin-top: 10px;
}

.goodsInfo-Size{
  margin: 20px 0 20px 0;
}

<<<<<<< HEAD
.addToCart{
=======
.addToShop{
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  width: 100%;
  height: 50px;
  font-size: 20px;
  color: aliceblue;
  line-height: 50px;
  background-color: black;
  border: 0;
  cursor: pointer;
}

.productIntroduction{
  overflow: hidden;
  margin: 50px 0 30px 0;
  text-indent: 30px;
}

.goodsInfostock >>> .el-radio-button__inner:hover{
  color: black;
}

.goodsdetailsize{
  float: left;
}
.sizechart{
  float: right;
  margin-top: -11px;
}

.aaa{
  overflow: hidden;
}

.productIntroduction >>> .el-button, .el-button:focus{
  color: gray;
  border-color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
}
</style>