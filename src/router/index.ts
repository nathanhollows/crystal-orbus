import { createRouter, createWebHistory } from 'vue-router'
const MyStopsView = () => import('../views/MyStopsView.vue')
const TimeTableView = () => import('../views/TimeTableView.vue')
// const MapView = () => import('../views/MapView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mystops',
      component: MyStopsView
    },
    // {
    //   path: '/map',
    //   name: 'map',
    //   component: MapView
    // },
    {
      path: '/timetable/:routeName/stops/:stops',
      name: 'timetable',
      component: TimeTableView,
      props: true
    }
  ]
})

export default router
