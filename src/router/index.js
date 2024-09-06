import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GridView from '@/views/GridView.vue'
import ResourceView from '@/views/ResourceView.vue'
import UsersView from '@/views/management/UsersView.vue'
import ContentView from '@/views/management/ContentView.vue'
import MetadataView from '@/views/management/MetadataView.vue'
import DisabledView from '@/views/DisabledView.vue'
import { useSessionStore } from '@/stores/session'
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
      path: '/management/users',
      name: 'users-management',
      component: UsersView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        showNavbar: true
      }
    },
    {
      path: '/management/content',
      name: 'content-management',
      component: ContentView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        showNavbar: true
      }
    },
    {
      path: '/management/metadata',
      name: 'metadata-management',
      component: MetadataView,
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
  console.log(`beforeEach => from: ${from.name} to: ${to.name}`)
  const sessionStore = useSessionStore()
  sessionStore.retrieveSession()
  if (sessionStore.accessToken != null && !sessionStore.authenticated) {
    try {
      const response = await getCurrentUser()
      sessionStore.storeUser(response.data)
      sessionStore.authenticated = true
      // console.log(response.data)
      return { name: to.name }
    } catch (error) {
      //sessionStore.error = error.response
      console.log(error)
    }
  }
  if (!sessionStore.authenticated && to.meta.requiresAuth) {
    // redirect user to login page if they aren't authenticated
    return { name: 'login' }
  }
  if (sessionStore.disabled && to.name != 'disabled') {
    // redirect user to disabled page
    return { name: 'disabled' }
  }
  if (!sessionStore.admin && to.meta.requiresAdmin) {
    // redirect to previous page if user is not admin
    return { name: from.name }
  }
})

export default router
