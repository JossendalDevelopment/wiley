import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#FFF',   // white
    primaryLight: '#f2f2f2',
    primaryDark1: '#e2e2e2',   // light grey
    primaryDark2: '#cccccc', // dark grey
    secondary: '#424242',
    secondaryDark: '#1D1D1D',
    border: '#4D4D4D',
    accent: '#D91111',    // wiley red
    error: '#FF4F65',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  iconfont: 'fa',
})
