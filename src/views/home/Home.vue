<!--  -->
<template>
  <div class="home">
    <og-bar></og-bar>
    <home-video></home-video>
  </div>
</template>

<script>
import {getGoodsList} from '../../network/goods'
import ogBar from '../../components/common/ogBar.vue'

import HomeVideo from './homeChild/homeVideo/HomeVideo.vue'

export default {
  name: 'Home',
  data () {
    return {
      aaa: null,
    };
  },

  components: {
    ogBar,
    HomeVideo,
  },

  created() {
    // this.getGoodsList()

  },

  methods: {
    getGoodsList() {
      getGoodsList().then(res =>{
      })
    },

  },
}

</script>
<style scoped>
</style>