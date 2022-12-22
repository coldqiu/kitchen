<template>
  <view id="id-ball" :class="['basket_icon', basket.length > 0 ? 'show' : 'hide']"
    :style="{ bottom: `${150 + paddingBottom}rpx` }">
    <view @tap="navigateToBasketPage" class="icon iconfont .icon-31shezhi"></view>
    <view class="ball-container">
      <view class="item" v-for="(ball, index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <view :style="{ animationDuration: '0.8s', transitionDuration: '0.8s' }" class="ball" v-show="ball.show">
            <view class="inner inner-hook"></view>
          </view>
        </transition>
      </view>
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
let _timer = ref(null)
useReady(() => {
  const query = createSelectorQuery()
  query.select('#id-ball').boundingClientRect(function (res) {
    endPos = { x: res.right, y: res.top }
  })
  _timer.value = setTimeout(() => {
    query.exec()
    // 因为 元素上有修改dom的动画 600ms 【tips】
  }, 900)
})
useUnload(() => {
  clearTimeout(_timer.value)
})

// const ball = ref(null)
const initBall = new Array(5).fill(0).map(item => {
  return { show: false, pos: null }
})
const balls = ref(initBall)
const dropBalls = []
const { basket } = useBasket()

function navigateToBasketPage() {
  navigateTo({
    url: '/subpackages/pages/basketList/index'
  })
}
function drop(pos) {
  for (let i = 0; i < balls.value.length; i++) {
    let ball = balls.value[i]
    if (ball.show === false) {
      ball.pos = pos
      ball.show = true
      dropBalls.push(ball)
      return
    }
  }
}
// 小球动画
function beforeEnter(el) {
  let count = balls.value.length
  while (count--) {
    let ball = balls.value[count]
    if (ball.show) {
      const { x, y } = ball.pos
      el.style.display = '';
      // x y  需要减去 结束位置
      el.style.transform = `translate3d(0, ${y - endPos.y}px, 0)`;
      let inner = el.childNodes[0];
      inner.style.transform = `translate3d(${x - endPos.x}px, 0, 0)`;
    }
  }
}
function enter(el) {
  // 【tips】
  nextTick(() => {
    el.style.transform = 'translate3d(0, 0, 0)';
    let inner = el.childNodes[0];
    inner.style.transform = `translate3d(0, 0, 0)`;
  })

}
function afterEnter(el) {
  let ball = dropBalls.shift()
  if (ball) {
    ball.show = false
    el.style.display = 'none'
  }
}

// 向外暴露方法
defineExpose({
  drop
})
</script>
<style lang='scss' scoped>
@import './index.scss'

// transition: all 1.3s cubic-bezier(0.3, 0.5, 0.5, 3)
</style>