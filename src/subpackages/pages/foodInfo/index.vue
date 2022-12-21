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
          <view class="follow">follow</view>
        </view>
        <view class="desc">
          描述一词的说明：描述某人/某事物的文字或演讲；用文字写出或说出某人/某物的样子的行为
        </view>
      </view>
    </view>
    <view class="materials_wrap">
      <view class="title">
        <view class="text">materials</view>
        <view v-if="!isInBasket" @tap="handlerAdd" class="button">add button</view>
        <view v-else @tap="handlerRemove" class="button">remove button</view>
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
        <view class="item">
          <text class="iconfont icon-aixin"></text>
          <text class="text">collect</text>
        </view>
        <view class="item">
          <text class="iconfont icon-zhaoxiangji"></text>
          <text class="text">upload</text>
        </view>
        <view class="item">
          <text class="iconfont icon-shangchuan-"></text>
          <text class="text">share</text>
        </view>
      </view>
    </view>
    <BasketIcon :paddingBottom="100" />
  </view>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'food-list'
}
</script>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import BasketIcon from '@/components/BasketIcon/index.vue'
import { tempUpper, randomText } from '@/utils/data.js'
import { useBasket, createFood } from '@/stores/basket'

const { params } = useRouter()
const { basket, addToBasket, removeFromBasket, doneList } = useBasket()
const tmpList = tempUpper.slice(0, 3)

function initIsIn() {
  const index = basket.findIndex(item => item.id === params.id)
  if (index !== -1) {
    return true
  } else {
    return false
  }
}

const isInBasket = ref(initIsIn())

function handlerAdd() {
  let food = new createFood(params.id)
  addToBasket(food)
  isInBasket.value = true
  console.log('basket: ', basket);

}
function handlerRemove() {
  removeFromBasket(params.id)
  isInBasket.value = false
}
</script>
<style scoped lang="scss">
@import './index.scss'
</style>