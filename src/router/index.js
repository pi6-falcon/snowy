import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue'
import Shorten from '../views/Shorten.vue'
import CreatedLinks from '../views/CreatedLinks.vue'
import StatisticsLink from '../views/StatisticsLink.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'snowy owl | Register'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'snowy owl | Profile'
    }
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: 'snowy owl | Free Custom URL Shortener, Branded URLs, Link Management'
    }
  },
  {
    path: '/shorten',
    name: 'Shorten',
    component: Shorten,
    meta: {
      title: 'snowy owl | Shorten'
    }
  },
  {
    path: '/created-links/statistics/:short_url',
    name: 'StatisticsLink',
    component: StatisticsLink,
    //props: true,
    meta: {
      title: 'snowy owl | Statistics'
    }
  },
  {
    path: '/created-links',
    name: 'CreatedLinks',
    component: CreatedLinks,
    meta: {
      title: 'snowy owl | Created Links'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'snowy owl | 404'
    }
  },{
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  routes
})

export default router
