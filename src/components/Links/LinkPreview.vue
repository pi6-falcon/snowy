<!-- eslint-disable -->
<template>
  <div class="help-center-box-item">
    <!-- start the help center box  -->
    <div class="help-center-box-icon" v-if="link.image">
      <!-- start the help center icon  -->
      <img class="img-fluid" :src="link.image" :alt="link.title">
    </div><!-- end the help center icon  -->

    <div class="help-center-box-text">
      <span v-if="link.title">{{ link.title }} - </span><!-- help center item title  -->
      <span v-if="link.description">{{ link.description }}</span>
      <span>{{ long_url }} • <a :href="`${redirect}/${short_url}`">{{ `${redirect}/${short_url}` }}</a></span>
      <!-- help center item sub title  -->
    </div>
    <router-link class="help-center-box-link" :to="`/created-links/statistics/${short_url}`">
      <i class="fas fa-angle-right"></i>
    </router-link><!-- help center item link  -->
    <a class="help-center-box-link right-100" href="javascript:void(0);" @click="$emit('clicked', short_url, index)">
      <i class="fas fa-trash"></i>
    </a><!-- help center item link  -->
  </div><!-- end the help center box  -->
</template>

<script>
import { request } from "@/api/request";

export default {
  props: {
    short_url: {
      type: String,
      required: true
    },
    long_url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  mixins: [request],
  name: "LinkPreview",
  data() {
    return {
      link: {
        description: '',
        image: '',
        title: '',
        url: '',
      },
      redirect: 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com',
    }
  },
  async created() {
    // this.getLinkPreviewRequest(this.long_url)
    //     .then((res) => {
    //       this.link.description = res.description;
    //       this.link.image = res.image;
    //       this.link.title = res.title;
    //       this.link.url = res.url;
    //     })
    //     .catch((err) => console.error(err));
  }
}
</script>

<style scoped>

</style>
