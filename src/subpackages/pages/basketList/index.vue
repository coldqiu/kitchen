<template>
  <view class="page">
    <InfoNavigationBar title="food basket" />

  </view>
</template>
  
<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'basket-icon'
}
</script>
<script setup>
import { navigateTo } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
//
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>