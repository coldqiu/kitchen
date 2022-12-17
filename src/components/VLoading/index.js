import { render, createVNode } from 'vue'
import loadingVue from './index.vue'

export default {
  created(el, binding, vnode, prevVnode) {
    console.log('created: ');
    toggleLoading(el, binding)
  },
  mounted(el, binding, vnode, prevVnode) {
  },
  updated(el, binding, vnode, prevVnode) {
    console.log('updated: ');
    toggleLoading(el, binding)
  },
}

// jsx 即是 VNode
// const dom2 = <view class="loading" style={{  color: 'red }}></view >

function toggleLoading(el, binding) {
  // debugger;
  if (binding.value) {
    // el.style.overflow = 'hidden'
    if (!el.mask) {
      let view = document.createElement('view')
      render(createVNode(loadingVue), view)
      el.mask = view
      el.appendChild(view)
    } else {
      el.mask.style.display = 'block'
    }
  } else {
    if (el.mask && el.mask.style.display !== 'none') {
      el.mask.style.display = 'none'
    }
  }
}