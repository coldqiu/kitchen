<template>
  <view class="page">
    <CompNavigationBar :position="'sticky'">
      <view class="flex">
        Home
        <view :class="['search', scrollTop > 100 ? 'show' : '']">搜索</view>
      </view>
    </CompNavigationBar>

    <view class="input">
      <view class="flex">
        <view class="icon">icon</view>
        <view class="text">搜索AA</view>
      </view>
    </view>
    <view class="hi">厨房里有什么？</view>
    <view class="voice">
      <view class="desc">点击说出多个食材</view>
      <div class="ps">如：土豆、番茄、牛肉等</div>
      <div class="icon">icon</div>
    </view>
    <view class="hi">选食材</view>
    <view class="food_class_wrap">
      <FoodClass :list="foodClass" @change="handleChange" />
    </view>
    <view :class="['search_wrap', checkedCount > 0 ? 'show' : '']">
      <view class="text">
        搜索
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
import { useReady, usePageScroll } from '@tarojs/taro'
import CompNavigationBar from '../../components/CompNavigationBar/index.vue';
import FoodClass from './FoodClass/index.vue'

useReady(() => {
  // console.log('useReady: ', useReady);
})
// 造数据
const temp = 'abcdefghijklmnopqrstuvwxyz'
const tempLower = new Array(12).fill(0).map(() => {
  let index = Math.ceil(Math.random() * 16)
  let length = Math.ceil(4 + Math.random() * 6)
  return {
    checked: false, name: temp.slice(index, index + length)
  }
})
const tempUpper = new Array(12).fill(0).map(() => {
  let index = Math.ceil(Math.random() * 16)
  let length = Math.ceil(4 + Math.random() * 6)
  return {
    checked: false, name: temp.slice(index, index + length)
  }
})
const foodClass = [
  { type: '蔬菜', list: tempLower },
  { type: '肉类', list: tempUpper }
]
// 选中食材
const checkedCount = ref(0)
function handleChange(count) {
  console.log('count: ', count);
  checkedCount.value = count
}
// usePageScroll 顶部搜索图标 动画
const scrollTop = ref(0)
usePageScroll(res => {
  console.log('res: ', res);
  scrollTop.value = res.scrollTop
  // if (res.scrollTop > 100) 
})
// 点击搜索框 重置选中食材
</script>
