<template>
  <view class="page">
    <InfoNavigationBar :title="navigationTitle" />
    <view class="label_wrap">
      <view class="add_wrap">
        <view class="label add">add
          <text class="iconfont icon-jia"></text>
        </view>
      </view>
      <scroll-view :scroll-x="true" :show-scrollbar="false">
        <view class="ul">
          <view v-for="item in checkedList" :key="item.name" class="li">
            <view class="label">
              {{ item.name }}
              <view class="iconfont icon-shanchu"></view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="size_box"></view>
    <FoodList @to-food-info="navigateToFoodInfo" :foodList="foodList" />
  </view>
</template>


<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'search-result'
}
</script>
<script setup>
import { ref, computed, watchEffect, watch } from 'vue'
import { useRouter, navigateTo } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import FoodList from '../search/FoodList/index.vue'

// 首页选择食材跳转
const { params } = useRouter()
let checkedList = JSON.parse(params.list)
console.log('checkedList: ', checkedList);

const foodList = ref([])
foodList.value = new Array(10).fill(0).map((item, index) => { return index })

// 跳转
function navigateToFoodInfo(id) {
  navigateTo({
    url: `/subpackages/pages/foodInfo/index?id=${id}`
  })
}

</script>
<style lang='scss' scoped>
@import './index.scss'
</style>