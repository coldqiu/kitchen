<template>
  <view class="collection_folder">
    <view class="info_button">
      <view v-show="visibleButton" class="wrap">
        <view class="message">
          <text class="icon iconfont icon-closefill"></text>
          <text class="text">收藏成功</text>
        </view>
        <view @tap="toggleFolder" class="link">
          <text text="text">加入收藏夹</text>
          <text class="icon iconfont icon-jiantouyou"></text>
        </view>
      </view>
    </view>
    <view v-if="visibleFolder" class="folder">
      <view @tap="toggleFolder" class="folder_mask" catchtouchmove="true"></view>
      <view class="content">
        <view class="title">
          <text class="text">选择菜单</text>
          <view @tap="createNewMenu" class="button">创建新菜单</view>
        </view>
        <view class="list">
          <view @tap="selectCollection(item)" v-for="item in colectionList" :key="item.id" class="item">
            <view class="info">
              <view class="img"></view>
              <text class="text">{{ item.title }}</text>
            </view>
            <view class="icon iconfont icon-aixin"></view>
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
  name: 'food-list'
}
</script>
<script setup>
import { ref } from 'vue'
import { setPageStyle, showToast } from '@tarojs/taro'
import { useColection } from '@/stores/collect'

const props = defineProps({
  foodInfo: Object
})
const { colectionList, addToColection } = useColection()


let _timer = null
const visibleButton = ref(false)
function showToggle() {
  visibleButton.value = !visibleButton.value
  _timer = setTimeout(() => {
    visibleButton.value = false
    clearTimeout(_timer)
  }, 3000)
}

// 
const visibleFolder = ref(false)
function toggleFolder() {
  visibleFolder.value = !visibleFolder.value
  if (visibleFolder.value === true) {
    setPageStyle({ style: { overflow: 'hidden' } })
  } else {
    setPageStyle({ style: { overflow: 'auto' } })
  }
}
// 选择菜单
function selectCollection(collectionInfo) {
  addToColection(props.foodInfo, collectionInfo.id)
  toggleFolder()
}
// 创建新菜单
function createNewMenu() {
  showToast({ title: 'wait moment', icon: 'none' })
}
defineExpose({
  showToggle
})
</script>
<style scoped lang="scss">
@import './index.scss'
</style>