<notes>
    Only handles logging in, new accounts must be created manually for now or by temporarily switching the firebase method in auth.module login action to sign up.
    Contact kevin.jossendal@revunit.com if help is needed creating a new user or password resetting
    Fetching of the events for classification is tied to login, which may not be ideal but there is no other
    ui to be able to fetch events currently
</notes>
<template>
  <v-layout align-center justify-center fill-height>
    <!-- login form -->
    <v-flex xs6 px-5 class="container-form">
      <v-layout
        row
        wrap
        align-center
        fill-height
        :class="$vuetify.breakpoint.smAndUp ? 'justify-start' : 'justify-center'"
      >
        <v-flex xs12>
          <v-layout justify-center>
            <div class="red-border">
              <span class="welcome">WELCOME</span>
            </div>
          </v-layout>
        </v-flex>
        <v-flex sm10 offset-xs1>
          <v-card flat color="secondaryDark">
            <v-card-text class="py-0">
              <v-form class="app-form">
                <label for="employeeEmail" class="app-form-label">COMPANY EMAIL ADDRESS</label>
                <input
                  v-test-ref="'employee-email'"
                  name="employeeEmail"
                  v-model="employeeEmail"
                  placeholder="admin@email.com"
                  type="text"
                />
                <label for="password" class="app-form-label">COMPANY EMAIL ADDRESS</label>
                <input
                  @keyup.enter="login()"
                  v-test-ref="'password'"
                  name="password"
                  v-model="password"
                  placeholder="password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="px-3 text-xs-center">
              <v-layout wrap align-center justify-space-between>
                <v-checkbox v-model="remember" dark color="accent" v-test-ref="'remember-checkbox'">
                  <template v-slot:label>
                    <div
                      style="color:#FFF; font-family: 'DIN Condensed; letter-spacing:2px;'"
                    >REMEMBER ME</div>
                  </template>
                </v-checkbox>
                <v-btn
                  v-test-ref="'login-btn'"
                  :loading="$auth.status.loggingIn"
                  color="accent"
                  @click="login()"
                >Sign In</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-layout justify-center>
            <router-link to class="password-reset" flat>FORGOT YOUR PASSWORD?</router-link>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs6 class="container-image" ml-0>
      <v-layout align-center justify-center fill-height>
        <v-img max-width="55%" :src="'/assets/images/wiley_logo_xl.png'" />
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    employeeEmail: "admin@email.com",
    password: "password",
    remember: false
  }),
  methods: {
    async login() {
      // TODO decouple login success from setting events success or have alternate way to get events?
      try {
        const authResp = await this.$auth.login(
          this.employeeEmail,
          this.password
        );

        if (authResp.status === 500) {
          this.$notifyError("INVALID EMAIL AND/OR PASSWORD");
          return;
        }

        // const response = await this.$events.setYesterdaysEvents();

        // if (response.status === 500) {
        //   this.$notifyError(
        //     "ERROR GETTING TODAYS EVENTS. PLEASE TRY AGAIN LATER"
        //   );
        // }
      } catch (error) {
        this.$notifyError(
          "ERROR GETTING TODAYS EVENTS. PLEASE TRY AGAIN LATER"
        );
      } finally {
        // if auth fails, router guards will kick you back to login screen
        this.$router.replace("/overview");
      }
    }
  }
};
</script>
<style lang="scss">
.container-form {
  height: 100%;
  background-color: var(--v-secondaryDark2-base);
}
.container-image {
  height: 100%;
  background-color: #ffffff;
}
input[name="password"],
input[name="employeeEmail"] {
  font-family: "DIN Condensed";
  font-size: 18px;
  letter-spacing: 1px;
  padding-left: 8px;
  color: #fff;
  border: 2px solid var(--v-secondary-base);
  width: 100%;
  height: 40px;
  outline: none;
  margin: 8px 0 18px;
}
input[name="password"]:focus,
input[name="employeeEmail"]:focus {
  background-color: #fff;
  border: none;
  color: var(--v-primary-dark);
}
.app-form-label {
  display: block;
  font-family: "DIN Condensed";
  font-size: 18px;
  letter-spacing: 2px;
  color: #fff;
}
.red-border {
  background-image: url("/assets/images/red_border_small.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 200;
  padding: 0px 20px 0px;
}
.welcome {
  font-size: 48px;
  font-family: "DIN Condensed";
  letter-spacing: 3px;
  color: #fff;
}
.password-reset {
  font-family: "DIN Condensed";
  font-size: 18px;
  letter-spacing: 2px;
  color: #fff;
}
</style>

