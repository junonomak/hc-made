<!--  -->
<template>
  <div class="videobox">
    <video src="http://hcmdpic.oss-cn-shenzhen.aliyuncs.com/hcmdvideo/hwdog.mp4" autoplay muted loop></video>
    <div class="videotitle">
      <h2>Using traditional</h2>
      <h2>Chinese craftsmanship,</h2>
      <h2>We produce premium</h2>
      <h2>quality headwear based</h2>
      <h2>n classic United States 1920’s</h2>
      <h2>vintage styles.</h2>
      <h2>We add our unique flavour of</h2>
      <h2>the “gentleman” and “playfulness”</h2>
      <h2>into our collection.</h2>
    </div>
    <div class="videobutton">
      <a href="onelinestore/allgoods">ONLINE STORE</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeVideo',
  data () {
    return {
    
    };
  },

}

</script>
<style scoped>
*{
  font-family: Georgia;
}

.videobox{
  position: relative;
  text-align: center;
  height: 750px;
  width: 100%;
  margin-bottom: 100px;
}

.videobox video{
  height: 100%;
  width: 100%;
  object-fit:fill;
  /* object-fit: cover;
  -webkit-object-fit: cover;
  -ms-object-fit: cover; */
}

.videotitle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 550px;
  height: 350px;
  margin-top: -260px;
  margin-left: -275px;
  font-size: 26px;
  font-weight:normal;
  color: white;

}

h2{
  font-weight:normal;
}


.videobutton a{
  position: absolute;
  bottom: 110px;
  left: 50%;
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

.videobutton:hover a{
  color: black;
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.2);
}
</style>