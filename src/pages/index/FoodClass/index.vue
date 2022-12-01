<template>
  <view class="food_class">
    <!-- <text>page3 HRM</text> -->
    <view class="wrap" v-for="itemA in list" :key="itemA.type">
      <view class="title">{{ itemA.type }}</view>
      <view class="list">
        <view class="item" v-for="itemB in itemA.list" :key="itemB">
          {{ itemB }}
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import './index.scss'

export default {
  name: 'food-class',
}
</script>
<script setup>
defineProps({
  list: {
    type: Array,
  }
})
</script>
