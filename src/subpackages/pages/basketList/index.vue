<template>
  <view class="page">
    <InfoNavigationBar title="food basket" />
    <view class="food_list" v-for="(itemA, index) in basket" :key="itemA.id">
      <view @tap="navigateToFoodInfo(itemA.id)" class="title">
        <view class="text"> {{ itemA.id }} </view>
        <view class="icon iconfont .icon-jiantouyou"></view>
      </view>
      <view class="button">
        <text @tap="handlerDel(itemA.id)" class="del">删除这个清单</text>
      </view>
      <view class="ul">
        <view v-show="!itemB.checked" class="li" v-for="itemB in itemA.list" :key="itemB.name">
          <view @tap="handlerCheck(itemB)" class="checkbox">
            <view v-if="itemB.checked" class="checked iconfont icon-aixin"></view>
            <view v-else class="check iconfont icon-aixin"></view>
          </view>
          <view class="name">{{ itemB.name }}</view>
          <view class="num">{{ itemB.num }}</view>
        </view>
        <button v-show="counterDone(itemA).length > 0" @tap="toggleFold(itemA)" hover-class="actived"
          hover-start-time="100" hover-stay-time="300">
          <view class="iconfont icon-jiantouyou"></view>
          <view class="text">已完成 <text>{{ counterDone(itemA).length > 0 ? counterDone(itemA).length : '' }}</text>
          </view>
        </button>
        <view v-show="!itemA.fold && counterDone(itemA).length > 0">
          <view v-show="itemC.checked" class="li" v-for="itemC in itemA.list" :key="itemC.name">
            <view @tap="handlerCheck(itemC)" class="checkbox">
              <view class="checked iconfont icon-aixin"></view>
            </view>
            <view class="name">{{ itemC.name }}</view>
            <view class="num">{{ itemC.num }}</view>
          </view>
        </view>
      </view>
      <view class="border" v-show="index !== basket.length - 1"></view>
    </view>
  </view>
</template>
  
<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'basket-icon'
}
</script>
<script setup>
import { navigateTo } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import { useBasket, } from '@/stores/basket.js'

const { basket, removeFromBasket } = useBasket()
function handlerCheck(item) {
  item.checked = !item.checked
}
// 计算已完成数据
function counterDone(list) {
  return list?.list.filter(item => item.checked)
}
// 切换折叠
function toggleFold(item) {
  item.fold = !item.fold
}
// 跳转详情页
function navigateToFoodInfo(id) {
  navigateTo({
    url: `/subpackages/pages/foodInfo/index?id=${id}`
  })
}
// 删除
function handlerDel(id) {
  removeFromBasket(id)
}

</script>
<style lang='scss' scoped>
@import './index.scss'
</style>