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

export {
  tempLower, tempUpper
}

export const tabbarList = [
  {
    pagePath: '/pages/index/index',
    selectedIconPath: './images/index_actived.png',
    iconPath: './images/index.png',
    iconfont: 'icon-shouye',
    text: '首页'
  },
  {
    pagePath: '/pages/two/index',
    selectedIconPath: './images/quanbu_actived.png',
    iconPath: './images/quanbu.png',
    iconfont: 'icon-all-fill',
    text: '发现'
  }
]