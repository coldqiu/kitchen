<template>
  <!-- element-ui loading 模板 -->
  <!-- 源码：D:\00_Git\OpenSource\element-plus-3.0\packages\web\components\loading\index.ts -->
  <!-- 指令不知组件没有 template render 等选项,不能创建vnode, 可以通过 h 函数创建 -->
  <div class="el-loading-mask" style="background-color: rgba(0, 0, 0, 0.8);">
    <div class="el-loading-spinner"><i class="el-icon-loading"></i>
      <p class="el-loading-text">拼命加载中</p>
    </div>
  </div>
</template>

<script>
// 指令没有 props, 这里这样写只是为了记录 指令元素上可配置的属性
//   loadingText: String,
//   loadingSpinner: String,
//   loadingBackground: String
export default {
  name: 'v-loading',
  mounted: (el, binding) => {
    console.log('el: , binding', el, binding);
  }
}
</script>

<style lang='scss' scoped>

</style>