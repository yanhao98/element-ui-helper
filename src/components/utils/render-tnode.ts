/**
 * https://github.com/Tencent/tdesign-vue/blob/6dde627d16b16970b44a236d386a25cfe87d68f7/src/utils/render-tnode.ts
 */
import { h } from 'vue'
import type { ScopedSlotReturnValue, VNode } from 'vue/types/vnode.d.ts'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'

export type VmType = Vue

interface JSXRenderContext {
  defaultNode?: VNode
  params?: Record<string, any>
  // 是否不打印 LOG
  silent?: boolean
  slotFirst?: boolean
}

/**
 * 通过JSX的方式渲染 TNode，props 和 插槽同时处理，也能处理默认值为 true 则渲染默认节点的情况
 * @param vm 组件实例
 * @param name 插槽和属性名称
 * @param options 值可能为默认渲染节点，也可能是默认渲染节点和参数的集合
 * @example renderTNodeJSX(this, 'closeBtn')  优先级 props function 大于 插槽
 * @example renderTNodeJSX(this, 'closeBtn', <t-icon-close />)。 当属性值为 true 时则渲染 <t-icon-close />
 * @example renderTNodeJSX(this, 'closeBtn', { defaultNode: <t-icon-close />, params })。 params 为渲染节点时所需的参数
 */
export const renderTNodeJSX = (vm: VmType, name: string, options?: ScopedSlotReturnValue | JSXRenderContext) => {
  // 是否静默日志
  // const isSilent = Boolean(isObject(options) && 'silent' in options && options.silent);

  // if (vm.$scopedSlots[name] && vm[name] && vm[name] !== true && !isSilent) {
  //   console.warn(`Both $scopedSlots.${name} and $props.${name} exist, $props.${name} is preferred`);
  // }
  const params = typeof options === 'object' && 'params' in options! ? options.params : null
  const slotFirst = typeof options === 'object' && 'slotFirst' in options! ? options.slotFirst : false
  const defaultNode = typeof options === 'object' && 'defaultNode' in options! ? options.defaultNode : options
  const propsNode = vm[name as keyof typeof vm]
  if (propsNode === false) return
  if (propsNode === true && defaultNode) {
    return handleSlots(vm, params, name) || defaultNode
  }
  if (typeof propsNode === 'function') {
    return propsNode(vm.$createElement, params)
  }
  const isPropsEmpty = [undefined, params, ''].includes(propsNode)
  // Props 为空，但插槽存在
  if ((isPropsEmpty || slotFirst) && (vm.$scopedSlots[camelCase(name)] || vm.$scopedSlots[kebabCase(name)])) {
    return handleSlots(vm, params, name)
  }
  return propsNode
}

// 同时支持驼峰命名和中划线命名的插槽，示例：value-display 和 valueDisplay
export function handleSlots(vm: VmType, params: Record<string, any> | null | undefined, name: string) {
  const finaleParams = h
  if (params) {
    Object.assign(finaleParams, params)
  }
  // 检查是否存在 驼峰命名 的插槽
  let node = vm.$scopedSlots[camelCase(name)]?.(finaleParams)
  if (node) return node
  // 检查是否存在 中划线命名 的插槽
  node = vm.$scopedSlots[kebabCase(name)]?.(finaleParams)
  if (node) return node
  return null
}

/**
 * 用于处理相同名称的 TNode 渲染
 * @param vm 组件实例
 * @param name1 第一个名称，优先级高于 name2
 * @param name2 第二个名称
 * @param defaultNode 默认渲染内容：当 name1 和 name2 都为空时会启动默认内容渲染
 * @example renderContent(this, 'default', 'content')
 * @example renderContent(this, 'default', 'content', '我是默认内容')
 * @example renderContent(this, 'default', 'content', { defaultNode: '我是默认内容', params })
 */
export const renderContent = (vm: VmType, name1: string, name2: string, options?: VNode | JSXRenderContext) => {
  const params = typeof options === 'object' && 'params' in options ? options.params : null
  let defaultNode = typeof options === 'object' && 'defaultNode' in options && options.defaultNode
  defaultNode = typeof options === 'object' && 'context' in options && options
  const toParams = params ? { params } : undefined
  const node1 = renderTNodeJSX(vm, name1, toParams)
  const node2 = renderTNodeJSX(vm, name2, toParams)
  const r = [undefined, null, ''].includes(node1) ? node2 : node1
  return [undefined, null, ''].includes(r) ? defaultNode : r
}
