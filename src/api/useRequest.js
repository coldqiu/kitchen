import { ref } from 'vue'
import { request } from '@tarojs/taro'


export default function useRequest() {
  const loading = ref(false)

  function ajax(options) {
    // debugger
    return new Promise(function (resolve, reject) {
      loading.value = true
      console.log(' loading.value  true: ');
      request({
        ...options,
        success: (res) => {
          // loading.value = false
          setTimeout(() => {
            // resolve(res)
            resolve(1)
            loading.value = false
          }, 1000)
        },
        fail: (res) => {
          setTimeout(() => {
            reject(res)
            loading.value = false

          }, 1000)
        },
        complete: (res) => {
          setTimeout(() => {
            reject(res)
            loading.value = false
          }, 1000)
          // options.complete(res)
        }
      })
    })
  }

  return [ajax, loading]
}


