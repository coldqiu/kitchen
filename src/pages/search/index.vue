<template>
  <view class="page">
    <CompNavigationBar>
      <view class="flex">
        <view class="title">
          {{ navigationTitle }}
        </view>
        <view class="menu_wrap">
          <view class="capsule">
            <!-- <button class="back button">B</button>
            <view class="line"></view>
            <button class="home button">H</button> -->
            <view class="back button">B</view>
            <view class="line"></view>
            <view class="home button">H</view>
          </view>
        </view>
      </view>
      <view class="search" :style="{ top: navigationBarAndStatusBarHeight + 'px' }">
        <view class="input_wrap">
          <input @focus="focusInput" class="input" placeholder="今天想吃点啥？" />
          <view class="clear">x</view>
          <view class="submit">搜索</view>
          <view class="cancel">取消</view>
        </view>
        <view class="result_wrap">
          <view class="link_list">
            <view class="item">A</view>
            <view class="item">B</view>
            <view class="item">C</view>
            <view class="item">D</view>
            <view class="item">E</view>
          </view>
          <view class="food_list"></view>
        </view>
      </view>
    </CompNavigationBar>

  </view>
</template>

<script>
import './index.scss'

export default {
  name: 'search-page',
}
</script>
<script setup>
import { ref } from 'vue'
import CompNavigationBar from '../../components/CompNavigationBar/index.vue';
import { getStorageSync } from '@tarojs/taro';

const statusBarHeight = getStorageSync('statusBarHeight')
const navigationBarHeight = getStorageSync('navigationBarHeight')
const navigationBarAndStatusBarHeight = statusBarHeight + navigationBarHeight
console.log('navigationBarAndStatusBarHeight: ', navigationBarAndStatusBarHeight);

const navigationTitle = ref('菜谱搜索')

function focusInput(e) {
  console.log('focusInput: ', focusInput, e);
}
</script>
