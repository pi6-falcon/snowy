<!-- eslint-disable -->
<template>
  <!-- start main header section -->
  <div class="top-header-nav-home mb-auto" :key="authenticated">
    <div class="container">
      <nav class="navbar navbar-expand-md navbar-light header-nav-algo-coodiv header-nav-algo-coodiv-v2" :style="simpleRoute ? `margin-top: 1rem` : ``">
        <!-- start logo place -->
        <router-link class="navbar-brand" to="/">
          <img class="black-bg-logo" src="assets/img/header/logo.png" alt="" />
          <!-- black background logo -->
          <img class="white-bg-logo" src="assets/img/header/logo-b.png" alt="" />
          <!-- white background logo -->
<!--          <span>Top Hosting Provider</span>-->
        </router-link>
        <!-- end logo place -->
        <button class="navbar-toggle offcanvas-toggle menu-btn-span-bar ml-auto" data-toggle="offcanvas" data-target="#offcanvas-menu-home">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <!-- start collapse navbar -->
        <div class="collapse navbar-collapse navbar-offcanvas" id="offcanvas-menu-home">
          <!-- start navbar -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/shorten">Shorten</router-link>
            </li>

            <li class="nav-item" v-if="authenticated">
              <router-link class="nav-link" to="/created-links">Created Links</router-link>
            </li>

          </ul>
          <!-- end navbar -->

        </div>
        <!-- end collapse navbar -->

        <!-- start header account  -->
        <ul class="account-place-header-nav" v-if="!authenticated" :key="authenticated">
          <li class="nav-item dropdown">
            <a data-toggle="dropdown" aria-haspopup="true" id="customarea" aria-expanded="false" class="accouting-h dropdown-toggle" href="#"><img src="assets/img/svgs/avatar.svg" alt="" /></a>
            <div class="dropdown-menu login-drop-down-header" aria-labelledby="customarea">
              <form action="#" data-form="validate" @submit.prevent="submitAuth()" id="submit-auth">
                <div class="form-group">
                  <input type="text" v-model.trim="user.username" name="username" id="username" placeholder="Your username" class="form-control" required>
                </div>
                <div class="form-group">
                  <input type="password" v-model.trim="user.password" id="password" name="password" placeholder="Password" class="form-control" required>
                </div>
                <p class="help-block "><a class="d-none" href="#">Forgot Your Password?</a> <router-link to="/register">Sign up</router-link></p>
                <button type="submit" class="btn btn-block btn-default text-uppercase">Login</button>
              </form>
            </div>
          </li>
        </ul>
        <ul class="account-place-header-nav" v-else>
          <li class="nav-item dropdown">
            <router-link to="/profile" class="accouting-h" href="#"><img src="assets/img/svgs/avatar.svg" alt="" /></router-link>
          </li>
        </ul>
        <!-- end header account  -->
      </nav>
    </div><!-- end container -->
  </div><!-- end main header section -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { request } from "@/api/request";

export default {
  mixins: [request],
  name: 'Routes',
  props: {
    simpleRoute: {
      default: false,
      type: Boolean,
    }
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapGetters('user', {
      authenticated: 'isAuthenticated',
    })
  },
  methods: {
    ...mapActions('user', [
      'authUser',
    ]),
    submitAuth() {
      this.authUserRequest(this.user)
          .then((res) => {
            const user = {
              ...res,
              username: this.user.username,
              authenticated: true,
            }
            this.authUser(user);
          })
          .catch((err) => console.error(err));
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
