import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Toast from '@/components/toast'
import Gotop from '@/components/gotop'
import Main from '@/components/main'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'Toast',
          component: Toast
        },{
          path:'/gotop',
          name:'gotop',
          component:Gotop
        }
      ]
    }
  ]
})
