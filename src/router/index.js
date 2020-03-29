import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import VueHome from '@/components/vuejs/home'
import VueTopics from '@/components/vuejs/topics'
import About from '@/components/about'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Logout from '@/components/auth/Logout'
import Users from '@/components/users'
import Config from '@/components/config'
import VueCreateArticle from '@/components/vuejs/articles/create'
import VueViewArticle from '@/components/vuejs/articles/view'
import colorBackground from '@/components/vuejs/articles/componentesIA/colorBackground'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {Auth: false}
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
      meta: {Auth: false}
    },
    {
      path: '/auth/register',
      name: 'register',
      component: Register,
      meta: {Auth: false}
    },
    {
      path: '/auth/logout',
      name: 'logout',
      component: Logout,
      meta: {Auth: false}
    },
    {
      path: '/vuejs',
      name: 'vuejs_home',
      component: VueHome,
      meta: {Auth: false}
    },
    {
      path: '/vuejs/topics',
      name: 'vuejs_topics',
      component: VueTopics,
      meta: {Auth: true}
    },
    {
      path: '/vuejs/article/componentesIA/:id',
      name: 'colorBackground',
      component: colorBackground,
      meta: {Auth: true}
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {Auth: false}
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Users,
      meta: {Auth: true}
    },
    {
      path: '/config',
      name: 'config',
      component: Config,
      meta: {Auth: false}
    },
    {
      path: '/vuejs/article/',
      name: 'vuejs_create_article',
      component: VueCreateArticle,
      meta: {Auth: false}
    },
    {
      path: '/vuejs/article/:id',
      name: 'vuejs_view_article',
      component: VueViewArticle,
      meta: {Auth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.store.dispatch('checkAuth')
    if (!window.store.getters.isUserAuthenticated) {
      next({
        path: '/signin'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
