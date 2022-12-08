<template>
  <view class="page">
    <CompNavigationBar :position="'sticky'">
      <view class="flex">
        发现
        <view @tap="navigateToSearch" class="search">搜索</view>
      </view>
    </CompNavigationBar>
    <view class="classWrap">
      <view class="title">热门分类</view>
      <view class="link">全部分类</view>
    </view>
    <view class="list">
      <view class="item" v-for="item in classData" :key="item">
        <div class="content">
          <div class="bottom">
            <div class="text">
              {{ item }}
            </div>
          </div>
        </div>
      </view>
    </view>
    <view class="long-list">
      <view class="item" v-for="item in longList" :key="item">
        <view class="content" :style="{ background: setColor(item) }">

        </view>
        <div class="text">{{ item }} </div>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'page-two'
}
</script>
<script setup>
import { ref } from 'vue'
import {
  usePullDownRefresh, useReachBottom, stopPullDownRefresh,
  hideLoading, showLoading, navigateTo
} from '@tarojs/taro'
import CompNavigationBar from '../../components/CompNavigationBar/index.vue';

import './index.scss'
const classData = new Array(12).fill(0).map((item, index) => { return index })
const initList = new Array(26).fill(0).map((item, index) => {
  return Math.random()
})
initList[0] = Math.random() + '_' + Math.random();

const longList = ref(initList)
usePullDownRefresh(() => {
  showLoading()
  setTimeout(() => {
    stopPullDownRefresh()
    hideLoading()
  }, 2000)
})

useReachBottom(() => {
  const list = new Array(20).fill(0).map((item, index) => {
    return Math.random()
  })
  showLoading()
  setTimeout(() => {
    hideLoading()
    longList.value = longList.value.concat(list)
  }, 2000)
})

function setColor(num) {
  return `rgba(89, 54, 124, ${num})`
}
// 跳转
function navigateToSearch() {
  navigateTo({
    url: '/subpackages/pages/search/index'
  })
}
</script>

