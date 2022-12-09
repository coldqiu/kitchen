<template>
  <view class="page">
    <CompNavigationBar :position="'sticky'">
      <view class="flex">
        Home
        <view @tap="navigateToSearch" :class="['search', scrollTop > 100 ? 'show' : '']">
          <text class="iconfont icon-sousuo"></text>
        </view>
      </view>
    </CompNavigationBar>

    <view class="input">
      <view @tap="navigateToSearch" class="flex">
        <view class="icon">
          <text class="iconfont icon-sousuo"></text>
        </view>
        <view class="text">搜索AA</view>
      </view>
    </view>
    <view class="hi">厨房里有什么？</view>
    <view class="voice">
      <view class="desc">点击说出多个食材</view>
      <text class="ps">如：土豆、番茄、牛肉等</text>
      <text class="icon iconfont icon-maikefeng"></text>
    </view>
    <view class="hi">选食材</view>
    <view class="food_class_wrap">
      <FoodClass :list="foodClass" @change="handleChange" />
    </view>
    <view :class="['search_wrap', checkedCount > 0 ? 'show' : '']">
      <view class="text">
        查看搭配 <text class="count">{{ checkedCount }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import './index.scss'
export default {
  name: 'page-one',
}
</script>
<script setup>
import { ref } from 'vue'
import { useReady, usePageScroll, navigateTo } from '@tarojs/taro'
import CompNavigationBar from '../../components/CompNavigationBar/index.vue';
import FoodClass from './FoodClass/index.vue'
// 假数据
import { tempLower, tempUpper } from '../../utils/data'

useReady(() => {
  // console.log('useReady: ', useReady);
})

const foodClass = [
  { type: '蔬菜', list: tempLower },
  { type: '肉类', list: tempUpper }
]
// 选中食材
const checkedCount = ref(0)
function handleChange(count) {
  checkedCount.value = count
}
// usePageScroll 顶部搜索图标 动画
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

</script>
