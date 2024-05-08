import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueMapboxTs from 'vue-mapbox-ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueMapboxTs)

app.mount('#app')
