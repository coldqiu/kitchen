<template>
  <view class="page">
    <!-- <scroll-view @scroll="pageScroll(e)"> -->
    <!-- <page-mate> -->
    <!-- navigation-bar  page-meate 仅支持 微信小程序，非常局限 -->
    <CompNavigationBar :position="'sticky'">
      <view class="flex">
        find
        <view @tap="navigateToSearch()" class="search">
          <text class="iconfont icon-sousuo"></text>
        </view>
      </view>
    </CompNavigationBar>
    <view class="classWrap">
      <view class="title">{{ randomText(0, 8) }}</view>
      <view @tap="navigateToClass" class="link">{{ randomText(0, 6) }}</view>
    </view>
    <view class="list">
      <view @tap="navigateToSearch(item)" class="item" v-for="item in classData" :key="item">
        <div class="content">
          <div class="bottom">
            <div class="text"> {{ item }} </div>
          </div>
        </div>
      </view>
    </view>
    <view title="title" class="long-list" v-loading="loading">
      <view @tap="navigateFoodInfo(item)" class="item" v-for="item in longList" :key="item">
        <view class="content" :style="{ background: setColor(item) }"></view>
        <view class="text">{{ item }} </view>
      </view>
      <view class="botton_loading" v-loading="bottomLoading"></view>
    </view>
    <CompScrollTop :scrollTop="scrollTop" />
    <!-- </scroll-view> -->
    <!-- </page-mate> -->
    <!-- <BasketIcon /> -->
  </view>
</template>
<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'page-two'
}
</script>
<script setup>
import { ref } from 'vue'
import {
  usePullDownRefresh, useReachBottom, stopPullDownRefresh,
  hideLoading, showLoading, navigateTo, useReady, showShareMenu,
  useDidHide, useDidShow, startPullDownRefresh
} from '@tarojs/taro'
import CompNavigationBar from '@/components/CompNavigationBar/index.vue';
import CompScrollTop from '@/components/ScrollTop/index.vue'
import BasketIcon from '@/components/BasketIcon/index.vue'
import { randomText } from '@/utils/data.js'


const classData = new Array(12).fill(0).map((item, index) => { return index })
const initList = new Array(26).fill(0).map((item, index) => {
  return Math.random()
})
initList[0] = Math.random() + '_' + Math.random();
const scrollTop = ref(0)
const loading = ref(true)
const longList = ref([])
setTimeout(() => {
  stopPullDownRefresh()
  loading.value = false
  longList.value = initList
}, 800)
usePullDownRefresh(() => {
  loading.value = true
  longList.value = []
  setTimeout(() => {
    stopPullDownRefresh()
    loading.value = false
    longList.value = initList
  }, 1200)
})

const bottomLoading = ref(false)
useReachBottom(() => {
  const list = new Array(20).fill(0).map((item, index) => {
    return Math.random()
  })
  bottomLoading.value = true
  setTimeout(() => {
    bottomLoading.value = false
    longList.value = longList.value.concat(list)
  }, 300)

})

function setColor(num) {
  return `rgba(89, 54, 124, ${num})`
}
// 跳转
function navigateToSearch(name = '') {
  navigateTo({
    url: `/subpackages/pages/search/index?name=${name}`
  })
}
function navigateFoodInfo(food) {
  // 工具函数 拼接url 【待处理】
  navigateTo({
    url: `/subpackages/pages/foodInfo/index?id=${food}`
  })
}
// 跳转 
function navigateToClass() {
  navigateTo({
    url: '/subpackages/pages/foodClass/index'
  })
}
// 显示当前页面的转发按钮
showShareMenu()
function pageScroll(e) {
  console.log('e: ', e);
}
// 页面隐藏(超过3分钟)再次显示刷新数据
let hideTime = Date.now()
useDidHide(() => {
  hideTime = Date.now()
})
useDidShow(() => {
  if (Date.now() - hideTime > 1000 * 60 * 5) {
    startPullDownRefresh()
    loading.value = true
    longList.value = []
    setTimeout(() => {
      stopPullDownRefresh()
      loading.value = false
      longList.value = initList
    }, 1200)
  }
})
</script>


<style scoped lang="scss">
@import './index.scss'
</style>
