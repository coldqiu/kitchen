<template>
  <!-- 源码：D:\00_Git\OpenSource\element-plus-3.0\packages\web\components\loading\index.ts -->
  <!-- vue3 实现 Vue.extend 功能，Vue3使用 createVNode render 两个api实现 -->
  <view class="loading_mask">
    <view class="loading_spinner">
      <text class="loading_text iconfont icon-loading2"></text>
      <!-- 拼命加载中 -->
    </view>
  </view>
</template>

<script>
// 指令没有 props, 这里这样写只是为了记录 指令元素上可配置的属性
//   loadingText: String,
//   loadingSpinner: String,
//   loadingBackground: String
//   解析指令挂载元素属性功能稍后添加
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'v-loading',
  mounted: () => {
    //
  }
}
</script>
<style scoped lang="scss">
@import './index.scss'
</style>
