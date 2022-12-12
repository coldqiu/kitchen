<template>
  <view class="page">
    <CompNavigationBar :position="'sticky'">
      <view class="flex">
        find
        <view @tap="navigateToSearch" class="search">
          <text class="iconfont icon-sousuo"></text>
        </view>
      </view>
    </CompNavigationBar>
    <view class="classWrap">
      <view class="title">{{ randomText(0, 8) }}</view>
      <view class="link">{{ randomText(0, 6) }}</view>
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
      <view @tap="navigateFoodInfo(item)" class="item" v-for="item in longList" :key="item">
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
  hideLoading, showLoading, navigateTo, useReady, showShareMenu
} from '@tarojs/taro'
import CompNavigationBar from '@/components/CompNavigationBar/index.vue';
import { randomText } from '@/utils/data.js'
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
function navigateFoodInfo(food) {
  // 工具函数 拼接url 【待处理】
  navigateTo({
    url: `/subpackages/pages/foodInfo/index?id=${food}`
  })
}
// 显示当前页面的转发按钮
showShareMenu()
</script>

