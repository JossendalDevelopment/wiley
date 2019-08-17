import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
    theme: {
        primary: '#FFF',   // white
        primaryLight: '#f2f2f2',
        primaryDark1: '#e2e2e2',   // light grey
        primaryDark2: '#cccccc', // dark grey
        buttonBlack: '#141414', // button backgrounds
        secondary: '#424242',
        secondaryDark: '#1D1D1D',
        border: '#4D4D4D',
        accent: '#D91111',    // wiley red
        error: '#D91111',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        classification: '#F2F2F2',
    },
    options: {
        customProperties: true
    },
    iconfont: 'fa',
})
