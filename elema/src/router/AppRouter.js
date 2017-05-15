/* eslint-disable no-undef,comma-spacing */
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import World from '@/components/World'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'
import Login from '@/components/login'
  Vue.use(Router)
 export default new Router({
  routes: [
    {
      path: '/' , redirect:'/hello'

    },{
        path:'/login',
        name:'login',
        component:Login
    },{
      path:'/hello',
      component:Hello,
      children:[
        {
          path:'/',redirect:'/goods'
        },
        {
          path:'/World',
          name:'World',
          component:World
        },{
          path:'/goods',
          name:'goods',
          component:goods
        },{
          path:'/seller',
          name:'seller',
          component:seller
        },{
          path:'/ratings',
          name:'ratings',
          component:ratings
        }
      ]
    }
  ],
   linkActiveClass:'active'
})
