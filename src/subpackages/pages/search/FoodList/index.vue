<template>
  <div class="list_wrap">
    <view class="ul">
      <view @tap="handlerClick(item)" class="li" v-for="item in foodList" :key="item">
        <view class="img_wrap">
          <view class="image"></view>
        </view>
        <view class="content">
          <view class="title">{{ randomText(0, 25) }}</view>
          <text class="label">{{ randomText(0, 12) }}</text>
          <view class="rating">
            <view class="score">8.0分</view>
            <view class="count">100</view>
          </view>
          <view class="name">{{ randomText(6, 12) }}</view>
        </view>
      </view>
    </view>
    <!-- <view class="loading">
      loading
    </view> -->
  </div>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'inline-list'
}
</script>

<script setup>
import { randomText } from '@/utils/data'

const props = defineProps({
  zIndex: String,
  foodList: Array,
})
// 点击 菜名,向外抛出事件
const emit = defineEmits(['toFoodInfo'])
function handlerClick(item) {
  emit('toFoodInfo', item)
}

</script>
<style scoped lang="scss">
@import './index.scss'
</style>