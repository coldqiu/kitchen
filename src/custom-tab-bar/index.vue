<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view v-for="(item, index) in tabbarList" :key="index" class="tab-bar-item"
      @tap="handlerSwitchTab(index, item.pagePath)">

      <!-- <text :class="['iconfont', item.iconfont, selected === index ? 'selected' : '']"
        :style="{ color: selected === index ? selectedColor : color }"></text> -->

      <!-- <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath" /> -->

      <cover-image class="img" :src="item.selectedIconPath" :style="{ display: selected === index ? '' : 'none' }">
      </cover-image>
      <cover-image class="img" :src="item.iconPath"
        :style="{ display: selected !== index ? '' : 'none' }"></cover-image>


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
import { switchTab, nextTick } from '@tarojs/taro'
import { useTabbarStore } from '@/stores/tabbar.js'
import { tabbarList } from '@/utils/data'

const tabbarStore = useTabbarStore()
// console.log('tabbarStore: ', tabbarStore);
const selected = ref(tabbarStore.index)
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
  selected.value = index
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

.tab-bar-item cover-view {
  font-size: 26px;
}
</style>