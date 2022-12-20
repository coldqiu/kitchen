<template>
  <view class="basket_icon">
    <view @tap="navigateToBasketPage" class="icon iconfont icon-.icon-31shezhi"></view>
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
function navigateToBasketPage() {
  navigateTo({
    url: '/subpackages/pages/basketList/index'
  })
}
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>