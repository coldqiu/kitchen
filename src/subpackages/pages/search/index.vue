<template>
  <view class="page">
    <InfoNavigationBar :title="navigationTitle" />
    <view class="search" :style="{ top: navigationBarAndStatusBarHeight + 'px' }">
      <scroll-view @scroll="handlerScroll" :style="scrollViewHeight" :scroll-y="isScroll">
        <view class="input_wrap">
          <input :value="inputValue" @blur="inputBlur" @change="inputChange" ref="$refInput" @focus="inputFocus"
            class="input" placeholder="placeholder" />
          <!-- :focus="isInputFocus" -->
          <!-- 下面这里不应该使用 v-if, v-if 不渲染内容导致 上面的事件无法被触发 -->
          <view v-show="clearVisible" class="clear">
            <text @tap="handlerClear" class="icon iconfont icon-closefill"></text>
          </view>
          <view v-if="inputValue.length > 0" @tap="handerSubmit" class="submit">{{ randomText(0, 3) }}</view>
          <view v-if="!foodListVisible" @tap="handlerCancel" class="cancel">{{ randomText(3, 6) }}</view>
        </view>

        <view class="size_block"></view>

        <view v-if="linkListVisible" class="result_wrap">
          <view class="link_list">
            <view @tap="clickLink(item)" v-for="item in linkList" :key="item" class="item">{{ item }}</view>
          </view>
        </view>
        <view v-show="foodListVisible" class="food_list">
          <view :class="['tab', tabVisible ? 'show' : 'hide']">
            <view @tap="changeTab(item)" v-for="item in tabList" :key="item.type"
              :class="['item', currentTab === item.type ? 'actived' : '']">
              {{ item.title }}
            </view>
          </view>
          <FoodList @to-food-info="navigateToFoodInfo" :foodList="foodList" />
          <!-- search page 的交互感觉有点不流畅【待优化】 代码组织形式可以优化【待优化】 -->
        </view>
        <!-- <view class="safe_area"></view> -->
      </scroll-view>
    </view>
    <view class="size_block"></view>

    <InlineList @checked="handlerChecked" zIndex="10" />
  </view>
</template>

<script>
if (process.env.TARO_ENV === 'weapp') {
  require('./index.scss')
}
export default {
  name: 'search-page',
}
</script>
<script setup>
import { ref, computed, watchEffect, watch } from 'vue'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import InlineList from './InlineList/index.vue'
import FoodList from './FoodList/index.vue'
import {
  getStorageSync, nextTick, useRouter, navigateTo
} from '@tarojs/taro';
import { randomText } from '@/utils/data'

const statusBarHeight = getStorageSync('statusBarHeight')
const navigationBarHeight = getStorageSync('navigationBarHeight')
const navigationBarAndStatusBarHeight = statusBarHeight + navigationBarHeight

const navigationTitle = ref('food search page')
const linkListVisible = ref(false)
const foodListVisible = ref(false)

// input 相关
const isInputFocus = ref(false)
const inputValue = ref('')
const $refInput = ref(null)
// 默认进入搜索页时focus input
// 错误做法 应该使用 input 组件的 focus 属性
// 导致点击 link 时 触发 inputFocus() 原因未知
// useReady(() => {
//   console.log('$refInput.value.focus: ', $refInput.value.focus());
// })
// 暂时注释了 自动focus input 功能 【待处理】
function inputFocus(e) {
  isInputFocus.value = true
  foodListVisible.value = false
  if (inputValue.value.length > 0) {
    linkListVisible.value = true
  }
}
function inputBlur(e) {
  isInputFocus.value = false
  nextTick(() => {
    linkListVisible.value = false
  })
}
// 直接修改 inputValue 不触发 input change 事件
function inputChange(e) {
  foodListVisible.value = false
  let value = e.target.value.trim()
  inputValue.value = value
  if (value.length > 0) {
    linkListVisible.value = true
  } else {
    linkListVisible.value = false
  }
}
// 清除输入框数据
function handlerClear() {
  inputValue.value = ''
  linkListVisible.value = false
  foodListVisible.value = false

}
// 点击 取消 有两种状态导致不同结果：状态1，已经搜索过了，显示foodList
// 状态2，还没搜索，回到上一页；还要兜底特殊情况：当没有上一页时（分享了一个空白的搜索页） 【已处理】  

function handlerCancel() {
  linkListVisible.value = false
  foodListVisible.value = true
}
// 点击 搜索历史或热门搜索
function handlerChecked(checked) {
  inputValue.value = checked.name
  foodListVisible.value = true
  linkListVisible.value = false
}

// 清除Icon 搜索 取消 三者的显示、隐藏 
// 清除Icon显示：　inputValue.value.length > 0 && isInputFocus.value === true 时
// 搜索显示： inputValue.value.length > 0 
// 取消不显示： foodListVisible.value === true 时
const clearVisible = computed(() => {
  if (inputValue.value.length > 0 && isInputFocus.value === true) {
    return true
  } else {
    return false
  }
})
// watch(inputValue, (val) => {
// })

watchEffect(() => {
  // console.log('foodListVisible.value', foodListVisible.value)
  // console.log('linkListVisible.value: ', linkListVisible.value);
})

// 关联结果列表
const linkList = ref('ABCDE'.split(""))
// 点击关联结果
function clickLink(link) {
  console.log('clickLink: ', link);
  inputValue.value = link
  foodListVisible.value = true
}

// 提交搜索 记录到storage 最多保存6个数据
// 需要LRU算法【待处理】
function handerSubmit() {
  linkListVisible.value = false
  foodListVisible.value = true
  // let list = getStorageSync('searchHistory')
  // if (!list) {
  //   setStorageSync('searchHistory', [])
  //   list = []
  // }
  // list.push(inputValue.value)

  // setStorageSync('searchHistory', list)
}

// Tab页
const tabList = [
  { type: 'normal', title: 'normal' },
  { type: 'rating', title: 'rating' },
  { type: 'flow', title: 'flow' },
]
const currentTab = ref('normal')
// 切换tab
function changeTab(tab) {
  currentTab.value = tab.type
}

const foodList = ref([])
foodList.value = new Array(10).fill(0).map((item, index) => { return index })

// foodList滚动 需要动态设置dom的高度 【待处理】【实现与参考小程序不同，不用处理】
// 设置scroll-view height
const isScroll = ref(false)
const scrollViewHeight = ref({})

watch(foodListVisible, (val) => {
  if (val) {
    scrollViewHeight.value = { height: `calc(100vh - 60px)` }
    isScroll.value = true

  } else {
    scrollViewHeight.value = { height: '' }
    isScroll.value = false
  }
})
// foodList 滚动 设置 tab 动画 显示、隐藏
const scrollTop = ref(0)
const tabVisible = ref(true)
function handlerScroll(e) {
  let value = e.target.scrollTop
  if (value > 120) {
    if ((value - scrollTop.value) > 0) {
      tabVisible.value = false
    } else {
      tabVisible.value = true
    }
  }
  scrollTop.value = value
}
// url参数 处理各种参数跳转 search 页
const { params } = useRouter()
// 类别列表跳转
if (params.name && params.name.length > 0) {
  inputValue.value = params.name
  foodListVisible.value = true;
}
// 跳转
function navigateToFoodInfo(id) {
  navigateTo({
    url: `/subpackages/pages/foodInfo/index?id=${id}`
  })
}
</script>
<style scoped lang="scss">
@import './index.scss'
</style>