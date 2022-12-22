<template>
  <view id="id-ball" :class="['basket_icon', basket.length > 0 ? 'show' : 'hide']"
    :style="{ bottom: `${150 + paddingBottom}rpx` }">
    <view @tap="navigateToBasketPage" class="icon iconfont .icon-31shezhi"></view>
    <view class="ball-container">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <view :style="{ transitionDuration: '0.6s' }" class="ball" v-show="ball.show">
          <view :style="{ transitionDuration: '0.6s' }" class="inner inner-hook"></view>
        </view>
      </transition>
    </view>
  </view>
</template>
  
<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'basket-icon'
}
</script>
<script setup>
import { ref } from 'vue'
import { navigateTo, useReady, createSelectorQuery, useUnload, nextTick } from '@tarojs/taro'
import { useBasket } from '@/stores/basket.js'

const props = defineProps({
  paddingBottom: {
    type: Number,
    default: 0
  }
})

// 动画结束小球位置 获取节点位置信息
let endPos = {}
useReady(() => {
  const query = createSelectorQuery()
  query.select('#id-ball').boundingClientRect(function (res) {
    endPos = { x: 0, y: res.top }
    // console.log('endPos: ', endPos);
  })
  query.exec()
})

const ball = ref({ show: false, pos: null })
const { basket } = useBasket()

function navigateToBasketPage() {
  navigateTo({
    url: '/subpackages/pages/basketList/index'
  })
}

function drop(pos) {
  // debugger;
  if (ball.value.show === false) {
    ball.value.pos = pos
    ball.value.show = true
  }
}
// 小球动画
function beforeEnter(el) {
  // if (ball.value.show) {
  // const { x, y } = ball.value.pos
  // console.log("all.value.pos", ball.value.pos)
  let x = ball.value.pos.x - endPos.x + 30
  let y = ball.value.pos.y - endPos.y - 7.5
  // console.log("x,y", x, y)
  // el.style.display = '';
  el.style.display = 'block';
  // x y  需要减去 结束位置
  let inner = el.childNodes[0];
  el.style.transform = `translate3d(0, ${y}px, 0)`;
  inner.style.transform = `translate3d(${x}px, 0, 0)`;
  // debugger;
  // }
}
function enter(el) {
  // 【tips】
  // debugger;
  nextTick(() => {
    let inner = el.childNodes[0]
    el.style.transform = 'translate3d(0, 0, 0)';
    inner.style.transform = `translate3d(0, 0, 0)`;
  })
}
function afterEnter(el) {
  // el.style.display = 'none'
  ball.value.show = false

}

// 向外暴露方法
defineExpose({
  drop
})
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>