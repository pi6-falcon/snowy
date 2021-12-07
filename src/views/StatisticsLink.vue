<!-- eslint-disable -->
<template>
  <main>
    <section class="padding-60-0-100">
      <div class="container">
        <div class="row">
          <div class="col-md-12 help-center-header ">
            <h5 class="help-center-title"><span>Created links</span>Here you can see where and when people are clicking your links</h5>
<!--            <p class="help-center-text"> is simply dummy text of the printing and typesetting industry. Lorem-->
<!--              Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer-->
<!--              took a galley of type and scrambled it to make a type specimen book.</p>-->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center plan-contact-support-button">
            <a href="javascript:void(0);"><i class="fas fa-calendar"></i> {{ new Date().toLocaleDateString() }}</a>
          </div>
        </div>
        <div v-if="!statistics.length" class="row justify-content-center mr-tp-80">
          <nav>
            <div class="nav our-help-center-tabs-nav" id="nav-tab" role="tablist">
              <a class="nav-item nav-link active" id="nav-first-help-categorie-tab" data-toggle="tab"
                 role="tab" aria-controls="nav-first-help-categorie"
                 aria-selected="true">
                <img src="assets/img/icons/http.png" alt="#" />
                <h5>Oops</h5>
                <p>Looks like nobody has clicked in your link yet :(</p>
              </a>
            </div>
          </nav>
        </div>
        <div v-else class="tab-help-categorie">
          <div class="row justify-content-left mt-4">
            <div id="nav-tabContent" class="col-md-12 tab-content">
              <div class="tab-pane fade show active" id="nav-first-help-categorie" role="tabpanel"
                   aria-labelledby="nav-first-help-categorie-tab">
                <span class="help-center-box-popular">Locations</span>
                <MapChart :countryData="getFilteredCountry"
                          :currency-add="false"
                          :currency-only-sign="false"
                          highColor="#008eff"
                          lowColor="#2196F3"
                          countryStrokeColor="#f1f1f1"
                          defaultCountryFillColor="#f1f1f1"
                          lang-user="pt"
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-left mt-4">
            <div class="col-md-12 tab-content">
              <chart-bar :chart-data="urlsChart" :options="optionsURL" />
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
import MapChart from 'vue-chart-map';
import { request } from "@/api/request";
import Footer from "@/components/Footer";
import ChartBar from "@/components/chart/chart-bar";

export default {
  name: 'StatisticsLink',
  mixins: [request],
  components: {
    ChartBar,
    MapChart,
    Footer,
  },
  data() {
    return {
      statistics: [],
      country: {},
      dates: [],
      filterDate: 'all dates',
      filterCountry: {},
      urlsChart: {},
      optionsURL: {}
    }
  },
  mounted() {
    /* eslint-disable */
    $('.preloader').delay(200).fadeOut('slow');
  },
  computed: {
    filteredCountryDates() {
      const filteredStatistics = this.filterDate === 'all dates' ? '' : new Date(this.filterDate).toLocaleDateString()
      return this.statistics.filter(({ date }) => date.includes(filteredStatistics))
    },
    getFilteredCountry() {
      const country = {}
      this.filteredCountryDates.forEach((click) => {
        if (country.hasOwnProperty(click.country)) {
          country[click.country] += 1;
        } else {
          country[click.country] = 1;
        }
      })
      return country
    }
  },
  created() {
    const URL = this.$route.params.short_url;
    this.getCreatedURL(URL)
        .then((res) => {
          res.forEach((click) => {
            this.dates.push(new Date(click.date).toLocaleDateString())
          });
          this.statistics = res.map((click) => {
            const countryClicks = {}
            if (countryClicks.hasOwnProperty(click.country)) {
              countryClicks[click.country] += 1;
            } else {
              countryClicks[click.country] = 1;
            }
            return {
              clicks: countryClicks[click.country],
              city: click.constructor,
              country: click.country,
              date: new Date(click.date).toLocaleDateString()
            }
          });
          console.log(res)
          console.log(this.dates)
          this.loadChart()
        })
        .catch((err) => console.error(err));
  },
  methods: {
    loadChart() {
      this.urlsChart = {
        labels: this.dates,
        datasets: [{
          // label: 'Balance',
          data: this.statistics.map(({ clicks }) => clicks),
          borderWidth: 3,
        }],
      };
      this.optionsURL = {
        legend: {
          display: false,
        },
      };
    }
  },
}
</script>
