<!--  -->
<template>
  <div class="og-bar">
    <!-- 导航栏左侧的图片 -->
    <div class="bar-left"><img src="../../assets/image/logo.png"></div>

    <!-- 导航栏中间的文字 -->
    <div class="bar-middle">
      <div v-for="item in itemlist" class="aposition">
        <div @click="barClick(item)" class="baritem"><div :class="{havelist : item.itemDetail != null}">{{item.itemName}}</div></div>
        <!-- 如果有detaillist的就展示 -->
        <div class="bar-detaillist" v-show="item.itemDetail != null">
          <div v-for="(items, index) in item.itemDetail" class="divheight" @click="barDetailListClick(item ,index)">{{items}}</div>
        </div>
      </div>
    </div>
    <!-- 右侧三个icon -->
    <div class="bar-right">
      <el-button @click="UserCenterClick" type="primary" icon="el-icon-user"></el-button>
      <el-button @click="drawer = true" type="primary"  icon="el-icon-search"></el-button>
      <el-button @click="cartClick" type="primary" icon="el-icon-shopping-cart-2"></el-button>
    </div>
    <!-- 搜索框elementui中的drawer做的 -->
    <el-drawer title="SEARCH HAT WHAT YOU WANT" :visible.sync="drawer" direction="ttb">
      <el-input class="searchbar" v-model="searchBarInfo" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
    </el-drawer>
  </div>
</template> 

<script>
export default {
  name: 'ogBar',
  data () {
    return {
      drawer: false,
      searchBarInfo: null,

      itemlist:[
        {
          itemName: 'HOME',
          itemDetail: null,
          ahref:{
            aName: 'home',
            aDetail: null
          },
        },
        {
          itemName: 'ONLINESTORE',
          itemDetail: ['ALL GOODS', 'HAT', 'SUMMER HAT', 'NAVY HAT' ,'BERET', 'BUCKET HAT', 'CAP'],
          ahref:{
            aName: 'onelinestore',
            aDetail: ['allgoods', 'hat', 'summerhat' ,'navyhat', 'beret','buckethat' ,'cap']
          },
        },
        {
          itemName: 'LOOKBOOK',
          itemDetail: ['21 A/W', '21 S/S', '20 A/W', '20 S/S'],
          ahref:{
            aName: 'lookbook',
            aDetail: ['211', '210', '201', '200']
          },
        }
      ],
    };
  },

  methods: {
    // 路由跳转
    barDetailListClick(item ,  index) {
      const src1 = item.ahref.aName 
      const src2 = item.ahref.aDetail[index]
      this.$router.push('/' + src1 + '/' + src2);
      setTimeout(() => {
        location. reload()
      }, 20);
    },

    // detaillist路由跳转
    barClick(item) {
      const src1 = item.ahref.aName 
      if(item.ahref.aDetail){
        const src2 = item.ahref.aDetail[0]
        this.$router.push('/' + src1 + '/' + src2);
      }else{
        this.$router.push('/' + src1);
      }
    },

    // 用户图片跳转
    UserCenterClick(){
      this.$router.push('/usercenter')
    },

    cartClick(){
      this.$router.push('/cart')
    }


  },

  created() {
    // console.log(this.itemlist);
  },
}

</script>
<style scoped>
*{
  font-family: Georgia;
}
.og-bar{
  display: flex;
  width: 100%;
  height: 155px;
  padding: 22px 0 20px 0;
  box-sizing: border-box;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: rgba(7, 0, 0, 0.2);
}

.bar-left{
  padding-left: 12.5%;
}

.og-bar img{
  width: 126px;
  height: 87px;
  transform: translate(10px,10px);
  margin-right: 30px;
}

.bar-middle {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.baritem{
  font-size: 17px;
  margin-left: 20px;
  cursor: pointer;
}


.bar-right {
  display: flex;
  height: 87px;
  width: 200px;
  margin-right: 12.5%;
}

.bar-right>.el-button{
  margin-top: 28px;
  margin-right: 10px;
  font-size: 28px;
  color: black;
  background-color:transparent;
  border: 0px;
  width: 28px;
  height: 28px;
  line-height: 28px;
}

.aposition{
  position: relative;
  height: 40px;
  line-height: 40px;
}

.bar-detaillist{
  position: absolute;
  display: none;
  top: 30px;
  left: 15px;
  padding: 20px 30px 0px 10px;
  background-color: white;
  border: 0px solid black;
  box-shadow: 0px 0px 20px black;
  z-index: 10;
  animation: fade-in;/*动画名称*/  
  animation-duration: .5s;/*动画持续时间*/
  animation-fill-mode:forwards
}

.divheight{
  width: 140px;
  height: 40px;
  line-height: 30px;
  font-size: 15px;
  cursor: pointer;
  transition:all 0.2s;
}

.divheight:hover{
  transform:translateX(5px);
}

.aposition:hover .bar-detaillist{
  display: block;
  display: flex;
  flex-flow: column;
}

.bar-detaillist:hover{
  display: block;
}

.havelist{
  /* color: rgba(0, 0, 0, 1); */
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, .1);
  height: 30px;
}

.el-input{
  width: 80%;
  margin: 30px 0 0 10%;
  font-size: 35px;
  color: black;
  height: 60px;
}

.searchbar >>> .el-input__inner{
  border: 0px;
  margin-left: 35px;
}


@keyframes fade-in {  
    0% {opacity: 0;}/*初始状态 透明度为0*/   
    100% {
      opacity: 1;
      transform:translate(0, 10px);
    }
}




</style>