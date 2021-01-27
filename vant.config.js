module.exports = {
  name: 'vant-components',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/vant-components/',
    },
  },
  site: {
    title: '基于 vant 的组件库',
    description: 'gintangible 的通用组件',
    logo: 'https://img.yzcdn.cn/vant/logo.png',
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
            path: 'name-field',
            title: '姓名输入框控件',
          },
          {
            path: 'mobile-field',
            title: '手机号码输入框控件',
          },
        ],
      },
    ],
  },
};
