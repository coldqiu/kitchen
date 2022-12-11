export default {
  pages: [
    'pages/index/index',
    'pages/two/index',
    'pages/fav/index'
  ],
  subpackages: [
    {
      root: 'subpackages',
      pages: [
        'pages/search/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'dark',
    // navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    initialRenderingCache: 'static',
    handleWebviewPreload: "static"
  },
  tabBar: {
    custom: true,
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/two/index",
        "text": "发现"
      },
      {
        "pagePath": "pages/fav/index",
        "text": "收藏"
      }
    ]
  }
}
