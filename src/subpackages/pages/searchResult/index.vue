<template>
  <view class="page">
    <InfoNavigationBar title="搜索结果" />
    <view class="label_wrap">
      <view class="add_wrap">
        <view @tap="navigateToAdd" class="label add">add
          <text class="iconfont icon-jia"></text>
        </view>
      </view>
      <view class="scroll_wrap">
        <scroll-view class="scroll_view" :scroll-x="true" :show-scrollbar="false" enhanced="true"
          :style="{ width: `calc(100vw - 185rpx)` }">
          <view class="ul">
            <view v-for="(item, index) in checkedList" :key="item.name" class="li">
              <view class="label">
                {{ item.name }}
                <view @tap="handlerDelete(item, index)" class="iconfont icon-shanchu"></view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="size_box"></view>
    <FoodList @to-food-info="navigateToFoodInfo" :foodList="foodList" v-loading="loading" />
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
import { ref } from 'vue'
import { useRouter, navigateTo, showToast } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import FoodList from '../search/FoodList/index.vue'

// loading
const loading = ref(true)
// 首页选择食材跳转
const { params } = useRouter()
const checkedList = ref(JSON.parse(params.list))

const foodList = ref([])
const initFoodList = new Array(10).fill(0).map((item, index) => { return index })

setTimeout(() => {
  loading.value = false
  foodList.value = initFoodList
}, 500)

// 跳转
function navigateToFoodInfo(id) {
  navigateTo({
    url: `/subpackages/pages/foodInfo/index?id=${id}`
  })
}
// 删除食材
function handlerDelete(item, index) {
  if (checkedList.value.length === 1) {
    showToast({
      icon: 'error',
      title: '至少保留一个'
    })
  } else {
    checkedList.value.splice(index, 1)
    loading.value = true
    foodList.value = []
    setTimeout(() => {
      loading.value = false
      foodList.value = initFoodList
    }, 500)
  }
}
// 跳转
function navigateToAdd() {
  navigateTo({
    url: `/subpackages/pages/add/index`
  })
}


</script>
<style lang='scss' scoped>
@import './index.scss'
</style>