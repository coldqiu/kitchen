<template>
  <view class="page">
    <InfoNavigationBar title="结果搜索页" />
    <view class="label_wrap">
      <view class="add_wrap">
        <view @tap="navigateToAdd" class="label add">add
          <text class="iconfont icon-jia"></text>
        </view>
      </view>
      <view class="scroll_wrap">
        <scroll-view :scroll-x="true" :show-scrollbar="false">
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
import { ref } from 'vue'
import { useRouter, navigateTo, showToast } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import FoodList from '../search/FoodList/index.vue'

// 首页选择食材跳转
const { params } = useRouter()
const checkedList = ref(JSON.parse(params.list))
console.log('checkedList: ', checkedList);

const foodList = ref([])
foodList.value = new Array(10).fill(0).map((item, index) => { return index })

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