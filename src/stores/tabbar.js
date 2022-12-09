import { defineStore } from 'pinia'

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
      this.index = i
      this.msgNum = msgNum || 0
    }
  }
})