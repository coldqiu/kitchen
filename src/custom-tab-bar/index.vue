<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view v-for="(item, index) in list" :key="index" class="tab-bar-item" @tap="switchTab(index, item.pagePath)">
      <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath" />
      <cover-view :style="{ color: selected === index ? selectedColor : color }">{{ item.text }}</cover-view>
    </cover-view>
  </cover-view>
</template>


<!-- <script setup>
import { ref } from 'vue'
import { useDidShow, getCurrentInstance } from '@tarojs/taro'

const tab = ref(null)
useDidShow(() => {
  tab.value = getCurrentInstance().page.getTabBar()
  console.log('tab.value: ', tab.value);
})
</script> -->
<script>
import { useDidShow } from '@tarojs/taro'
import { ref, computed } from 'vue'


</script>
<style lang='scss' scoped>

</style>