<template>
  <view class="food_class">
    <view class="wrap" v-for="itemA in foodList" :key="itemA.type">
      <view class="title">{{ itemA.type }}</view>
      <view class="list">
        <view :class="['item', itemB.checked === true ? 'checked' : '']" @tap="handleClick($event, itemB)"
          v-for="itemB in itemA.list" :key="itemB.name">
          {{ itemB.name }}
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { reactive, ref, defineEmits, toRaw } from 'vue'
import { vibrateShort } from '@tarojs/taro'
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}

export default {
  name: 'food-class',
}
</script>
<script setup>
const props = defineProps({
  list: {
    type: Array,
  }
})
const foodList = reactive(props.list)
const emit = defineEmits(['change'])
function handleClick(e, food) {
  food.checked = !food.checked
  let checkedList = []
  foodList[0].list.forEach(item => {
    if (item.checked) {
      checkedList.push(toRaw(item))
    }
  })
  foodList[1].list.forEach(item => {
    if (item.checked) {
      checkedList.push(toRaw(item))
    }
  })
  emit('change', checkedList)
  vibrateShort({ type: 'light' })
}

</script>
<style scoped lang="scss">
@import './index.scss'
</style>