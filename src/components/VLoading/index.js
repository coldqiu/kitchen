import { render, createVNode } from 'vue'
import loadingVue from './index.vue'
import { getStyle, addClass } from '@/utils/dom'

export default {
  created(el, binding, vnode, prevVnode) {
 
  },
  mounted(el, binding, vnode, prevVnode) {
    el.originalPosition = getStyle(el, 'position')
    el.originalOverflow = getStyle(el, 'overflow');
    toggleLoading(el, binding)
  },
  updated(el, binding, vnode, prevVnode) {
    toggleLoading(el, binding)
  },
}

function toggleLoading(el, binding) {
  if (binding.value) {
    // el.style.overflow = 'hidden'
    if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed' && el.originalPosition !== 'sticky') {
      addClass(el, 'loading-parent--relative');
    }
    const top = el.getAttribute('top')
    if (!el.mask) {
      let view = document.createElement('view')
      view.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #ffffff;
      `
      render(createVNode(loadingVue), view)
      el.mask = view
      if (top) {
        view.style.paddingTop = top
      }
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

// jsx 即是 VNode
// const dom2 = <view class="loading" style={{  color: 'red }}></view >