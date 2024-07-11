import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GridView from '@/views/GridView.vue'
import ResourceView from '@/views/ResourceView.vue'
import ManagementView from '@/views/ManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
        showNavbar: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
        showNavbar: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
        requiresAdmin: false,
        showNavbar: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: false,
        showNavbar: true
      }
    },
    {
      path: '/grid/:pageId(\\d+)?',
      name: 'grid',
      component: GridView,
      meta: {
        requiresAuth: true,
        requiresAdmin: false,
        showNavbar: true
      }
    },
    {
      path: '/management',
      name: 'management',
      component: ManagementView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        showNavbar: true
      }
    },
    {
      path: '/resource/:resourceId(\\d+)',
      name: 'resource',
      component: ResourceView,
      props: true,
      meta: {
        requiresAuth: true,
        requiresAdmin: false,
        showNavbar: true
      }
    }
  ]
})

export default router
