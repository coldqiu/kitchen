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
        'pages/search/index',
        'pages/foodInfo/index',
        'pages/foodClass/index',
        'pages/searchResult/index',
        'pages/add/index',
        'pages/basketList/index',
        'pages/foodList/index'
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
    custom: false,
    color: '#663399',
    selectedColor: '#082c63',
    backgroundColor: '#ffffff',
    position: 'bottom',
    borderStyle: 'white',
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": './custom-tab-bar/images/index.png',
        "selectedIconPath": './custom-tab-bar/images/index_actived.png'
      },
      {
        "pagePath": "pages/two/index",
        "text": "发现",
        "iconPath": './custom-tab-bar/images/quanbu.png',
        "selectedIconPath": './custom-tab-bar/images/quanbu_actived.png'
      },
      {
        "pagePath": "pages/fav/index",
        "text": "收藏",
        "iconPath": './custom-tab-bar/images/fav.png',
        "selectedIconPath": './custom-tab-bar/images/fav_actived.png'
      }
    ]
  }
}
