<template>
  <view class="food_class">
    <!-- <text>page3 HRM</text> -->
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
import { reactive, ref, defineEmits } from 'vue'
import { vibrateShort } from '@tarojs/taro'
import './index.scss'

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

const checkedCount = ref(0)
const emit = defineEmits(['change'])
function handleClick(e, food) {
  food.checked = !food.checked
  if (food.checked) {
    checkedCount.value = checkedCount.value + 1
  } else {
    checkedCount.value = checkedCount.value - 1;
  }
  emit('change', checkedCount.value)
  // vibrateShort({ type: 'light' })
}

</script>
