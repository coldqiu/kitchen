import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useColection = defineStore('collectList', () => {
  //
  const colectionList = ref([allList, exampleCollection])

  const all = colectionList.value.find(item => item.id === '0')

  function addToColection(food, collectionId = '0') {
    all.list.push(food)
    if (collectionId !== '0') {
      let current = getCurrentCollection(collecitonId)
      current?.list.push(food)
    }
  }
  function delFromColection(food, collecitonId) {
    const indexAll = all.list.findIndex(item => item.id === food.id)
    all.list.splice(indexAll, 1)

    if (collectionId !== '0') {
      let current = getCurrentCollection(collecitonId)
      let index = current?.list.findIndex(item => item.id === food.id)
      current.list.splice(index, 1)
    }
  }
  function remove(food, fromId, toId) {
    delFromColection(food, fromId)
    addToColection(food, toId)
  }

  function getCurrentCollection(collecitonId) {
    return colectionList.value.find(item => item.id === collecitonId)
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

