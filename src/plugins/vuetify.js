import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#e2e2e2',   // light grey
    primaryDark: '#cccccc', // dark grey
    secondary: '#424242',
    accent: '#d42017',    // wiley red
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
