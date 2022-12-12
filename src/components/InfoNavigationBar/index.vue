<template>
  <view class="navigation_bar_wrap">
    <CompNavigationBar>
      <view class="flex">
        <view class="title">
          {{ props.title }}
          <!-- <view class="content"></view> -->
        </view>
        <view class="menu_wrap">
          <view class="capsule">
            <view v-if="backVisible" @tap="handlerBack" hover-class="hover_class_back" class="back button">
              <text class="iconfont icon-jiantou1"></text>
            </view>
            <view v-if="backVisible" class="line"></view>
            <view @tap="switchToHome" hover-class="hover_class_home" class="home button">
              <text class="iconfont icon-shouye"></text>
            </view>
          </view>
        </view>
      </view>
    </CompNavigationBar>
  </view>
</template>

<script>
export default {
  name: 'info-navigationbar'
}
</script>
<script setup>
import { ref } from 'vue'
import CompNavigationBar from '@/components/CompNavigationBar/index.vue';
import {
  navigateBack, switchTab, getCurrentPages
} from '@tarojs/taro';
import './index.scss'

const props = defineProps({
  title: String
})

// 返回
function handlerBack() {
  navigateBack()
}
// 返回首页
function switchToHome() {
  switchTab({
    url: '/pages/index/index'
  })
}
//获取当前页面栈，判断 back 是否显示
const pages = getCurrentPages()
const backVisible = ref(true)
if (pages.length === 1) {
  backVisible.value = false
}
</script>
<style lang='scss' scoped>

</style>