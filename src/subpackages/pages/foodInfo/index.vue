<template>
  <view class="page">
    <InfoNavigationBar :title="params.id" />
    <image src="https://cdn.coldqiu.com/136145419569074941.jpg"></image>
    <view class="food_title">
      <view class="title">{{ params.id }}</view>
      <view class="desc_wrap">
        <text class="rating">8.0综合评分</text>
        <text class="dot">·</text>
        <text class="done_count">16人最近7天做过</text>
      </view>
    </view>
    <view class="member_wrap">
      <view class="list">
        <view class="item">
          <view class="content">
            <view class="img">
              <image src=""></image>
            </view>
            <view class="name">
              I am Iron Man.
            </view>
          </view>
          <view @tap="handlerClick" class="follow">follow</view>
        </view>
        <view class="desc">
          描述一词的说明：描述某人/某事物的文字或演讲；用文字写出或说出某人/某物的样子的行为
        </view>
      </view>
    </view>
    <view class="materials_wrap">
      <view class="title">
        <view class="text">materials</view>
        <view id="id-dom" @tap="handlerToggle" class="button">{{ isInBasket ? 'remove button' : 'add button' }}</view>
        <!-- <view id="id-dom" @tap="handlerToggle" class="button">{{ 'add button' }}</view> -->
      </view>
      <view class="list">
        <view v-for="(item, index) in tmpList" :key="item.name" class="item">
          <view class="name"> {{ params.id + '_' + index }}</view>
          <view class="num">{{ index }}</view>
        </view>
      </view>
    </view>
    <view class="step_wrap">
      <view class="list">
        <view v-for="(item, index) in tmpList" :key="item.name" class="item">
          <view class="title">step {{ index + 1 }}</view>
          <!-- <image width="100%" height="100vw" src="https://cdn.coldqiu.com/69eea64c6fdd43bd882f64bb016f1275.jpeg" /> -->
          <!-- background-image: url("https://cdn.coldqiu.com/69eea64c6fdd43bd882f64bb016f1275.jpeg"); -->
          <view class="img">

          </view>
          <view class="desc">{{ randomText(0, 25) }}</view>
        </view>
      </view>
      <view class="tips">
        <view class="title"> 小贴士</view>
        如果毛衣袖口或下摆失去了弹性，可在热水中浸泡20分钟，通风干燥处晾干后即可恢复弹性。
        <view class="content"></view>
      </view>
    </view>
    <view class="bottom_fixed">
      <view class="flex">
        <view @tap="CollectToggle" class="item">
          <text :class="['iconfont icon-aixin', hasCollected ? 'actived' : '']"></text>
          <text class="text"> {{ hasCollected ? '已收藏' : '收藏' }}</text>
        </view>
        <view @tap="handlerClick" class="item">
          <text class="iconfont icon-zhaoxiangji"></text>
          <text class="text">upload</text>
        </view>
        <view @tap="handlerClick" class="item">
          <text class="iconfont icon-shangchuan-"></text>
          <text class="text">share</text>
        </view>
      </view>
    </view>
    <!-- <BasketIcon :paddingBottom="100" ref="$refBasketIcon" /> -->
    <CollectionFolder :food-info="foodInfo" ref="$refCollectionFolder" />
  </view>
</template>
<!-- 页面有些臃肿 【待处理】 -->
<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'food-list'
}
</script>
<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter, createSelectorQuery, usePageScroll, nextTick, showToast } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import BasketIcon from '@/components/BasketIcon/index.vue'
import CollectionFolder from './CollectionFolder/index.vue'

import { tempUpper, randomText } from '@/utils/data.js'
import { useBasket, createFood } from '@/stores/basket'
import { useColection } from '@/stores/collect'

const { params } = useRouter()
const { basket, addToBasket, removeFromBasket, doneList } = useBasket()
const { colectionList, all: defaultCollect, addToColection, delFromColection } = useColection()

const tmpList = tempUpper.slice(0, 3)
// food信息
let foodInfo = new createFood(params.id)
// 获取节点位置信息
let startPos = {}
usePageScroll(() => {
  const query = createSelectorQuery()
  query.select('#id-dom').boundingClientRect(function (res) {
    startPos = { x: res.left, y: res.top }
  })
  query.exec()
})

const isInBasket = computed(() => {
  const index = basket.findIndex(item => item.id === params.id)
  if (index !== -1) {
    return true
  } else {
    return false
  }
})

const $refBasketIcon = ref(null)

// 加入、移除
function handlerToggle() {
  // console.log('isInBasket.value: ', isInBasket.value);
  showToast({
    icon: 'none',
    title: 'wait moment'
  })
  if (isInBasket.value) {
    handlerRemove()
  } else {
    handlerAdd()
  }
}
function handlerAdd() {
  addToBasket(foodInfo)
  // debugger;
  // $refBasketIcon.value.drop(startPos)
}
function handlerRemove() {
  removeFromBasket(params.id)
}
// 收藏
const hasCollected = computed(() => {
  const index = defaultCollect.list.findIndex(item => item.id === params.id)
  if (index !== -1) {
    return true
  } else {
    return false
  }
})
// 切换 收藏
const $refCollectionFolder = ref(null)
function CollectToggle() {
  // 应该有一个防抖逻辑，以及点击效果，参考抖音 【待处理】
  if (hasCollected.value) {
    delFromColection(foodInfo)
  } else {
    addToColection(foodInfo)
    $refCollectionFolder.value.showToggle()
  }
  // $refCollectionFolder.value.showToggle()
}
// 【待实现】
function handlerClick() {
  showToast({
    icon: 'none',
    title: 'wait moment'
  })
}
</script>
<style scoped lang="scss">
@import './index.scss'
</style>