<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view v-for="(item, index) in list" :key="index" class="tab-bar-item"
      @tap="handlerSwitchTab(index, item.pagePath)">
      <!-- <text :class="['iconfont', item.iconPath, selected === index ? 'selected' : '']"
        :style="{ color: selected === index ? selectedColor : color }"></text> -->
      <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath" />
      <cover-view :style="{ color: selected === index ? selectedColor : color }">{{ item.text }}</cover-view>
    </cover-view>
  </cover-view>
</template>
<script>
export default {
  name: 'tab-bar'
}
</script>
<script setup>
import { ref } from 'vue'
import { switchTab } from '@tarojs/taro'
import { useTabbarStore } from '@/stores/tabbar.js'

const tabbarStore = useTabbarStore()
const selected = ref(tabbarStore.index)
const color = '#082c63'
const selectedColor = 'rebeccapurple' // #663399 #082c63
const list = [
  {
    pagePath: '/pages/index/index',
    selectedIconPath: './images/index_actived.png',
    iconPath: './images/index.png',
    // iconPath: 'icon-shouye',
    text: '首页'
  },
  {
    pagePath: '/pages/two/index',
    selectedIconPath: './images/quanbu_actived.png',
    iconPath: './images/quanbu.png',
    // iconPath: 'icon-all-fill',
    text: '发现'
  },
  // {
  //   pagePath: '/pages/cart/index',
  //   selectedIconPath: '../images/tabbar_cart_on.png',
  //   iconPath: '../images/tabbar_cart.png',
  //   text: '购物车'
  // },
  // {
  //   pagePath: '/pages/my/index',
  //   selectedIconPath: '../images/tabbar_my_on.png',
  //   iconPath: '../images/tabbar_my.png',
  //   text: '个人中心'
  // }
]
function handlerSwitchTab(index, url) {
  setSelected(index)
  switchTab({ url })
}
function setSelected(index) {
  // store.dispatch('setSelected', index)
  tabbarStore.index = index
}

</script>
<style lang='scss'>
@import "../static/svg/iconfont.css";

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  // background-color: rgba(0, 0, 0, 0.33);
  // position: absolute;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 1px;
  // transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item cover-image {
  width: 54px;
  height: 54px;
}

.tab-bar-item cover-view {
  font-size: 20px;
}
</style>