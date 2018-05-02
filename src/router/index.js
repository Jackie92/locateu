import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import school from '@/components/school'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/step',
      name: 'step',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/school',
      name: 'school',
      component: school
    }
  ]
})
