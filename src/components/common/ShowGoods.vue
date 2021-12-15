<!--  -->
<template>
  <div class="show-goods">
    <div class="head">
      <div class="head-title">{{routerName}}</div>  
      <!-- 选择商品的排列方式的下拉框 -->
      <el-select class="head-select" v-model="selectvalue" @change="btnclick" :popper-append-to-body="false">
        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
      </el-select>
    </div>
    <!-- 商品数据展示 -->
    <div class="goods-list">
      <div class="goods-list-items" v-for="(item, index) in showlist" @click="goodsClick(item)">
          <el-image :src="item.coverImg" lazy></el-image>
<<<<<<< HEAD
          <div class="maskimg"><img :src="item.coverModel"></div>
        <p>{{item.name}}</p>
        <p>¥{{item.price}}</p>
=======
          <div class="maskimg"><img :src="item.coverModelImg"></div>
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
      </div>
    </div>  
    <!-- 数据的分页按钮 -->
    <div class="block">
      <el-pagination layout="prev, pager, next" @current-change="currentChange" :current-page.sync="currentPage" @prev-click="prevClick"	@next-click="nextClick" :total="total" :page-size="16"></el-pagination>
    </div>  
    <hr/>
  </div>
</template>

<script>
export default {
  name: 'ShowGoods',
  props: {
    goodsList: []
  },
  data () {
    return {
      options: [{
          value: 'newToOld',
          label: '最新上架' 
        }, {
          value: 'oldToNew',
          label: '最晚上架'
        },
        {
          value: 'priceDown',
          label: '价格从高到低'
        },
        {
          value: 'priceUp',
          label: '价格从低到高'
        }
        ],
      routerName: null,
      selectvalue: 'newToOld',
      total: 0,
      totallist:[],
      showlist: null,
      currentIndex: 0,
      selectchoice: null,
      currentPage: 1, 
    };
  },

  methods: {
    // 商品排列方式的点击事件
    btnclick(e){
      this.selectchoice = e
      if(e == 'newToOld'){ 
<<<<<<< HEAD
        for(let i = 0; i<this.goodsList.length - 1; i++){
          for(let j = 0;j<this.goodsList.length - i - 1; j++){
            let a = this.goodsList[j].shelfTime
            let b = this.goodsList[j+1].shelfTime
            if(parseInt(a.substring(1)) < parseInt(b.substring(1))){
              let change = this.goodsList[j+1]
              this.goodsList[j+1] = this.goodsList[j]
              this.goodsList[j] = change
            }
          }
        }
      }else if(e == 'oldToNew'){
        for(let i = 0; i<this.goodsList.length - 1; i++){
          for(let j = 0;j<this.goodsList.length - i - 1; j++){
            let a = this.goodsList[j].shelfTime
            let b = this.goodsList[j+1].shelfTime
            if(parseInt(a.substring(1)) > parseInt(b.substring(1))){
              let change = this.goodsList[j+1]
              this.goodsList[j+1] = this.goodsList[j]
              this.goodsList[j] = change
            }
          }
        }
=======
        
      }else if(e == 'oldToNew'){

>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
      }else if(e == 'priceDown'){
        for(let i = 0; i<this.goodsList.length - 1; i++){
          for(let j = 0;j<this.goodsList.length - i - 1; j++){
            let a = this.goodsList[j].price
            let b = this.goodsList[j+1].price
<<<<<<< HEAD
            if(a < b){
=======
            if(parseInt(a.substring(1)) < parseInt(b.substring(1))){
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
              let change = this.goodsList[j+1]
              this.goodsList[j+1] = this.goodsList[j]
              this.goodsList[j] = change
            }
          }
        }
      }else if(e == 'priceUp'){
        for(let i = 0; i<this.goodsList.length - 1; i++){
          for(let j = 0;j<this.goodsList.length - i - 1; j++){
            let a = this.goodsList[j].price
            let b = this.goodsList[j+1].price
<<<<<<< HEAD
            if(a > b){
=======
            if(parseInt(a.substring(1)) > parseInt(b.substring(1))){
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
              let change = this.goodsList[j+1]
              this.goodsList[j+1] = this.goodsList[j]
              this.goodsList[j] = change
            }
          }
        }
      }
      //将传过来的goodlist重新排序之后，对分页重新进赋值并且刷新页面更新视图
      this.totallist = []
      for (let i = 0; i < this.goodsList.length; i += 16) {
        this.totallist.push(this.goodsList.slice(i, i + 16));
      }
      this.showlist = this.totallist[0]  
      this.reset()
    },

    // 上一页点击
    prevClick(){
      this.currentPage = this.currentPage - 1
    },
    // 下一页点击
    nextClick(){
      this.currentPage = this.currentPage + 1
    },
    // 页数改变的时候出发
    currentChange(e){
      this.currentIndex = e - 1
      this.showlist = this.totallist[this.currentIndex]
    },
    //重置页数
    reset(){
      this.currentPage = 1
    },

    // 设置点击事件传送goodsid
    goodsClick(item){
      this.$router.push("/onelinestore/goodsdetail/" + item.id);
    },

<<<<<<< HEAD
=======
    // 设置img的url
    setimgurl(){
      for(let i = 0; i<this.goodsList.length; i++){
        this.goodsList[i].coverImg = require('../../assets/' + this.goodsList[i].coverImg)
        this.goodsList[i].coverModelImg = require('../../assets/' + this.goodsList[i].coverModelImg)
      } 
    }
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  },

  created() {

    this.routerName = this.$route.params.routerName.toUpperCase()

    // 商品数据分割成16个一份
    for (let i = 0; i < this.goodsList.length; i += 16) {
      this.totallist.push(this.goodsList.slice(i, i + 16));
    }
    this.total = this.goodsList.length
    this.showlist = this.totallist[0]
<<<<<<< HEAD
=======

    // 设置img的url
    this.setimgurl()
    
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  },


}

</script>
<style scoped>
*{
  font-family: Georgia;
  font-size: 15px;
}

.head{
  margin: 50px 0 50px 14%;
}

.head-title{
  font-size: 30px;
}

.head-select{
  margin-top: 50px;
  width: 300px;
}

.head-select >>> .el-input__inner{
  border-color: black;
}

.head-select >>> .el-select-dropdown__item{
  color: black;
}

.el-select /deep/ .el-input.is-focus .el-input__inner{
  border-color: black;
}

.goods-list{
  display: flex;
  flex-wrap: wrap;
  width: 75%;
  margin: 0 auto;
  box-sizing: border-box;
}

.goods-list img{
  width: 100%;
}

.goods-list-items{
  position: relative;
  padding: 30px 0 0 30px;
  width: 25%;
  cursor: pointer;
  box-sizing: border-box;
}

.maskimg img{
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px 0 0 30px;
  opacity: 0;
  transition:all .7s;
}

.goods-list-items:hover .maskimg img{
  opacity: 1;
}

.block{
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}


</style>