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