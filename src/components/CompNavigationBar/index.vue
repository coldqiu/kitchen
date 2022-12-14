<template>
  <view class="navigationContainer"
    :style="{ height: navigationBarAndStatusBarHeight + 'px', position: props.position }">
    <view :style="{ height: statusBarHeight + 'px' }"> </view>
    <view class="navigationBar" :style="{ height: navigationBarHeight + 'px' }">
      <slot></slot>
    </view>

  </view>
  <view v-if="props.position === 'fixed'" :style="{
    height: navigationBarAndStatusBarHeight + 'px', background: 'ffffff'
  }"></view>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'comp-navigation-bar',
}
</script>
<script setup>
import { getStorageSync } from '@tarojs/taro';

const statusBarHeight = getStorageSync('statusBarHeight')
const navigationBarHeight = getStorageSync('navigationBarHeight')
const navigationBarAndStatusBarHeight = statusBarHeight + navigationBarHeight

const props = defineProps({
  position: {
    type: String,
    default: 'fixed',
    required: false
  }
})
</script>
<style scoped lang="scss">
@import './index.scss'
</style>