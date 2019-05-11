<template>
    <v-container fluid fill-height pa-0>
        <v-layout align-center justify-center>
            <v-flex xs1 style="height:100%;" :style="`background-color:${$vuetify.theme.primary}`">
            </v-flex>
            <v-flex xs4 style="background-color: #FFFFFF; height:100%;">
                <v-layout align-center justify-center fill-height>
                    <v-img max-width="80%" :src="require('@/assets/images/wiley_demo_logo.png')" />
                </v-layout>
            </v-flex>
          <v-flex xs7 px-5>
            <v-card flat color="primary" style="width:60%;">
              <v-toolbar flat color="primary">
                <v-toolbar-title class="title mx-auto">Welcome!</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="py-0">
                <v-form>
                    <v-text-field 
                        outline
                        color="primary darken-4"
                        name="employeeEmail" 
                        v-model="employeeEmail"
                        label="admin@email.com" 
                        type="text">
                    </v-text-field>
                    <v-text-field 
                        outline
                        color="primary darken-4"
                        name="password" 
                        v-model="password"
                        label="password" 
                        id="password" 
                        type="password">
                    </v-text-field>
                </v-form>
              </v-card-text>
                <v-card-actions class="px-3">
                    <v-checkbox v-model="remember" color="accent" >
                        <template v-slot:label>
                            <div> Remember Me </div>
                        </template>
                    </v-checkbox>
                    <v-spacer></v-spacer>
                    <v-btn :loading="$auth.status.loggingIn" color="accent" @click="login()">Sign In</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn to="" flat>Forgot password</v-btn>
                </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

export default {
    data: () => ({
        employeeEmail: '',
        password: '',
        remember: false
    }),
    methods: {
        login() {
            this.$auth.login(this.employeeEmail, this.password)
                .then(() => {
                    this.$router.replace('/');
                })
        },
    }
}
</script>
<style scoped>
</style>
