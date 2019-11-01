import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      redirect: '/table'
    },
    {
      path: '/',
      component: resolve => require(['../views/common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/table',
          component: resolve => require(['../views/page/Tabs.vue'], resolve),
          meta: {
            title: '电视剧'
          }
        },
        {
          path: '/icon',
          component: resolve => require(['../views/page/Icon.vue'], resolve),
          meta: {
            title: '自定义图标'
          }
        }, {
          path: '/tabs',
          component: resolve => require(['../views/page/Tabs.vue'], resolve),
          meta: {
            title: 'tab选项卡'
          }
        },
        {
          path: '/table',
          component: resolve => require(['../views/page/BaseTable.vue'], resolve),
          meta: {
            title: '天龙八部',
            keepAlive: true
          }
        },
        {
          path: '/form',
          component: resolve => require(['../views/page/BaseForm.vue'], resolve),
          meta: {
            title: '天龙八部'
          }
        }, {
          path: '/editor',
          component: resolve => require(['../views/page/VueEditor.vue'], resolve),
          meta: {
            title: '富文本编辑器'
          }
        },
        {
          path: '/markdown',
          component: resolve => require(['../views/page/Markdown.vue'], resolve),
          meta: {
            title: 'markdown编辑器'
          }
        }, {
          path: '/upload',
          component: resolve => require(['../views/page/Upload.vue'], resolve),
          meta: {
            title: '文件上传'
          }
        },
        {
          path: '/charts',
          component: resolve => require(['../views/page/BaseCharts.vue'], resolve),
          meta: {
            title: 'schart图表'
          }
        }, {
          path: '/drag',
          component: resolve => require(['../views/page/DragList.vue'], resolve),
          meta: {
            title: '拖拽列表'
          }
        },
        {
          // 拖拽Dialog组件
          path: '/dialog',
          component: resolve => require(['../views/page/DragDialog.vue'], resolve),
          meta: {
            title: '拖拽弹框'
          }
        },
        {
          // 国际化组件
          path: '/i18n',
          component: resolve => require(['../views/page/I18n.vue'], resolve),
          meta: {
            title: '国际化'
          }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['../views/page/Permission.vue'], resolve),
          meta: {
            title: '权限测试',
            permission: true
          }
        },
        {
          path: '/404',
          component: resolve => require(['../views/page/404.vue'], resolve),
          meta: {
            title: '天龙八部'
          }
        },
        {
          path: '/403',
          component: resolve => require(['../views/page/403.vue'], resolve),
          meta: {
            title: '403'
          }
        },
        {
          path: '/donate',
          component: resolve => require(['../views/page/Donate.vue'], resolve),
          meta: {
            title: '支持作者'
          }
        }

      ],

    },
    {
      path: '/login',
      component: resolve => require(['../views/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})