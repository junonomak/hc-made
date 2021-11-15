<!--  -->
<template>
  <div class="home">
    <og-bar></og-bar>
    <home-video></home-video>
    <home-look-book-cover></home-look-book-cover>
  </div>
</template>

<script>
import {getGoodsList} from '../../network/goods'
import HomeChoice from './homeChild/homeChoice/HomeChoice.vue'
import ogBar from '../../components/common/ogBar.vue'

import HomeVideo from './homeChild/homeVideo/HomeVideo.vue'
import HomeLookBookCover from './homeChild/HomeLookBookCover/HomeLookBookCover.vue'

export default {
  name: 'Home',
  data () {
    return {
      aaa: null,
    };
  },

  components: {
    HomeChoice,
    ogBar,
    HomeVideo,
    HomeLookBookCover
  },

  created() {
    this.getGoodsList()
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