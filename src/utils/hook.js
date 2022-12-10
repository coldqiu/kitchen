import { useLoad, useRouter, setStorageSync } from '@tarojs/taro'
import { useTabbarStore } from '@/stores/tabbar.js'
import { tabbarList } from './data'

export function useSetCurrentTab() {
  console.log('useSetCurrentTab: ');

  useLoad(() => {
    console.log('onLoad')
    const router = useRouter()
    // console.log('router: ', router);
    const tabbarStore = useTabbarStore()
    // console.log('tabbarStore: ', tabbarStore);
    console.log('router.path: ', router.path);
    tabbarList.forEach((item, index) => {
      // console.log(item.pagePath)
      if (item.pagePath === router.path) {
        tabbarStore.index = index
        console.log('index: ', index);
        setStorageSync('currentTabIndex', index)
        // console.log('setStorageSync index: ', index);
      }
    })
  })
}
