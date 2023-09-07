<template>
  <div>
    <h1>element-ui-helper</h1>
    <el-button @click="openFunctionDialog">FunctionDialog</el-button>
  </div>
</template>

<script setup lang="tsx">
import { createFunctionDialog } from 'element-ui-helper'
import { defineComponent, onMounted, type Component } from 'vue'

let content: Component | string | (() => Vue.VNode)
content = 'string-content'
content = () => <div>function-content</div>
content = defineComponent({
  props: ['dialog', 'foo'],
  setup(props) {
    return () => <div>[defineComponent.content] props.foo: {props.foo}</div>
  },
})

let decorator = defineComponent({
  props: ['dialog', 'foo'],
  setup(props, { slots }) {
    return () => (
      <div class="decorator" title={props.foo}>
        {slots.default?.()}
      </div>
    )
  },
})

function openFunctionDialog() {
  const dialog_1 = createFunctionDialog({
    title: '测试',
    width: '520px',
    content,
    contentProps: { foo: 'bar' },
    decorator,
    decoratorProps: { foo: 'bar' },
    onOpen() {
      console.debug(`[dialog_1] onOpen`)
    },
    buttons: [
      {
        text: '关闭',
        onClick(ctx) {
          console.debug(`[关闭] ctx :>> `, ctx)
        },
      },
      {
        text: '确定',
        type: 'primary',
        async onClick(ctx) {
          console.debug(`[确定] ctx :>> `, ctx)
          await new Promise((r) => setTimeout(r, 300))
          return false
        },
      },
    ],
  })
  // @ts-ignore
  window.dialog_1 = dialog_1
  dialog_1.open()
}

onMounted(() => {
  openFunctionDialog()
})
</script>

<style scoped></style>
