import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  loadFontFace, getMenuButtonBoundingClientRect, getSystemInfoSync,
  setStorageSync, getCurrentPages, getCurrentInstance, nextTick,
} from '@tarojs/taro'
// import { useTabbarStore } from '@/stores/tabbar.js'
// 不能在 createApp 配置里 调用 pinia
import { tabbarList } from '@/utils/data.js'
import './app.scss'

const App = createApp({
  onLaunch() {
    // 获取设备信息和胶囊按钮位置信息：
    const { top, height } = getMenuButtonBoundingClientRect()
    const { statusBarHeight, platform } = getSystemInfoSync()

    setStorageSync('statusBarHeight', statusBarHeight)
    setStorageSync('menuButtonHeight', height ? height : 32)

    // top height 极少数情况下获取不到值或取到0
    if (top && top !== 0 && height && height !== 0) {
      const navigationBarHeight = (top - statusBarHeight) * 2 + height
      setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
      setStorageSync('navigationBarHeight', platform === 'android' ? 48 : 40)
    }

    // 加载字体 【网络 抛出 403】【处理，oss服务器 referer添加白名单 微信小程序】
    loadFontFace({
      global: true,
      family: 'dyh',
      source: 'https://cdn.coldqiu.com/SmileySans-Oblique.ttf',
      // scopes: ['webview', 'native'],
      success: () => {
        console.log("load font success")
      },
      fail: () => {
        console.log("load font fail")
      }
    })
  },

  onShow(options) {
    //获取当前页面栈
    // 页面 onShow 时
    nextTick(() => {
      let instance = getCurrentInstance() // .page.getTabBar()
      // instance.page 再模拟器 控制台 时有时无  奇怪！？
      // console.log("instance.router.path", instance.router.path)
      // console.log('tabbarList: ', tabbarList);
      // tabbarList.forEach((item, index) => {
      //   if (`/${item.pagePath}` === instance.router.path) {
      //     setStorageSync('currentTabIndex', index)
      //     // console.log('setStorageSync index: ', index);
      //   } else {
      //     setStorageSync('currentTabIndex', 0)
      //   }
      // })

    })
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())

export default App
