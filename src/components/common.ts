/**
 * https://github.com/Tencent/tdesign-vue/blob/2abe3ac321e7fe2ca3678a42ae631b811d3043af/src/common.ts
 */
export type TNodeReturnValue = import('vue/types/vnode.d.ts').ScopedSlotReturnValue
export type TNode<T = undefined> = T extends undefined
  ? (h: Vue.CreateElement) => TNodeReturnValue
  : (h: Vue.CreateElement, props: T) => TNodeReturnValue
