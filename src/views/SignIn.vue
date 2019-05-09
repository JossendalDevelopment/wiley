<template>
    <v-container fluid fill-height pa-0>
        <v-layout align-center justify-center>
          <v-flex xs4 style="background-color: #FFFFFF; height:100%;">
              <v-layout align-center justify-center fill-height>
                  <v-img max-width="80%" :src="require('@/assets/images/wiley_demo_logo.png')" />
              </v-layout>
          </v-flex>
          <v-flex xs8 px-5>
            <v-card flat color="primaryDark">
              <v-toolbar flat color="primaryDark">
                <v-toolbar-title class="title mx-auto">Welcome!</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="fas fa-envelope" 
                        name="employeeId" 
                        v-model="employeeId"
                        label="Company Email Address" 
                        type="text">
                    </v-text-field>
                    <v-text-field 
                        prepend-icon="fas fa-lock" 
                        name="password" 
                        v-model="password"
                        label="Password" 
                        id="password" 
                        type="password">
                    </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="accent" @click="login()">Sign In</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        employeeId: '',
        password: ''
    }),
    methods: {
        login() {
            this.$auth.login(this.employeeId, this.password)
                .then(resp => {
                    console.log("Login response", resp)
                    this.$router.replace('/');
                })
        }
    }
}
</script>