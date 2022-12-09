<template>
  <view class="inline_list_container" :style="{ zIndex: zIndex }">
    <div class="inline_list">
      <view class="title">
        <view class="text">搜索历史</view>
        <view class="cancel">清空</view>
      </view>
      <view class="list">
        <view @tap="handlerClick(item)" class="item" v-for="item in tempSearchHistory" :key="item.name">{{ item.name }}
        </view>
      </view>
    </div>
    <div class="inline_list">
      <view class="title">
        <view class="text">热门搜索</view>
      </view>
      <view class="list">
        <view @tap="handlerClick(item)" class="item" v-for="item in tempHotList" :key="item.name">{{ item.name }}</view>
      </view>
    </div>
  </view>
</template>

<script>
import './index.scss'
export default {
  name: 'inline-list'
}
</script>

<script setup>
import { ref } from 'vue'
import { getStorageSync, setStorageSync } from '@tarojs/taro';
// 假数据
import { tempLower, tempUpper } from '@/utils/data'

const tempSearchHistory = tempLower.slice(0, 5)
const tempHotList = tempUpper.concat(tempLower)
defineProps({
  zIndex: String
})
// 作为业务组件，在组件内获取数据,不适用props传入
const searchHistory = ref(getStorageSync('searchHistory'))

// 点击 菜名,向外抛出事件
const emit = defineEmits(['checked'])
function handlerClick(item) {
  emit('checked', item)
}

</script>
