<template>
  <view class="page">
    <CompNavigationBar>
      <view class="flex">
        <view class="title">
          {{ navigationTitle }}
        </view>
        <view class="menu_wrap">
          <view class="capsule">
            <!-- <button class="back button">B</button>
            <view class="line"></view>
            <button class="home button">H</button> -->
            <view @tap="handlerBack" class="back button">B</view>
            <view class="line"></view>
            <view class="home button">H</view>
          </view>
        </view>
      </view>
    </CompNavigationBar>
    <view class="search" :style="{ top: navigationBarAndStatusBarHeight + 'px' }">
      <view class="input_wrap">
        <input :value="inputValue" @blur="inputBlur" @change="inputChange" ref="$refInput" @focus="inputFocus"
          class="input" placeholder="今天想吃点啥？" />
        <view @tap="handlerClear" class="clear"></view>
        <view @tap="handerSubmit" class="submit">搜索</view>
        <view class="cancel">取消</view>
      </view>
      <view v-if="linkListVisible" class="result_wrap">
        <view class="link_list">
          <view @tap="clickLink(item)" v-for="item in linkList" :key="item" class="item">{{ item }}</view>
        </view>
      </view>
      <view v-if="foodListVisible" class="food_list">
        <view class="tab">
          <view v-for="item in tabList" :key="item.type" :class="['item', currentTab === item.type ? 'actived' : '']">{{
              item.title
          }}
          </view>
        </view>
        <view class="list">
          <view v-for="item in tempUpper" :key="item.name" class="item">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <view class="size_block"></view>

    <InlineList />
  </view>
</template>

<script>
import './index.scss'

export default {
  name: 'search-page',
}
</script>
<script setup>
import { ref, onMounted } from 'vue'
import CompNavigationBar from '../../components/CompNavigationBar/index.vue';
import InlineList from './InlineList/index.vue'
import { getStorageSync, navigateBack, setStorageSync } from '@tarojs/taro';
import { tempUpper } from '../../utils/data'

const statusBarHeight = getStorageSync('statusBarHeight')
const navigationBarHeight = getStorageSync('navigationBarHeight')
const navigationBarAndStatusBarHeight = statusBarHeight + navigationBarHeight
console.log('navigationBarAndStatusBarHeight: ', navigationBarAndStatusBarHeight);

const navigationTitle = ref('菜谱搜索')
const linkListVisible = ref(false)
const foodListVisible = ref(true)

// input 相关
const isInputFocus = ref(true)
const inputValue = ref('')
const $refInput = ref(null)
// 默认进入搜索页时focus input
onMounted(() => {
  // $refInput.value
  $refInput.value.focus()
})
function inputFocus(e) {
  isInputFocus.value = true;
}
function inputBlur(e) {
  isInputFocus.value = false;
}
function inputChange(e) {
  let value = e.target.value.trim()
  inputValue.value = value
}

// 关联结果列表
const linkList = ref('ABCDE'.split(""))
// 点击关联结果
function clickLink(link) {
  linkListVisible.value = false
  foodListVisible.value = true
}


// if (inputValue.value.length > 0 && isInputFocus) {
//     linkListVisible.value = true
//   } else {
//     linkListVisible.value = false
//   }

// 返回
function handlerBack() {
  // 处理 直接进入search页的情况，路由栈中只有当前一条数据
  // 分享了 search页，打开分享链接，左上角之后 返回home按钮（返回按钮不显示）
  // 【待处理】
  navigateBack()
}
// 清除输入框数据
function handlerClear() {
  inputValue.value = ''
  console.log('inputValue.value:handlerClear ', inputValue.value);
}
// 提交搜索 记录到storage 最多保存6个数据
// 需要LRU算法【待处理】
function handerSubmit() {
  let list = getStorageSync('searchHistory')
  if (!list) {
    setStorageSync('searchHistory', [])
  }

  setStorageSync(list.push(inputValue.value))
}

// Tab页
const tabList = [
  { type: 'normal', title: '综合' },
  { type: 'rating', title: '评分最高' },
  { type: 'flow', title: '做过最多' },
]
const currentTab = ref('normal')

// foodList滚动 需要动态设置dom的高度 【待处理】

</script>
