<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="showGoods">
      <!-- 商品的轮播图 -->
      <div class="goodsSwiper">
        <el-carousel indicator-position="outside" height="595px">
          <el-carousel-item v-for="item in goodsShowImg">
            <el-image :src="item"></el-image>
          </el-carousel-item>
        </el-carousel> 
      </div>
      <!-- 商品的名字和价钱 -->
      <div class="goodsInfo" v-if="goodsmessage">
        <div class="goodsInfo-Title">
          <h2 style="margin:0 0 20px 0;">{{goodsmessage.name}}</h2>
          <p style="margin:0 0 30px 0;">¥{{goodsmessage.price}}-含税</p>
          <hr style="height:1px;border:none;border-top:1px solid rgba(0, 0, 0, 0.1);" />
        </div>

        <div class="goodsInfostock">
          <!-- 商品的颜色单选框 -->
          <el-radio-group class="goodsInfo-Colour" text-color="white" fill="gray" v-model="radioColour" v-for="(item, index) in goodsmessage.goodsInformation" @change="colourClick(item.colour)">
            <el-radio-button :label="item.colour"></el-radio-button>
          </el-radio-group>
          <!-- 商品颜色所对应的尺码单选框 -->
          <div class="goodsInfo-Size">
            <div v-for="(item, index) in goodsmessage.goodsInformation">
              <el-radio-group  text-color="white" fill="gray" v-model="radioSize" v-for="(items, indexs) in item.stock" v-show="item.colour == choiceColour">
                <el-radio-button :label="items.size" :disabled="items.count==0"></el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <button class="addToCart" @click="addToCart">添加到购物车</button>

        </div>  

        <!-- 产品介绍以及尺码表等 -->
        <div class="productIntroduction">
          <p style="margin:0 0 20px 0;">{{goodsmessage.message}}</p>
          <div v-show="goodsmessage.detailsize" class="aaa">
            <p class="goodsdetailsize">{{goodsmessage.detailsize}}</p>
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
import {getIdGoodsList , getGoodsImgList, getGoodsSizeList} from '../../network/goods'
import {addCart, getCart} from '../../network/user'
 
import ogBar from '../../components/common/ogBar.vue'

export default {
  name: 'ShowGoodsDetail',
  data () {
    return {
      goodsid: null,
      goodsmessage: null,
      goodsShowImg: [],
      choiceColour: null,
      radioColour: '',
      radioSize: '',
      cartmessage: {},
      res: '',
      ishave: false,
    };
  },

  components: {
    ogBar,
  },

  methods: {
    //请求商品数据并且初始化
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
      })
    },

    //选择颜色绑定数据
    colourClick(e){
      this.choiceColour = e
      this.radioSize = null
    },

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
    
  },

  created() {
    this.goodsid = this.$route.params.goodsid

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

.addToCart{
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