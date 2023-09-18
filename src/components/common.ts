/**
 * https://github.com/Tencent/tdesign-vue/blob/2abe3ac321e7fe2ca3678a42ae631b811d3043af/src/common.ts
 */
import type { ScopedSlotReturnValue } from 'vue/types/vnode.d.ts'

export type TNodeReturnValue = ScopedSlotReturnValue
export type TNode<T = undefined> = T extends undefined
  ? (h: Vue.CreateElement) => TNodeReturnValue
  : (h: Vue.CreateElement, props: T) => TNodeReturnValue
