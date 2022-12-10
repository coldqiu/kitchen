import { defineStore } from 'pinia'

// 设置 tabbar 初始值
// let currentTabIndex = setStorageSync('currentTabIndex')
// console.log('currentTabIndex: ', currentTabIndex);
// 获取当前页面栈
// const pages = getCurrentPages()
// console.log('tabbar.js pages: ', pages);

// 以上逻辑 无法在这里生效，也不需要写在这里
// 因为：非tab页 分享页左上角只有返回首页

// 这时 页面还没初始化，不能获取到router信息
export const useTabbarStore = defineStore('tabbar', {
  state: () => {
    return {
      // tab: 'kitchen',
      index: 0,
      msgNum: 0,
      color: 'rebeccapurple'
    }
  },
  actions: {
    setTab(i, msgNum) {
      console.log('setTab: ', i, this.index);
      this.index = i
      this.msgNum = msgNum || 0
    }
  }
})

console.log("useTabStore")