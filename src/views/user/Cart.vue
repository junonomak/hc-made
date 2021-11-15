<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div v-show="cartList.length == 0" class="cartnothing">
      <p>购物车暂无数据</p>
      <span @click="gotoshopping" style="margin: 20px 0 20px 10px;font-size: 15px;cursor: pointer;"><i class="el-icon-goods"></i>点击此处去购物</span>
    </div>
    <div class="cart" v-show="cartList.length != 0">
      <p style="text-align:center;font-size:30px;">Cart</p>
      <span style="float:right">单价</span>
      <span style="float:right;margin-right:28%">数量</span>
      <i class="el-icon-goods"></i>
      <hr style="margin-top:10px">

      <!-- 展示购物车数据框 -->
      <div class="showGoods" v-for="(item,index) in cargoodslist">
        <img :src="item.coverImg">
        <div class="goodsmessage">
          <p>{{item.name}}</p>
          <p>{{cartList[index].colour}} / {{cartList[index].size}}</p>
        </div>
        <div class="count">
          <el-input-number v-model="cartList[index].count" @change="countChange(index)" :min="0" :max="10" label="描述文字" size="mini"></el-input-number>
        </div>
        <div class="price">
          <p>¥{{item.price}}</p>
          <p>-含税</p>
        </div>
       </div>
       <hr>

      <!-- 提交框 -->
       <div class="uploadOrder">
        <p class="total" style="font-size: 30px">总价为:¥{{totalPrice}}</p>
        <el-button class="uploadOrderButton"  @click="uploadOrder">提交订单</el-button>
      </div>

      <!-- 选择地址框 -->
       <div class="addressselect">
          <p v-show="addressList.length == 0" style="margin: 20px 10px 20px 0">用户暂无地址信息,请到用户中心增添新地址!</p>
          <p v-show="addressList.length !== 0">请选择收货地址:</p>
        <div class="showaddresslist" v-for="(item , index) in addressList">
          <el-descriptions title="">
            <el-descriptions-item label="省份">{{item.province}}</el-descriptions-item>
            <el-descriptions-item label="城市">{{item.city}}</el-descriptions-item>
            <el-descriptions-item label="县/区">{{item.area}}</el-descriptions-item>
            <el-descriptions-item label="居住地">{{item.address}}</el-descriptions-item>
          </el-descriptions>
          <el-radio style="float:right;position:relative;bottom:28px;" v-model="addressIndexChoice" :label="index"></el-radio>
          <hr>
        </div>
       </div>


      
    </div>  
  </div>
</template>

<script>
import ogBar from '../../components/common/ogBar.vue'
import {getCart, deleteCart, changeCartCount} from '../../network/user'
import {getIdGoodsList} from '../../network/goods'
import {getAddressList} from '../../network/address'
import {addOrder} from '../../network/order'


export default {
  name: 'Cart',
  data () {
    return {
      cartList: [],
      cargoodslist:[],
      addressList:[],
      uploadOrderList: [],
      addressIndexChoice: 0,
      ifaddressnull: ''
    }
  },

  components: {
    ogBar
  },

  computed: {
    totalPrice(){
      var addprice = 0
      for(let i=0;i<this.cargoodslist.length;i++){
        addprice = addprice + (this.cargoodslist[i].price * this.cartList[i].count)
      }
      return addprice
    }
  },

// 初始化数据
  created() {
    this.getAddressList(this.$store.state.username)
    this.getCart()
  },

  mounted() {
    window.addEventListener('unload', this.saveState)
  },

  methods: {
    // 保存vuex信息,这样刷新页面就不会刷新数据
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },

    // 获取后台的用户地址信息
    getAddressList(username){
      getAddressList(username).then(res => {
        if (res.data === 'addressisnull') {
          this.addressList = []
        }else{
          this.addressList = res.data
        }
      })
    },

    // 获取用户购物车信息 
    getCart(){
      getCart(this.$store.state.username).then(res => {
        if(res.data == 'cartisnull'){
          this.cartList = []
        }else{
          this.cartList = res.data
        }
      // 获取到购物车商品信息
        for(let i=0;i<this.cartList.length;i++){
          getIdGoodsList(this.cartList[i].goodsid).then(res => {
            this.cargoodslist.push(res.data[0]) 
          })
        }
      })
    },

      // 技术框变化时候的监听删除购物车信息
    countChange(index){
      if(this.cartList[index].count === 0){
        deleteCart(this.cartList[index])
        this.$router.go(0)
      }else{
        changeCartCount(this.cartList[index])
      }
      console.log(this.cartList[index].count);
    },

    // 去购物按钮
    gotoshopping(){
      this.$router.push('/onelinestore')
    },


    // 提交订单
    uploadOrder(){
      const date = new Date();
      const seperator1 = "-";
      const seperator2 = ":";
      const month = date.getMonth() + 1<10? "0"+(date.getMonth()         + 1):date.getMonth() + 1;
      const strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      const currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate + " "  + date.getHours()  + seperator2  + date.getMinutes()
      if(this.addressIndexChoice === ''){
        alert('请选择收货地址!')
      }else{
        for(let i=0;i<this.cartList.length;i++){
          this.uploadOrderList.push({
            username: this.cartList[i].username,
            goodsid: this.cartList[i].goodsid,
            colour: this.cartList[i].colour,
            size: this.cartList[i].size,
            count: this.cartList[i].count,
            province: this.addressList[this.addressIndexChoice].province,
            city: this.addressList[this.addressIndexChoice].city,
            area: this.addressList[this.addressIndexChoice].area,
            address: this.addressList[this.addressIndexChoice].address,
            paytime: currentdate,
            trackingnumber: '未发货',
          })
          deleteCart(this.cartList[i])
        }
      }
      console.log(this.uploadOrderList);
      addOrder(this.uploadOrderList)
      
      alert("因为给钱的接口要钱,所以跳过给钱环节好吧还就那个穷的不行,提交订单是成功了已经!")
      this.$router.go(0)
    }

  },



}

</script>
<style scoped>
.cart{
  width: 55%;
  margin: 50px auto;
}

.cartnothing{
  width: 100%;
  text-align: center;
  margin-top: 50px;
}

.showGoods{
  position: relative;

}

.showGoods img {
  width: 150px;
  height: 150px;
  margin-top: 20px;
  
}

.goodsmessage{
  position: absolute;
  top: 75px;
  left: 25%;
}

.count{
  position: absolute;
  top: 75px;
  left: 60%;
}

.price{
  position: absolute;
  top: 70px;
  right: 0;
}

.showaddresslist{
  width: 500px;
  margin: 20px 0 20px 20px;
}

.addressselect{
  margin-top: 30px;
}



.uploadOrderButton{
  margin: 30px 0 0 40px;
  
} 

.uploadOrder{
  float: right;
  margin: 70px 10px 0 0;
}
</style>