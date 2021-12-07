<template>
  <main>
    <NotFoundSection />
    <Footer />
  </main>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer";
import NotFoundSection from "@/components/NotFound/NotFoundSection";

export default {
  name: 'NotFound',
  components: {
    NotFoundSection,
    Footer,
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
