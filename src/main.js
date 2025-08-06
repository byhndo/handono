
import { createApp, ref, watch, onMounted, nextTick } from 'vue'
import { createRouter, createWebHashHistory, useRoute, useRouter } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from './router' 

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(router)
app.mount('#app')
