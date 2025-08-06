import { createRouter, createWebHashHistory } from 'vue-router'

import Bio from './views/Bio.vue'
import Photos from './views/Photos.vue'

const routes = [
  { path: '/', redirect: '/bio' },
  { path: '/bio', component: Bio },
  { path: '/photos', component: Photos },
]

const router = createRouter({
  history: createWebHashHistory(), 
  routes
})

export default router
