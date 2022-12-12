<template>
  <view class="page">
    <InfoNavigationBar title="玲龙一号”核反应堆，在海南正式开工" />
  </view>
</template>

<script>
export default {
  name: 'food-list'
}
</script>
<script setup>
import { useRouter } from '@tarojs/taro'
import InfoNavigationBar from '@/components/InfoNavigationBar/index.vue'
import './index.scss'

const router = useRouter()
console.log('router: ', router);
</script>
<style lang='scss' scoped>

</style>