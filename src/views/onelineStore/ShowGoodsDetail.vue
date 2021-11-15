<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="showGoods">
      <!-- 商品的轮播图 -->
      <div class="goodsSwiper">
        <el-carousel indicator-position="outside" height="595px">
          <el-carousel-item v-for="item in goodsShowImg" :key="item">
            <el-image :src="item" lazy></el-image>
          </el-carousel-item>
        </el-carousel> 
      </div>
      <!-- 商品的名字和价钱 -->
      <div class="goodsInfo" v-if="goodsmessage">
        <div class="goodsInfo-Title">
          <h2 style="margin:0 0 20px 0;">{{goodsmessage.name}}</h2>
          <p style="margin:0 0 30px 0;">{{goodsmessage.price}}-含税</p>
          <hr style="height:1px;border:none;border-top:1px solid rgba(0, 0, 0, 0.1);" />
        </div>

        <div class="goodsInfostock">
          <!-- 商品的颜色单选框 -->
          <el-radio-group class="goodsInfo-Colour" text-color="white" fill="gray" v-model="radioColour" v-for="(item, index) in goodsmessage.detail.goodsInformation" @change="colourClick(item.colour)">
            <el-radio-button :label="item.colour"></el-radio-button>
          </el-radio-group>
          <!-- 商品颜色所对应的尺码单选框 -->
          <div class="goodsInfo-Size">
            <div v-for="(item, index) in goodsmessage.detail.goodsInformation">
              <el-radio-group  text-color="white" fill="gray" v-model="radioSize" v-for="(items, indexs) in item.stock" v-show="item.colour == choiceColour">
                <el-radio-button :label="items.size" :disabled="items.count==0"></el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <button class="addToShop">添加到购物车</button>

        </div>  

        <!-- 产品介绍以及尺码表等 -->
        <div class="productIntroduction">
          <p style="margin:0 0 20px 0;">{{goodsmessage.detail.introduce}}</p>
          <div v-show="goodsmessage.detail.detailsize" class="aaa">
            <p class="goodsdetailsize">{{goodsmessage.detail.detailsize}}</p>
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
import {getGoodsList} from '@/network/goods'
 
import ogBar from '../../components/common/ogBar.vue'

export default {
  name: 'ShowGoodsDetail',
  data () {
    return {
      goodsid: null,
      goodsmessage: null,
      goodsShowImg: null,
      choiceColour: null,
      radioColour: '',
      radioSize: '',
    };
  },

  components: {
    ogBar,
  },

  methods: {
    //请求商品数据并且初始化
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

      })
    },

    //选择颜色绑定数据
    colourClick(e){
      this.choiceColour = e
      this.radioSize = null
    },
    
  },

  created() {
    this.goodsid = this.$route.params.goodsid

    setTimeout(() => {
      this.getGoodsList()
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

.addToShop{
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