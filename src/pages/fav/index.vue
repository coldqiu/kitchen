<template>
  <view class="page">
    <CompNavigationBar>
      <view class="search_wrap">
        <input @tap="navigateToSearch" class="search" />
        view.
      </view>
    </CompNavigationBar>
  </view>
</template>

<script>
export default {
  name: 'fav-page'
}
</script>
<script setup>
import CompNavigationBar from '@/components/CompNavigationBar/index.vue';


</script>
<style lang='scss' scoped>

</style>