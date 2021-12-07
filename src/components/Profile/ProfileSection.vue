<!-- eslint-disable -->
<template>
  <section class="padding-100-0">
    <div class="container">
      <div class="row question-area-page justify-content-left">
        <div class="col-md-8">
          <div class="question-area-answer-banner">
            <form class="w-100 justify-content-center form-contain-home contact-page-form-send" @submit.prevent="submitUpdate">
              <!-- start form -->
              <div class="row">
                <div class="col-md-12">
                  <h5>Update Password <span>here you can update yor password.</span></h5>
                </div>
              </div>
              <div class="row" v-if="!errorPassword">
                <div class="col-md-12">
                  <p class="text-danger bg-error">Your passwords don't match</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <!-- start col -->
                  <div class="field input-field">
                    <input class="form-contain-home-input"
                           type="password"
                           v-model.trim="old_password"
                           id="old-password"
                           name="old-password"
                           required>
                    <!-- input -->
                    <span class="input-group-prepend">entre your old password</span><!-- label -->
                  </div>
                </div><!-- end col -->
              </div>
              <div class="row">
                <div class="col-md-12">
                  <!-- start col -->
                  <div class="field input-field">
                    <input class="form-contain-home-input"
                           type="password"
                           v-model.trim="new_password"
                           id="password"
                           name="password"
                           required>
                    <!-- input -->
                    <span class="input-group-prepend">entre your new password</span><!-- label -->
                  </div>
                </div><!-- end col -->
              </div>

              <div class="row">
                <div class="col-md-12">
                  <!-- start col -->
                  <div class="field input-field">
                    <input class="form-contain-home-input"
                           type="password"
                           v-model.trim="confirmPassword"
                           id="confirm-password"
                           name="confirm-password"
                           required>
                    <span class="input-group-prepend">confirm your password</span><!-- label -->
                  </div>
                </div><!-- end col -->
              </div>

              <div class="row justify-content-center">
                <button class="btn btn-warning w-25" type="submit">Update</button><!-- submit button -->
              </div>

            </form><!-- end form -->
          </div>
        </div>

        <div class="col-md-4">
          <div class="contact-other-method-box">
            <h5>Created Links <span>click here to see all your created links </span></h5>
            <button class="btn btn-primary w-50" @click="$router.push('/created-links')">Created Links</button>
          </div>

          <div class="contact-other-method-box">
            <h5>Delete Account</h5>
            <button class="btn btn-danger w-50" @click="submitDelete">Delete</button>
          </div>
        </div>

      </div>


    </div>
  </section>
</template>

<script>
import { request } from "@/api/request";

export default {
  mixins: [request],
  name: "ProfileSection",
  data() {
    return {
      new_password: '',
      confirmPassword: '',
      old_password: '',
    }
  },
  computed: {
    errorPassword() {
      return this.new_password.length && this.old_password.length && this.confirmPassword && this.new_password === this.confirmPassword
    }
  },
  methods: {
    submitDelete() {
      this.deleteUserRequest()
          .then(() => this.$router.push('/'))
          .catch((err) => console.error(err));
    },
    submitUpdate() {
      if (this.errorPassword) {
        const requestBody = {
          new_password: this.new_password,
          old_password: this.old_password
        }
        this.updatePasswordRequest(requestBody)
            .then((res) => {
              this.old_password = ''
              this.new_password = ''
              this.confirmPassword = ''
              console.log(res)
            })
            .catch((err) => console.error(err));
      }
    },
  },
}
</script>

<style scoped>

</style>
