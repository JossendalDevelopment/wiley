<notes>
    Only handles logging in, new accounts must be created manually for now or by temporarily switching the firebase method in auth.module login action to sign up
</notes>
<template>
    <v-layout align-center justify-center fill-height>
<!-- login form -->
        <v-flex xs6 px-5 class="container-form">
            <v-layout 
                row wrap
                align-center
                fill-height 
                :class="$vuetify.breakpoint.smAndUp ? 'justify-start' : 'justify-center'">
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
                                <span class="app-form-label">COMPANY EMAIL ADDRESS</span>
                                <v-text-field 
                                    background-color="#FFF"
                                    height="40px"
                                    name="employeeEmail" 
                                    v-model="employeeEmail"
                                    placeholder="admin@email.com" 
                                    type="text">
                                </v-text-field>
                                <span class="app-form-label">PASSWORD</span>
                                <v-text-field 
                                    @keyup.enter="login()"
                                    background-color="#FFF"
                                    height="40px"
                                    name="password" 
                                    v-model="password"
                                    placeholder="password" 
                                    type="password">
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="px-3 text-xs-center">
                            <v-layout wrap align-center justify-space-between>
                                <v-checkbox v-model="remember" dark color="accent" >
                                    <template v-slot:label>
                                        <div style="color:#FFF; font-family: 'DIN Condensed; letter-spacing:2px;'"> REMEMBER ME </div>
                                    </template>
                                </v-checkbox>
                                <v-btn 
                                    :loading="$auth.status.loggingIn" 
                                    color="accent" 
                                    @click="login()">Sign In</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-layout justify-center>
                        <router-link to="" class="password-reset" flat>FORGOT YOUR PASSWORD?</router-link>
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
        employeeEmail: '',
        password: '',
        remember: false,
    }),
    methods: {
        login() {
            this.$auth.login(this.employeeEmail, this.password)
                .then((resp) => {
                    if(resp.status === 500) {
                        this.$notifyError('Invalid email and/or password');
                        return;
                    }
                    this.$router.replace('/overview');
                })
        },
    }
}
</script>
<style lang="scss">
.container-form {
    height: 100%;
    background-color: var(--v-secondaryDark2-base);
}
.container-image {
    height:100%;
    background-color: #FFFFFF; 
}
.text-input > .v-input__control > .v-input__slot {
    // override text-fields' background
    // background-color: #FFFFFF !important;
}
.app-form-label {
    font-family: 'DIN Condensed';
    font-size: 18px;
    letter-spacing: 2px;
    color: #FFF;
}
.red-border {
    background-image: url("/assets/images/red_border.png");
    background-repeat: no-repeat;
    background-size:100% 100%;
    z-index: 200;
    padding: 0px 20px 0px;
}
.welcome {
    font-size: 48px;
    font-family: 'DIN Condensed';
    letter-spacing: 3px;
    color: #FFF;
}
.password-reset {
    font-family: 'DIN Condensed'; 
    font-size: 18px;
    letter-spacing:2px;
    color: #FFF;
}
</style>

