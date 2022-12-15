<template>
  <view class="page">
    <CompNavigationBar :position="'sticky'">
      <view class="flex">
        Home
        <view :class="['search', scrollTop > 100 ? 'show' : '']">
          <text @tap="navigateToSearch" class="icon iconfont icon-sousuo"></text>
        </view>
      </view>
    </CompNavigationBar>

    <view class="input">
      <view @tap="navigateToSearch" class="flex">
        <view class="icon">
          <text class="iconfont icon-sousuo"></text>
        </view>
        <view class="text">ABCDE</view>
      </view>
    </view>
    <view class="hi">kITCHEN？</view>
    <view class="voice">
      <view class="desc">{{ randomText(0, 10) }}</view>
      <text class="ps">{{ randomText(0, 18) }}</text>
      <text class="icon iconfont icon-maikefeng"></text>
    </view>
    <view class="hi">{{ randomText(0, 6) }}</view>
    <view class="food_class_wrap">
      <FoodClass :list="foodClass" @change="handleChange" />
    </view>
    <view @tap="navigateToSearchResult(true)" :class="['search_wrap', foodList.length > 0 ? 'show' : '']">
      <view class="text">
        {{ randomText(0, 12) }}
        <text class="count">{{ foodList.length }}</text>
      </view>
    </view>
  </view>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'page-one',
}
</script>
<script setup>
import { ref, unref } from 'vue'
import { useReady, usePageScroll, navigateTo, useLoad, useRouter, showShareMenu } from '@tarojs/taro'
import CompNavigationBar from '@/components/CompNavigationBar/index.vue';
import FoodClass from './FoodClass/index.vue'
// 假数据
import { tempLower, tempUpper, randomText } from '@/utils/data'

const foodClass = [
  { type: 'ADC', list: tempLower },
  { type: 'BEF', list: tempUpper }
]
// 选中食材
const foodList = ref([])
function handleChange(checkedList) {
  foodList.value = checkedList
}
// 顶部搜索图标 动画
const scrollTop = ref(0)
usePageScroll(res => {
  scrollTop.value = res.scrollTop
  // if (res.scrollTop > 100) //写在 template
})
// 跳转 search page
function navigateToSearch() {
  navigateTo({
    url: '/subpackages/pages/search/index'
  })
}
// 跳转 searchResult page
function navigateToSearchResult() {
  let list = unref(foodList)
  // 重置选中食材
  navigateTo({
    url: `/subpackages/pages/searchResult/index?list=${JSON.stringify(list)}`
  })
}
// 显示当前页面的转发按钮
showShareMenu()
</script>
<style scoped lang="scss">
@import './index.scss'
</style>
