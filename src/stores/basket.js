import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useBasket = defineStore('basket', () => {
  //
  const basket = ref([food])
  // const basket = ref([])
  function addToBasket(food) {
    basket.value.push(food)
  }
  function removeFromBasket(id) {
    const index = basket.value.findIndex(item => item.id === id)
    basket.value.splice(index, 1)
  }

  const doneList = computed(() => {
    return basket.value.map(itemA => {
      itemA.list.map(itemB => {
        if (itemB.done === true) {
          return itemB
        }
      })
    })
  })

  return { basket, addToBasket, removeFromBasket, doneList }
})

const food = {
  foodName: 'name',
  id: 'id',
  list: [
    {
      name: 'Food materials1',
      num: '100克',
      done: false
    },
    {
      name: 'Food materials2',
      num: '200克',
      done: false
    },
    {
      name: 'Food materials3',
      num: '300克',
      done: false
    }
  ],
  fold: false
}

export function createFood(id) {
  this.foodName = id
  this.id = id
  let list = new Array(3).fill(0)
  let arr = list.map((item, index) => {
    return {
      name: `${index}_${id}`,
      num: index,
      done: false
    }
  })
  this.list = arr
}

// [待实现]store 的初始化数据来自 后端接口