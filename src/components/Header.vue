<!-- eslint-disable -->
<template>
  <!-- start header -->
  <div id="header" :style="!isIndex ? `height: auto` : `${height}`">

    <!-- start header animations -->
    <div class="header-animation">
      <div id="particles-bg"></div>
      <div class="video-bg-nuhost-header">
        <div id="video_cover"></div>
        <video autoplay muted loop><source src="assets/media/coodiv-vid.mp4" type="video/mp4"></video>
        <span class="video-bg-nuhost-header-bg"></span>
      </div>
      <span v-if="isIndex" class="moon-bg-her"></span>
      <!------- header support ring ------->
<!--      <a v-if="isIndex" class="support-header-ring" href="#"><img src="assets/img/svgs/support.svg" alt="" /> <span>GitHub</span></a>-->
      <!------- end header support ring ------->
    </div>
    <!-- end header animations -->

    <Routes />

    <div v-show="isIndex" class="header-heeadline"><!-- start main header domain search -->
      <div class="outliner-middl-ha">
        <h5><span class="blok-on-phon">Short links, big</span> <span id="typed"></span></h5><!-- main header domain search title -->
        <p>A URL shortener built with powerful tools to help you grow and protect your brand.</p><!-- main header domain search text -->
      </div>
    </div><!-- end main header domain search -->
  </div> <!-- end header -->
</template>

<script>
import Routes from "@/components/Routes";
export default {
  name: 'Header',
  components: {Routes},
  data() {
    return {
      height: 'height: auto;',
    }
  },
  computed: {
    isIndex() {
      return this.$route.name === 'Index';
    }
  },
  mounted() {
    /* eslint-disable */
    // header resize//
    const this_ = this;
    function resize()
    {
      // debugger;
      var heights = window.innerHeight;
      this_.height = this_.isIndex ? `height: ${heights}px` : `height: auto`;
      // document.getElementById("header").style.height = heights + "px";
    }
    resize();
  },
  watch: {
    isIndex() {
      /* eslint-disable */
      // header resize//
      const this_ = this;
      function resize()
      {
        // debugger;
        var heights = window.innerHeight;
        this_.height = this_.isIndex ? `height: ${heights}px` : `height: auto`;
        // document.getElementById("header").style.height = heights + "px";
      }
      resize();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
