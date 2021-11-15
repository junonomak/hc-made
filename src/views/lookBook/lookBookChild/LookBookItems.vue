<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <div class="lookBookDetail">
      <h2>{{showtitle}}</h2>
      <!-- lookbook图片的展示以及背景阴影和中间的icon -->
      <div class="lookBookDetailItems">
        <div v-for="item in showimg" class="items" @click="PictureBig(item)">
          <div class="itemsMask"></div>
          <el-image :src="item" lazy></el-image>
          <i class="el-icon-zoom-in"></i>
          <el-dialog :visible.sync="pic_view" append-to-body width="50%" top="3vh">
            <el-image width="100%" :src="bigPicture"></el-image>
          </el-dialog>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getlookbookList} from '../../../network/lookbook'

import ogBar from '../../../components/common/ogBar.vue'

export default {
  name: 'LookBookItems',
  data () {
    return {
      routerName: null,
      showname: null,
      showimg: null,
      showtitle: null,
      pic_view: false,
      bigPicture: null,
      lookbooklist:[],

      detailItemsImg:[]
    };
  },

  components: {
    ogBar,
  },

  methods: {
    // 图片点击变大，使用的是elementui中的dialog
    PictureBig(img) {
      this.pic_view = true
      this.bigPicture = img
    },

    // 获取lookbook数据
    getlookbookList(){
      getlookbookList().then(res =>{
        this.lookbooklist = res.data
      // 设置图片地址
        for(let i = 0; i<this.lookbooklist.length; i++){
          for(let j = 0; j<this.lookbooklist[i].detail.src.length; j++){
            this.lookbooklist[i].detail.src[j] = require('../../../assets/' + this.lookbooklist[i].detail.src[j])
          }
        }
      })
    },
  },

  created() {
    // 初始化数据
    this.getlookbookList()
    this.routerName = this.$route.params.routerName
    setTimeout(() => {
      for(let i = 0; i<this.lookbooklist.length; i++){     
        if(this.lookbooklist[i].detail.name == this.routerName){
          this.showname = this.lookbooklist[i].detail.name
          this.showimg = this.lookbooklist[i].detail.src
          this.showtitle = this.lookbooklist[i].detail.title
        }
      }
    }, 500);

   
    
  },


  mounted() {
    
  },

}

</script>
<style scoped>
*{
  font-family: Georgia;
}

h2{
  margin-left: 20%;
}

.lookBookDetail{
  position: relative;
  top: 75px;
  width: 100%;
  margin-bottom: 200px;
}

.lookBookDetailItems{
  display: flex;
  flex-wrap: wrap;
  margin-top: 75px;
  margin-left: 20%;
  width: 70%;
}

.items{
  position: relative;
  width: 20%;
  margin-right: 20px;
  margin-top: 20px;
  
}

.lookBookDetailItems >>> .el-image__inner{
  width: 100%;
  transition:all 1s;  
}

.itemsMask{
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition:all .5s;
  cursor: pointer;
  z-index: 9;
}

.el-icon-zoom-in{
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -15px 0 0 -15px;
  font-size: 30px;
  color: white;
  cursor: pointer;
}

.items:hover .el-icon-zoom-in{
  display: inline-block;
  color: white;
  z-index: 9;
}

.items:hover .itemsMask{
  background-color: rgb(0, 0, 0, .7);
  transform: scale(0.95);
}

.items:hover >>> .el-image__inner{
  transform: scale(0.95);
}

</style>