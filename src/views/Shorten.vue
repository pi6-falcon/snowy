<template>
  <main>
    <IndexFeatures />
    <IndexShorten />
    <Footer />
  </main>
</template>

<script>
// @ is an alias to /src
import IndexFeatures from "@/components/Index/IndexFeatures";
import IndexShorten from "@/components/Index/IndexShorten";
import Footer from "@/components/Footer";

export default {
  name: 'AboutUs',
  components: {
    Footer,
    IndexShorten,
    IndexFeatures,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  mounted() {
    /* eslint-disable */
    $('.preloader').delay(200).fadeOut('slow');
  }
}
</script>
