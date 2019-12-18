import Vue from 'vue'
import Router from 'vue-router'

const Category = r => require.ensure([], () => r(require('@/page/category')), 'category') // 商品分类

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/category'
    },

    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        auth: 0,
        title: '商品分类'
      }
    },
  ]
})
