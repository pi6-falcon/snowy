<template>
  <main>
    <ProfileSection />
    <Footer />
  </main>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer";
import ProfileSection from "@/components/Profile/ProfileSection";

export default {
  name: 'Profile',
  components: {
    ProfileSection,
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
