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
import './index.scss'
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
  // position: Boolean
  position: {
    type: String,
    default: 'fixed',
    required: false
  }
})
</script>