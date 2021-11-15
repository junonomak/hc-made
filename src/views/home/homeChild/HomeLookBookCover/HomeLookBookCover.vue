<!--  -->
<template>
  <div class="LookBookCoverimg">
    <img src="../../../../assets/image/vintage/21sscover.jpg" alt="">
    <div :class="{lookbookmask : isShowMask}"></div>
    <div class="lookbooktitle">
      <h2>2021 AUTUMN & WINTER</h2>
      <h2>IS COMING</h2>
    </div>
    <div class="lookbookbutton">
      <a href="lookbook">LOOKBOOK</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLookBook',
  data () {
    return {
      isShowMask: false
    };
  },

  methods: {
    ScrollOfTop(){
      let scrollTop = window.pageYOffset ;
      if(scrollTop > 1000){
      this.isShowMask = true
      console.log(scrollTop);
    }
    }
  },

  mounted() {
    window.addEventListener("scroll",this.ScrollOfTop);
  },

}

</script>
<style scoped>
*{
  font-family: Georgia;
}

.LookBookCoverimg{
  position: relative;
  text-align: center;
  width: 100%;
  height: 750px;
  margin: 150px 0 150px 0;
  
}

.lookbookmask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: backgroundblacker 3s;
  animation-fill-mode:forwards
}

.LookBookCoverimg img{
  height: 750px;
  width: 100%;
  object-fit:fill;
}

.lookbooktitle{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 30px;
  font-size: 12px;
  color: white;
  margin-top: -30px;
  margin-left: -150px;
}


.lookbookbutton a{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 30px;
  margin-left: -70px;
  width: 140px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: white;
  border-style: solid;
  border-width: 2px;
  border-color: white;
  transition:all 0.3s;
}

.lookbookbutton:hover a{
  color: black;
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.2);
}

@keyframes backgroundblacker {
  from{background-color: rgba(0, 0, 0, 0);}
  to{
      background-color: rgba(0, 0, 0, .6);
    }
}

</style>