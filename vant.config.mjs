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
        ],
      },
    ],
  },
};
