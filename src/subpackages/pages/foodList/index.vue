<template>
  <view class="page">
    <InfoNavigationBar :title="colletion.title" />
    <FoodList @to-food-info="navigateToFoodInfo" :foodList="colletion.list" />
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
import { navigateTo, useRouter } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import FoodList from '../search/FoodList/index.vue'
import { useColection } from '@/stores/collect'

const { all, getCurrentCollection } = useColection()
const { params } = useRouter()
const colletion = getCurrentCollection(params?.collectionId)
console.log('colletion: ', colletion);

// 跳转
function navigateToFoodInfo(food) {
  navigateTo({
    url: `/subpackages/pages/foodInfo/index?id=${food.id}`
  })
}
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>