<template>
  <view class="page">
    <CompNavigationBar>
      <SearchComp :disabled="true" :style="{ margin: '0 300rpx 0 35rpx' }" />
    </CompNavigationBar>
    <view class="list">
      <view @tap="navigateToFoodList(item.id)" class="item" v-for="item in colectionList" :key="item.id">
        <view class="img"></view>
        <view class="title">{{ item.title }}</view>
        <view class="desc">{{ item.desc }}</view>
      </view>
    </view>
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
import { navigateTo } from '@tarojs/taro'
import CompNavigationBar from '@/components/CompNavigationBar/index.vue';
import SearchComp from '@/components/SearchComp/index.vue'
import { useColection } from '@/stores/collect'

const { colectionList, all, addToColection, delFromColection } = useColection()

// 跳转
function navigateToFoodList(collectionId) {
  navigateTo({
    url: `/subpackages/pages/foodList/index?collectionId=${collectionId}`
  })
}
</script>
<style scoped lang="scss">
@import './index.scss'
</style>