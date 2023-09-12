<template>
  <div>
    <h1>dialog-example.vue</h1>
  </div>
</template>

<script setup lang="tsx">
import { createDialog, setGlobalOptions } from '@/components'
import type { FunctionDialogOptions } from '@/components'
import { defineComponent, ref } from 'vue'

setGlobalOptions({
  dialogOptions: {
    showClose: false,
  },
  buttonProps: {
    plain: true,
  },
  confirmButtonProps: {
    round: true,
  },
})

const ContentComponent = defineComponent({
  name: 'ContentComponent',
  props: ['foo'],
  mounted() {
    console.debug('ContentComponent mounted')
  },
  destroyed() {
    console.debug('ContentComponent destroyed')
  },
  setup(props) {
    return () => {
      return (
        <div>
          <h1>内容-组件</h1>
          <p>props.foo: {props.foo}</p>
        </div>
      )
    }
  },
})

let title: FunctionDialogOptions['title']
title = false
title = '标题-字符串'

let content: FunctionDialogOptions['content']
content = '内容-字符串'
content = (h) => h('div', '内容-h函数')
content = () => '内容-函数'
content = () => <ContentComponent foo="bar" />

let footer: FunctionDialogOptions['footer']
const confirmLoading = ref(false)
footer = () => [
  <el-button>取消</el-button>,
  <el-button
    onClick={() => {
      confirmLoading.value = true
      setTimeout(() => {
        confirmLoading.value = false
      }, 1000)
    }}
    loading={confirmLoading.value}
    type="primary"
  >
    确定
  </el-button>,
]
footer = false
footer = true

let onConfirm: FunctionDialogOptions['onConfirm']
onConfirm = () => {
  console.debug('onConfirm-void')
  dialog.setConfirmLoading(true)
  setTimeout(() => {
    dialog.setConfirmLoading(false)
  }, 1000)
}
onConfirm = async () => {
  console.debug('onConfirm-async')
  await new Promise((r) => setTimeout(r, 1000))
}

const dialog = createDialog({
  title,
  content,
  footer,
  onConfirm,
  cancelBtn: 'Cancel...',
  confirmBtn: null,
})
setTimeout(() => {
  dialog.update({
    confirmBtn: '确定',
  })
}, 300)

// @ts-ignore
window.dialog = dialog
</script>
