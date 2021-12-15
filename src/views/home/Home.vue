<!--  -->
<template>
  <div class="home">
    <og-bar></og-bar>
    <home-video></home-video>
<<<<<<< HEAD
=======
    <home-look-book-cover></home-look-book-cover>
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  </div>
</template>

<script>
import {getGoodsList} from '../../network/goods'
<<<<<<< HEAD
import ogBar from '../../components/common/ogBar.vue'

import HomeVideo from './homeChild/homeVideo/HomeVideo.vue'
=======
import HomeChoice from './homeChild/homeChoice/HomeChoice.vue'
import ogBar from '../../components/common/ogBar.vue'

import HomeVideo from './homeChild/homeVideo/HomeVideo.vue'
import HomeLookBookCover from './homeChild/HomeLookBookCover/HomeLookBookCover.vue'
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977

export default {
  name: 'Home',
  data () {
    return {
      aaa: null,
    };
  },

  components: {
<<<<<<< HEAD
    ogBar,
    HomeVideo,
  },

  created() {
    // this.getGoodsList()

=======
    HomeChoice,
    ogBar,
    HomeVideo,
    HomeLookBookCover
  },

  created() {
    this.getGoodsList()
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
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