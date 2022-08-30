export default {
  name: 'vant3-components',
  build: {
    css: {
      base: 'vant.css',
      preprocessor: 'less',
    },
    site: {
      publicPath: '/vant3-components/',
    },
  },
  site: {
    title: '基于 vant3 的组件库',
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'switch-cell',
            title: '组合Cell和Switch的开关控件',
          },
          {
            path: 'document-popup',
            title: '文档查看弹窗',
          },
          {
            path: 'enum-select',
            title: '枚举控件',
          },
          {
            path: 'enum-select-checkbox',
            title: '枚举多选控件',
          },
          {
            path: 'panel-form',
            title: 'panel-form面板',
          },
          {
            path: 'verify-code-field',
            title: '短信验证码输入框控件',
          },
          {
            path: 'identify-code',
            title: '验证码控件',
          },
        ],
      },
      // 其他功能的组件库
      {
        title: '业务组件',
        items: [
          {
            path: 'faq-list',
            title: '产品常见问题列表控件',
          },
          {
            path: 'signature',
            title: '电子签名控件',
          },
        ],
      },
    ],
  },
};
