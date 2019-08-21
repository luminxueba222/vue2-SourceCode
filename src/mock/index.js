const Mock = require('mockjs')

Mock.mock('/data', function () {
  return Mock.mock({
    success: true,
    msg: '',
    data: [{
        icon: 'el-icon-s-home',
        index: 'dashboard',
        title: '系统首页'
      },
      {
        icon: 'el-icon-bank-card',
        index: 'table',
        title: '基础表格'
      },
      {
        icon: 'el-icon-bank-card',
        index: 'tabs',
        title: 'tab选项卡'
      },
      {
        icon: 'el-icon-bank-card',
        index: '3',
        title: '表单相关',
        subs: [{
            index: 'form',
            title: '基本表单'
          },
          {
            index: '3-2',
            title: '三级菜单',
            subs: [{
                index: 'editor',
                title: '富文本编辑器'
              },
              {
                index: 'markdown',
                title: 'markdown编辑器'
              },
            ]
          },
          {
            index: 'upload',
            title: '文件上传'
          }
        ]
      },
      {
        icon: 'el-icon-bank-card',
        index: 'icon',
        title: '自定义图标'
      },
      {
        icon: 'el-icon-bank-card',
        index: 'charts',
        title: 'schart图表'
      },
      {
        icon: 'el-icon-bank-card',
        index: '6',
        title: '拖拽组件',
        subs: [{
            index: 'drag',
            title: '拖拽列表',
          },
          {
            index: 'dialog',
            title: '拖拽弹框',
          }
        ]
      },
      {
        icon: 'el-icon-bank-card',
        index: 'i18n',
        title: '国际化功能'
      },
      {
        icon: 'el-icon-bank-card',
        index: '7',
        title: '错误处理',
        subs: [{
            index: 'permission',
            title: '权限测试'
          },
          {
            index: '404',
            title: '404页面'
          }
        ]
      },
      {
        icon: 'el-icon-bank-card',
        index: '/donate',
        title: '支持作者'
      }
    ]
  })
});
Mock.mock('list',function(){
   return Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
})