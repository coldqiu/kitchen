<template>
  <view class="scroll_top_wrap">
    <view class="content">
      <view class="icon iconfong icon-search"></view>
    </view>
  </view>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'scroll-top'
}
</script>
<script setup>
const props = defineProps({
  scrollTop: Number
})
console.log(props)
console.log('props: ', props);
</script>
<style scoped lang="scss">
@import './index.scss'
</style>