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
    <view :class="['search_wrap', checkedCount > 0 ? 'show' : '']">
      <view class="text">
        {{ randomText(0, 12) }}
        <text class="count">{{ checkedCount }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'page-one',
}
</script>
<script setup>
import { ref } from 'vue'
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
const checkedCount = ref(0)
function handleChange(count) {
  checkedCount.value = count
}
// 顶部搜索图标 动画
const scrollTop = ref(0)
usePageScroll(res => {
  scrollTop.value = res.scrollTop
  // if (res.scrollTop > 100) //写在 template
})
// 点击搜索icon 跳转 search page
function navigateToSearch() {
  navigateTo({
    url: '/subpackages/pages/search/index'
  })
}
// 点击搜索框【跳转“搜索页前”】 重置选中食材

// 显示当前页面的转发按钮
showShareMenu()
</script>
<style scoped lang="scss">
@import './index.scss'
</style>
