<template>
    <v-container fluid fill-height pa-0>
        <v-layout align-center justify-center>
          <v-flex xs4 style="background-color: #FFFFFF; height:100%;">
              <v-layout align-center justify-center fill-height>
                  <v-img :src="require('@/assets/images/wiley_demo_logo.png')" />
              </v-layout>
          </v-flex>
          <v-flex xs8 px-5>
            <v-card flat>
              <v-toolbar dark flat color="secondary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="fas fa-user" 
                        name="login" 
                        label="Login" 
                        type="text">
                    </v-text-field>
                    <v-text-field 
                        prepend-icon="fas fa-lock" 
                        name="password" 
                        label="Password" 
                        id="password" 
                        type="password">
                    </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="accent" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    methods: {
        login() {
            this.$router.replace('/');
        }
    }
}
</script>