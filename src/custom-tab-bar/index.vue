<template>
  <view class="tab-bar">
    <view class="tab-bar-border"></view>
    <view v-for="(item, index) in tabbarList" :key="item.pagePath" class="tab-bar-item"
      @tap="handlerSwitchTab(index, item.pagePath)">

      <view :class="['tabbar-icon iconfont', item.iconfont, selected === index ? 'selected' : '']"
        :style="{ color: selected === index ? selectedColor : color }"></view>

      <!-- <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath" /> -->

      <!-- <cover-image class="img" :src="item.selectedIconPath" :style="{ display: selected === index ? '' : 'none' }">
      </cover-image>
      <cover-image class="img" :src="item.iconPath"
        :style="{ display: selected !== index ? '' : 'none' }"></cover-image> -->


      <text :style="{ color: selected === index ? selectedColor : color }">{{ item.text }}</text>
    </view>
  </view>
</template>
<script>
export default {
  name: 'tab-bar'
}
</script>
<script setup>
import { ref } from 'vue'
import { switchTab, nextTick } from '@tarojs/taro'
import { useTabbarStore } from '@/stores/tabbar.js'
import { tabbarList } from '@/utils/data'

const tabbarStore = useTabbarStore()
// console.log('tabbarStore: ', tabbarStore);
// const selected = ref(tabbarStore.index)
// const selected = ref(0)
const selected = -1
// console.log('tabbarStore.index: ', tabbarStore.index);
// const selected = ref(0)
// console.log('selected: ', selected);
const color = '#082c63'
const selectedColor = 'rebeccapurple' // #663399 #082c63

function handlerSwitchTab(index, url) {
  // debugger;
  console.log('index: ', index);

  setSelected(index)
  nextTick(() => {
    switchTab({ url })
  })
}
function setSelected(index) {
  // store.dispatch('setSelected', index)
  // selected.value = index
  // tabbarStore.index = index
  tabbarStore.setTab(index)
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

.tab-bar-item view {
  font-size: 50px;
}

.tab-bar-item {
  text {
    font-size: 20px;
  }
}
</style>