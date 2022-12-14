import index_actived from '@/custom-tab-bar/images/index_actived.png'
import index from '@/custom-tab-bar/images/index.png'
import quanbu_actived from '@/custom-tab-bar/images/quanbu_actived.png'
import quanbu from '@/custom-tab-bar/images/quanbu.png'
// 造数据
const temp = 'abcdefghijklmnopqrstuvwxyz'
const tempLower = new Array(12).fill(0).map(() => {
  let index = Math.ceil(Math.random() * 16)
  let length = Math.ceil(4 + Math.random() * 6)
  return {
    checked: false, name: temp.slice(index, index + length)
  }
})
const tempUpper = new Array(12).fill(0).map(() => {
  let index = Math.ceil(Math.random() * 16)
  let length = Math.ceil(4 + Math.random() * 6)
  return {
    checked: false, name: (temp.slice(index, index + length)).toUpperCase()
  }
})

const tempFoodClass = new Array(12).fill(0).map(() => {
  let index = Math.ceil(Math.random() * 16)
  let length = Math.ceil(3 + Math.random() * 3)
  return {
    checked: false, name: (temp.slice(index, index + length)).toUpperCase()
  }
})

export {
  tempLower, tempUpper, tempFoodClass
}

export const tabbarList = [
  {
    pagePath: '/pages/index/index',
    // selectedIconPath: './images/index_actived.png',
    selectedIconPath: index_actived,
    iconPath: index,
    // iconPath: './images/index.png',
    iconfont: 'icon-shouye',
    text: '首页'
  },
  {
    pagePath: '/pages/two/index',
    // selectedIconPath: './images/quanbu_actived.png',
    // iconPath: './images/quanbu.png',
    selectedIconPath: quanbu_actived,
    iconPath: quanbu,
    iconfont: 'icon-all-fill',
    text: '发现'
  },
  {
    pagePath: '/pages/fav/index',
    selectedIconPath: quanbu_actived,
    iconPath: quanbu,
    iconfont: 'icon-aixin',
    text: '收藏'
  }
]

export function randomText(start = 0, end = 25) {
  const temp = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
  return temp.slice(start, end)
}