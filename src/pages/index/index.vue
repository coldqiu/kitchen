<template>
  <view class="page">
    <CompNavigationBar :position="'sticky'">
      <view class="flex">
        Home
        <view class="search">搜索</view>
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
      <FoodClass :list="foodClass" />
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
import { useReady } from '@tarojs/taro'
import CompNavigationBar from '../../components/CompNavigationBar/index.vue';
import FoodClass from './FoodClass/index.vue'

useReady(() => {
  // console.log('useReady: ', useReady);
})
const temp = 'abcdefghijklmnopqrstuvwxyz'
const tempLower = new Array(12).fill(0).map(() => {
  let index = Math.ceil(Math.random() * 16)
  let length = Math.ceil(4 + Math.random() * 6)
  return temp.slice(index, index + length)
})
console.log('tempLower: ', tempLower);
const tempUpper = new Array(12).fill(0).map(() => {
  let index = Math.ceil(Math.random() * 16)
  let length = Math.ceil(4 + Math.random() * 6)
  return temp.slice(index, index + length).toUpperCase()
})
const foodClass = [
  { type: '蔬菜', list: tempLower },
  { type: '肉类', list: tempUpper }
]
</script>
