<template>
  <view class="page">
    <CompNavigationBar>
      <SearchComp :disabled="true" :style="{ margin: '0 300rpx 0 35rpx' }" />
    </CompNavigationBar>
  </view>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'fav-page'
}
</script>
<script setup>
import CompNavigationBar from '@/components/CompNavigationBar/index.vue';
import SearchComp from '@/components/SearchComp/index.vue'

</script>
<style scoped lang="scss">
@import './index.scss'
</style>