<template>
  <view :class="['basket_icon', basket.length > 0 ? 'show' : 'hide']" :style="{ bottom: `${150 + paddingBottom}rpx` }">
    <view @tap="navigateToBasketPage" class="icon iconfont .icon-31shezhi"></view>
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
import { useBasket } from '@/stores/basket.js'

const props = defineProps({
  paddingBottom: {
    type: Number,
    default: 0
  }
})
const { basket } = useBasket()

function navigateToBasketPage() {
  navigateTo({
    url: '/subpackages/pages/basketList/index'
  })
}
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>