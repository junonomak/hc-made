<!--  -->
<template>
  <div>
    <og-bar></og-bar>
    <show-goods :goodsList="propsgoodsList" v-if="propsgoodsList.length != 0"></show-goods>
  </div>
</template>

<script>
import {getGoodsList} from '../../network/goods'

import ogBar from '../../components/common/ogBar.vue'
import ShowGoods from '../../components/common/ShowGoods.vue'

export default {
  name: 'ShowGoodsList',
  data () {
    return {
      routerName: null,
      goodsList: [],
      propsgoodsList: [],
    };
  },

  components: {
    ogBar,
    ShowGoods,
  },

  created() {
    //初始化展示数据不
    this.getGoodsList()
<<<<<<< HEAD
    
=======
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  },

  methods: {
    // 获取初始要传送的商品数据，根据帽子分类
    getGoodsList() {
      getGoodsList().then(res =>{
        this.goodsList = res.data
        this.routerName = this.$route.params.routerName
        if(this.routerName == 'allgoods'){
          this.propsgoodsList = this.goodsList
<<<<<<< HEAD

=======
          
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
        }else if(this.routerName == 'hat'){
          for(let i = 0; i<this.goodsList.length; i++){
            if(this.goodsList[i].type == 'hat'){
              this.propsgoodsList.push(this.goodsList[i])
            }
          }
        }else if(this.routerName == 'summerhat'){
          for(let i = 0; i<this.goodsList.length; i++){
            if(this.goodsList[i].type == 'summerhat'){
              this.propsgoodsList.push(this.goodsList[i])
            }
          }
        }else if(this.routerName == 'buckethat'){
          for(let i = 0; i<this.goodsList.length; i++){
            if(this.goodsList[i].type == 'buckethat'){
              this.propsgoodsList.push(this.goodsList[i])
            }
          }
        }else if(this.routerName == 'navyhat'){
          for(let i = 0; i<this.goodsList.length; i++){
            if(this.goodsList[i].type == 'navyhat'){
              this.propsgoodsList.push(this.goodsList[i])
            }
          }
        }else if(this.routerName == 'beret'){
          for(let i = 0; i<this.goodsList.length; i++){
            if(this.goodsList[i].type == 'beret'){
              this.propsgoodsList.push(this.goodsList[i])
            }
          }
        }else if(this.routerName == 'cap'){
          for(let i = 0; i<this.goodsList.length; i++){
            if(this.goodsList[i].type == 'cap'){
              this.propsgoodsList.push(this.goodsList[i])
            }
          }
        }
      })
    },
  },

}

</script>
<style scoped>

</style>