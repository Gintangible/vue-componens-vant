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
            path: 'enum-select',
            title: '枚举控件',
          },
          {
            path: 'data-select',
            title: '日期选择控件',
          },
          {
            path: 'data-range',
            title: '日期区间控件',
          },
        ],
      },
      // 其他功能的组件库
       {
        title: '复合组件',
        items: [
          {
            path: 'faq-list',
            title: '产品常见问题列表控件',
          },
        ],
      },
      // 其他功能的组件库
      {
        title: '功能组件',
        items: [
          {
            path: 'identify',
            title: '验证码控件',
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
