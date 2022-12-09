export default {
  pages: [
    'pages/index/index',
    'pages/two/index',
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
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    "color": "red",
    "selectedColor": "green",
    "backgroundColor": "blue",
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/two/index",
      "text": "发现"
    }]
  }
}
