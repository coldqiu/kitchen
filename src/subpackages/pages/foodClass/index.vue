<template>
  <view class="page">
    <InfoNavigationBar title="food class" />
    <view class="food_class">
      <view class="class_wrap">
        <view class="list">
          <view @tap="handlerCurrentClass(item)" v-for="item in foodList" :key="item.name"
            :class="['item', activedClass === item.name ? 'actived' : '']">
            <view class="text">{{ item.name }}</view>
          </view>
        </view>
      </view>
      <view class="food_wrap">
        <view class="ul">
          <view v-for="(itemA, index) in activedClassList" :key="index" class="li">
            <view class="title">{{ itemA }}</view>
            <view class="list">
              <view v-for="itemB in tempList" :key="itemB" class="item">
                <view @tap="navigateToSearch(`${itemB}${itemA}`)" class="block">
                  {{ itemB }}{{ itemA }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'class-page'
}
</script>
<script setup>
import { ref } from 'vue'
import { pageScrollTo, navigateTo } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import { tempFoodClass } from '@/utils/data.js'

const foodList = []
let tmp = []
tempFoodClass.forEach(item => {
  if (tmp.includes(item.name) === false) {
    foodList.push(item)
    tmp.push(item.name)
  }
})
let tempList = new Array(12).fill(0).map((item, index) => { return index })


const initClass = tempFoodClass[0].name
const activedClass = ref(initClass)
const activedClassList = ref(initClass.split(""))
// 切换时 滚动条置顶
function handlerCurrentClass(item) {
  pageScrollTo({
    scrollTop: 0,
    duration: 0
  })
  activedClass.value = item.name
  activedClassList.value = item.name.split("")
}
// 跳转 search
function navigateToSearch(name) {
  navigateTo({
    url: `/subpackages/pages/search/index?name=${name}`
  })
}
</script>
<style scoped lang="scss">
@import './index.scss'
</style>