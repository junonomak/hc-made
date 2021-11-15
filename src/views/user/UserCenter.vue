<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="usercenter">   



      <!-- 用户订单信息: -->
      <div class="showorderlist">
        <div>
          <p style="font-size: 30px">用户订单信息:</p>
          <p v-show="this.orderList.length == 0" style="margin: 40px 10px 20px 0">用户暂无订单信息!</p>
          <span @click="gotoshopping" v-show="this.orderList.length == 0" style="margin: 20px 0 20px 10px;font-size: 15px;cursor: pointer;"><i class="el-icon-goods"></i>点击此处去购物</span>
        </div>
        <div class="showordermessage" v-for="(item , index) in orderList">
          <img v-if="orderGoodsList.length" :src="orderGoodsList[index].coverImg">
          <el-descriptions :column="2">
            <el-descriptions-item label="下单时间">{{item.paytime}}</el-descriptions-item>
            <el-descriptions-item label="快递单号">{{item.trackingnumber}}</el-descriptions-item>
            <el-descriptions-item label="颜色/尺码/数量">{{item.colour}}/{{item.size}}/ {{item.count}}</el-descriptions-item>
            <el-descriptions-item label="收货地址">{{item.province + item.city + item.area + item.address}}</el-descriptions-item>
          </el-descriptions>
          <hr>
        </div>
      </div>




      <div class="address">
        <!-- 显示用户的地址 -->
        <p style="font-size: 30px">用户地址信息:</p>
        <!-- 展示用户地址 -->
        <p v-show="addressList.length == 0" style="margin: 20px 10px 20px 0">用户暂无地址信息!</p>
        <div class="showaddresslist" v-for="(item , index) in addressList">
          <el-descriptions>
            <el-descriptions-item label="省份">{{item.province}}</el-descriptions-item>
            <el-descriptions-item label="城市">{{item.city}}</el-descriptions-item>
            <el-descriptions-item label="县/区">{{item.area}}</el-descriptions-item>
            <el-descriptions-item label="居住地">{{item.address}}</el-descriptions-item>
          </el-descriptions>
          <el-button class="deletebtn" type="primary" icon="el-icon-delete" size="mini" @click="deleteAddress(item.province,item.city,item.area,item.address)"></el-button>
          <hr>
        </div>

        <!-- 新增用户地址 -->
        <div class="addaddress">
          <el-button type="text" @click="dialogFormVisible = true">点击此处新增地址</el-button>
          <el-dialog title="新增用户地址" :visible.sync="dialogFormVisible">
            <v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected="onSelected"></v-distpicker>
            <el-input v-model="select.address" style="width:400px;margin-top:10px" placeholder="此处输入你的详细地址"></el-input>
            <br>
            <el-button style="margin:10px 30px 0 0" @click="addaddress">上传地址</el-button>
          </el-dialog>
        </div>
      </div>

      
        <el-button @click="LoginOut">登出/Log-out</el-button>
    </div>
  </div>
</template>

<script>
import {getAddressList, addAddress , deleteAddress} from '../../network/address'
import {getOrderList} from '../../network/order'
import {getIdGoodsList} from '../../network/goods'

import ogBar from '../../components/common/ogBar.vue'
import VDistpicker from 'v-distpicker'


export default {
  name: 'UserCenter',
  data () {
    return {
      dialogFormVisible: false,
      username: '',
      select: {
        province: '广东省',
        city: '深圳市',
        area: '宝安区',
        address: '',
        username: ''
      },
      addressList: [],
      orderList: [],
      orderGoodsList:[]
    };
  },

  components: {
    ogBar,
    VDistpicker 
  },

  created() {
    this.username = this.$store.state.username
    console.log(this.username);
    this.getAddressList(this.username)
    this.getOrderList(this.username)

    setTimeout(() => {
      for(let i=0;i<this.orderList.length;i++){
        this.getIdGoodsList(this.orderList[i].goodsid)
        console.log(this.orderList[i].goodsid);
      }
    }, 50);
    
    
  },

  mounted() {
    window.addEventListener('unload', this.saveState)
  },

  methods: {
    // 将数据保存到vuex这样子刷新就不会刷新掉vuex数据
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },

    // 获取订单列表
    getOrderList(username){
      getOrderList(username).then(res => {
        this.orderList = res.data
      })
    },

    // 根据商品id获取商品数据
    getIdGoodsList(id){
      getIdGoodsList(id).then(res => {
        this.orderGoodsList.push(res.data[0])
      })
    },

    LoginOut(){
      this.$store.commit('LoginOut')
      alert('账号已登出')
      this.$router.go(0)
    },

    // 选择最后一个框框的时候传入数据到select中
    onSelected(data) {
      this.select.province = data.province.value
      this.select.city = data.city.value
      this.select.area = data.area.value
      console.log(this.select);
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

    // 添加用户地址
    addaddress(){
      this.select.username = this.$store.state.username
      addAddress(this.select)
      alert('增添地址成功')
      this.$router.go(0)
    },

    // 删除用户地址
    deleteAddress(a,b,c,d){
      const deletelist = {
        username: this.$store.state.username,
        province: a,
        city: b,
        area: c,
        address: d
      }
      console.log(deletelist);
      deleteAddress(deletelist)
      alert('已成功删除该地址')
      this.$router.go(0)
    },

    gotoshopping(){
      this.$router.push('/onelinestore')
    }

  },


}

</script>
<style scoped>
.usercenter{
  width: 70%;
  margin: 50px auto;
}

.showordermessage{
  width: 600px;
  margin-top: 50px;
}

.showordermessage img{
  width: 150px;
  height: 150px;
}

.address{
  margin: 50px 0 50px 0;
}

.showaddresslist{
  width: 500px;
  margin-top: 50px;
}

.addaddress{
  margin-top: 20px;
}

.deletebtn{
  float: right;
  position: relative;
  bottom: 35px;
}

.showorderlist{
  margin-bottom: 100px;
}

</style>