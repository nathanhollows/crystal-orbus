import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const RoutesView = () => import('../views/RoutesView.vue')
const MapView = () => import('../views/MapView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/routes/:routeName/stops/:stops',
      name: 'Routes',
      component: RoutesView,
      props: true
    }
  ]
})

export default router
