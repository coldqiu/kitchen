<template>
  <view class="page">
    <InfoNavigationBar title="添加食材" />
    
  </view>
</template>


<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'add-page'
}
</script>
<script setup>
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'


</script>
<style lang='scss' scoped>
@import './index.scss'
</style>