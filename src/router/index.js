import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Signup from '@/views/Signup'
import Index from '@/views/Index'
import Header from '@/components/Header'
import Leftnav from '@/components/Leftnav'
import MusicPlayer from '@/components/MusicPlayer'

// Personal
import Personal from '@/views/Personal'
import Profile from '@/views/personal/Profile'
import Settings from '@/views/personal/Settings'
// My record
import Mycollection from '@/views/Mycollection'
import Singles from '@/views/mycollection/Singles'
import History from '@/views/mycollection/History'

// Music Coffee
import MusicCoffee from '@/views/musicCoffee/MusicCoffee'
import MusicCoffee_listener from '@/views/musicCoffee/MusicCoffee_listener'

// new 
import Layout from 'views/layout/Layout'
import dashboard from 'views/dashboard'

import mymusic from 'views/mymusic'
import musician from 'views/mymusic/musician'
import playlist from 'views/mymusic/playlist'


/* error page */
import Err404 from 'views/error/404'
import Err401 from 'views/error/401'


import store from '../vuex/store'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },

    {
      path: '/',
      components: {
        default: Layout,
        footer: MusicPlayer,
      },
      redirect: '/dashboard',
      name: '首页',
      hidden: true,
      children: [{ path: 'dashboard', component: dashboard }]
    }, {
      path: '/my',
      components: {
        default: Layout,
        footer: MusicPlayer,
      },
      redirect: '/my/music',
      name: 'My',
      icon: 'quanxian',
      meta: { role: ['admin', 'user'] },
      hidden: true,
      children: [
        { 
          path: 'music', 
          component: mymusic ,
          redirect: '/my/music/musician',
          children: [{ path: 'musician', component: musician }, { path: 'playlist', component: playlist}]
        },
      ]
    }, {
      path: '/errorpage',
      component: Layout,
      redirect: 'noredirect',
      name: '错误页面',
      icon: '404',
      children: [
        { path: '401', component: Err401, name: '401' },
        { path: '404', component: Err404, name: '404' }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      //beforeEnter: isLogin,
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup,
      //beforeEnter: isLogin,
    }, { 
      path: '/musiccoffee', 
      components: {
        default: MusicCoffee,
      },
    }, {
      path: '/musiccoffee_listener', 
      components: {
        default: MusicCoffee_listener,
      },      
    }, { 
      path: '/personal',
      redirect: '/personal/profile',
      components: {
        default: Personal,
        header: Header,
        footer: MusicPlayer,
      },
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
          meta: {
            requireAuth: true,
          },
        },{
          path: 'settings',
          name: 'settings',
          component: Settings,
          meta: {
            requireAuth: true,
          },
        },
      ]
    },{ 
      path: '/mycollection',
      redirect: '/mycollection/singles',
      components: {
        default: Mycollection,
        header: Header,
        footer: MusicPlayer,
      },
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: 'singles',
          name: 'singles',
          component: Singles,
          meta: {
            requireAuth: true,
          },
        },{
          path: 'history',
          name: 'history',
          component: History,
          meta: {
            requireAuth: true,
          },
        },
      ]
    },
    //{ path: '*', redirect: '/404', hidden: true },
  ]
})

router.beforeEach((to, from, next) => {
    /*
    console.log(to.meta.requireAuth)
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.user.userInfo.id) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
    */
    next();
})
export default router;