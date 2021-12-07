<!-- eslint-disable -->
<template>
  <section class="section p-0">
    <div class="d-flex flex-wrap align-items-stretch mt-0">
      <div class="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white">
        <div class="p-4 m-3">
          <router-link to="/">
            <img src="assets/img/header/logo-b.png" alt="logo" class="img-fluid mb-5 mt-2">
          </router-link>
          <h4 class="text-dark font-weight-normal">
            Welcome to <span class="font-weight-bold">Snowy Owl</span>
          </h4>
          <p class="text-muted">Sign up and start shortening!</p>
          <form autocomplete="off" name="login" @submit.prevent="createUser()" id="submit-register">
            <div class="form-group">
              <label for="password">Username</label>
              <input type="text" name="username" id="username" v-model.trim="user.username" placeholder="Your Username" class="form-control" required autofocus="">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" v-model.trim="user.password" class="form-control" name="password" placeholder="Your Password"
                     autocomplete="password" required>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-block btn-primary btn-login">
                Sign Up
              </button>
            </div>
          </form>
          <div class="mt-5 text-muted text-center">
            Already have an account? <router-link to="/">Log In</router-link>
          </div>
          <div class="text-center mt-5 text-small">
            Copyright © Snowy Owl. Made with 💙 by Pedro and Rafa
          </div>
        </div>
      </div>
      <div :class="cssClass" :style="{backgroundImage: `url(assets/img/header/background-login.jpg`}"></div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { request } from "@/api/request";

export default {
  name: 'Login',
  mixins: [request],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      cssClass: 'col-lg-8 col-12 order-2 min-vh-100 background-walk-y position-relative overlay-gradient-bottom',
      user: {
        username: '',
        password: '',
      },
    }
  },
  mounted() {
    /* eslint-disable */
    $('.preloader').delay(200).fadeOut('slow');
  },
  methods: {
    createUser() {
      this.createUserRequest(this.user, 'BlaBlaBla!')
          .then((res) => console.log(res));
    },
  }
}
</script>

<style scoped lang="scss">
@mixin background_walk($animation-name: backgroundWalkY, $s: 70s) {
  background-repeat: no-repeat;
  background-position: 0 0;
  animation-name: $animation-name;
  animation-duration: $s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@mixin overlay($z-index: 99, $background-color: rgba(255, 255, 255, 0.5), $background-image: false) {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $background-color;
  @if $background-image != false {
    background-image: $background-image;
  }
  z-index: $z-index;
}

.overlay-gradient-bottom {
  &:after {
    @include overlay(1, false, linear-gradient(to bottom, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.65) 100%));
  }
}

.btn-block {
  display: block !important;
  width: 100% !important;
}

.absolute-bottom-left {
  position: absolute;
  left: 0;
  bottom: 0;
}

.background-walk-y {
  @include background_walk;
  background-size: 100%;
}

@keyframes backgroundWalkY {
  0% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 100%;
  }
}

p.text-muted {
  line-height: 28px;
  font-size: 14px;
}

form .form-group .form-control {
  border: 0;
  border-bottom: 1px solid #ebf0f3;
  border-radius: 0;
  font-weight: 100;
  text-transform: lowercase;
  font-size: 15px;
  letter-spacing: 0.5px;
}

.form-control:focus {
  box-shadow: none !important;
  outline: none;
  border-bottom: 1px solid #083Ba3 !important;
}

.btn-login {
  background-color: #083Ba3;
  font-size: 12px;
  padding: .55rem 1.5rem;
  border-color: #083Ba3;
}

</style>
