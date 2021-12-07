<!-- eslint-disable -->
<template>
  <main>
    <section class="padding-60-0-100">
      <div class="container">
        <div class="row">
          <div class="col-md-12 help-center-header ">
            <h5 class="help-center-title"><span>Created links</span>Here you can see all links you have created</h5>
<!--            <p class="help-center-text"> is simply dummy text of the printing and typesetting industry. Lorem-->
<!--              Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer-->
<!--              took a galley of type and scrambled it to make a type specimen book.</p>-->
          </div>
        </div>

        <div class="tab-help-categorie">
          <div class="row justify-content-left mt-4">
            <div class="col-md-12">
              <div class="coodiv-serchform" id="searchform" role="search">
                <div class="input-group">
                  <input class="field form-control" id="s" name="s" v-model="searchURL" type="text" placeholder="Search …">
                  <button type="submit" id="searchsubmit"><i class="fa fa-search" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
            <div id="nav-tabContent" class="col-md-12 tab-content">
              <div class="tab-pane fade show active" id="nav-first-help-categorie" role="tabpanel"
                   aria-labelledby="nav-first-help-categorie-tab" v-for="(url, i) in availableSorted">
                <span class="help-center-box-popular" v-if="i === 0">Created links</span>
                <LinkPreview  :long_url="url.long_url" :short_url="url.short_url" :type="url.type" :index="i" @clicked="deleteURL" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
// @ is an alias to /src
import { request } from "@/api/request";
import Footer from "@/components/Footer";
import LinkPreview from "@/components/Links/LinkPreview";

export default {
  name: 'CreatedLinks',
  mixins: [request],
  components: {
    LinkPreview,
    Footer,
  },
  data() {
    return {
      urls: [],
      searchURL: '',
    }
  },
  computed: {
    availableSorted() {
      const search = ['long_url', 'short_url']
      const label = 'long_url'
      const filter = new RegExp(this.searchURL, 'i');
      const clone = this.urls;
      if (clone.length !== 0) {
        return clone.filter(((item) => search.some((key) => item[key].match(filter)))).slice().sort((a, b) => (a[label] > b[label] ? 1 : -1));
      }
      return clone;
    },
  },
  mounted() {
    /* eslint-disable */
    $('.preloader').delay(200).fadeOut('slow');
  },
  created() {
    this.getCreatedURL()
        .then((res) => {
          this.urls = res;
          console.log(res)
        })
        .catch((err) => console.error(err));
  },
  methods: {
    deleteURL(url, index) {
      console.log(url)
      this.deleteURLRequest(url)
          .then(() => {
            console.log(this.urls)
            this.removeFromURLs(index)
          })
          .catch((err) => console.error(err));
    },
    removeFromURLs(index) {
      // const index = this.urls.indexOf(url);
      if (index > -1) {
        this.urls.splice(index, 1);
      }
    },
  },
}
</script>
