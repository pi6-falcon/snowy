<!-- eslint-disable -->
<template>
  <section class="homepage-domain-section padding-80-100-100"><!-- domain search homepage -->
    <div class="container">
      <div class="tittle-simple-one">
        <h5>Shorten your link</h5>
        <p style="color: #6f8ba4">Leave in blank the custom field if you want to create a Random URL</p>
      </div>
      <div class="row justify-content-center"><!-- start row -->
        <form class="form-domain-home-stwo col-md-10" @submit.prevent="shortURL" id="submit-shorten"><!-- domain search form -->
          <div class="row justify-content-left" v-if="!authenticated"><!-- start row -->
            <div class="col-md-8 input-group"><!-- col -->
              <input v-model.trim="long_url" id="long-url" type="text" class="form-control input-search-text" required><!-- name input -->
              <span class="input-group-prepend">entre your link</span>
            </div><!-- end col -->

            <div class="col-md-3 ml-auto input-group"><!-- col -->
              <button type="submit" id="submit-shorten" class="btn btn-block btn-default text-uppercase btn-domain-check">shorten</button>
            </div><!-- end col -->
          </div><!-- end row -->
          <div class="row justify-content-left" :key="authenticated" v-else><!-- start row -->
            <div class="col-md-6 input-group"><!-- col -->
              <input v-model.trim="long_url" id="long-url" type="text" class="form-control input-search-text" required><!-- name input -->
              <span class="input-group-prepend">entre your link</span>
            </div><!-- end col -->
            <div class="col-md-3 input-group"><!-- col -->
              <input v-model.trim="custom" type="text" id="custom-url" class="form-control input-search-dlt"><!-- ltd input -->
              <span class="input-group-prepend">custom (optional)</span>
            </div><!-- end col -->

            <div class="col-md-3 ml-auto input-group"><!-- col -->
              <button type="submit" class="btn btn-block btn-default text-uppercase btn-domain-check">shorten</button>
            </div><!-- end col -->
          </div><!-- end row -->
          <div class="row justify-content-left mt-5" v-if="short_url.length"><!-- start row -->
            <div class="col-md-8 input-group"><!-- col -->
              <input type="text" id="short-url" disabled class="form-control input-search-text" v-model="short_url"><!-- name input -->
            </div><!-- end col -->

            <div class="col-md-3 ml-auto input-group"><!-- col -->
              <button type="button"
                      id="btn-short-url"
                      class="btn btn-block btn-default text-uppercase btn-domain-check bg-primary">
                Copy
              </button>
            </div><!-- end col -->
          </div><!-- end row -->

        </form><!-- end domain search form -->
      </div><!-- end row -->
    </div><!-- end container -->
  </section><!-- end domain search homepage -->
</template>

<script>
import { request } from "@/api/request";
import { mapGetters } from "vuex";

export default {
  name: 'IndexShorten',
  mixins: [request],
  data() {
    return {
      long_url: '',
      short_url: '',
      custom: '',
    }
  },
  computed: {
    ...mapGetters('user', {
      authenticated: 'isAuthenticated',
    })
  },
  watch: {
    authenticated() {
      this.long_url = ''
      this.short_url = ''
      this.custom = ''
    }
  },
  methods: {
    shortURL() {
      const body = this.custom ? {
        long_url: this.long_url,
        custom_url: this.custom,
      } : {
        long_url: this.long_url,
      }
      this.createURL(body, this.custom.length, 'Your link has been Shortened!')
      .then((res) => this.short_url = res.short_url)
      .catch((err) => {
        this.short_url = ''
        console.error(err)
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
