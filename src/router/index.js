import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GridView from '@/views/GridView.vue'
import ResourceView from '@/views/ResourceView.vue'
import ManagementView from '@/views/ManagementView.vue'
import DisabledView from '@/views/DisabledView.vue'
import { useUserLoginStore } from '@/stores/user'
import { getCurrentUser } from '../api.js'


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
      },
      /*beforeEnter: (to, from) => {
        const userLoginStore = useUserLoginStore()
        if (userLoginStore.user != null && userLoginStore.user.disabled) {
          return false
        }
      },*/
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
    },
    {
      path: '/disabled',
      name: 'disabled',
      component: DisabledView,
      meta: {
        requiresAuth: true,
        requiresAdmin: false,
        showNavbar: false
      }
    }
  ]
})

router.beforeEach(async (to, from) => {
  // redirect user to login page if they aren't authenticated
  const userLoginStore = useUserLoginStore()
  if (!userLoginStore.authenticated && to.meta.requiresAuth) {
    return { name: 'login' }
  }
})

router.beforeEach(async (to, from) => {
  // don't allow user to enter route without admin priveleges
  const userLoginStore = useUserLoginStore()
  if (userLoginStore.user != null && !userLoginStore.user.admin && to.meta.requiresAdmin) {
    return { name: from.name }
  }
})

/*router.beforeEach(async (to, from) => {
  //
  const userLoginStore = useUserLoginStore()
  if (userLoginStore.user != null && userLoginStore.user.disabled && to.name != 'disabled') {
    return { name: 'disabled' }
  }
})*/

export default router
