<template>
  <view class="search_wrap" @tap="navigateToSearch" :style="props.customStyle">
    <input :disabled="props.disabled" class="input" />
    <view class="placeholder">
      <text class="icon iconfont icon-sousuo"></text>
      <text class="text">{{ props.placeholder }}</text>
    </view>
  </view>
</template>

<script>
import './index.scss'
export default {
  name: 'search-comp'
}
</script>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  customStyle: {
    type: Object,
    default: () => { return { margin: '0 20rpx', height: '60rpx' } },
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'ABCDEFGHIJK'
  },
})

function navigateToSearch() {
  //
}
</script>
<style lang='scss' scoped>

</style>