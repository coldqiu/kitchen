import { defineStore } from 'pinia'
import { ref } from 'vue'

// 关于 collection 的数据结构暂时有两种思路，但向外的api必须是一致的
export const useColection = defineStore('collectList', () => {
  const colectionList = ref([allList, exampleCollection])
  // 列表 头部unshift

  const all = colectionList.value.find(item => item.id === '0')

  function addToColection(food, collectionId = '0') {
    if (all.list.findIndex(item => item.id === food.id) === -1) {
      all.list.unshift(food)
    }
    if (collectionId !== '0') {
      let current = getCurrentCollection(collectionId)
      if (current.list.findIndex(item => item.id === food.id) === -1) {
        current.list.unshift(food)
      }
    }
  }
  function delFromColection(food, collectionId = '0') {
    const indexAll = all.list.findIndex(item => item.id === food.id)
    all.list.splice(indexAll, 1)
    if (collectionId !== '0') {
      let current = getCurrentCollection(collectionId)
      if (current?.list.findIndex(item => item.id === food.id) !== -1) {
        let index = current?.list.findIndex(item => item.id === food.id)
        current.list.splice(index, 1)
      }
    }
  }

  function remove(food, fromId, toId) {
    delFromColection(food, fromId)
    addToColection(food, toId)
  }

  function getCurrentCollection(collectionId) {
    return colectionList.value.find(item => item.id === collectionId)
  }

  return { colectionList, all, addToColection, delFromColection, remove, getCurrentCollection }
})

// export function createFood(id) {
//   this.id = id
// }

const allList = {
  id: '0',
  title: '所有收藏',
  desc: '',
  type: 'public', // private
  list: [
    // {
    //   id: '',
    //   // link: '',
    //   cover: '',
    // }
  ]
}
const exampleCollection = {
  id: '1',
  title: 'example',
  desc: '描述信息',
  type: 'public', // private
  list: [
    // {
    //   id: '',
    //   // link: '',
    //   cover: '',
    // }
  ]
}

