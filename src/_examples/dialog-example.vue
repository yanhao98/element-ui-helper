<script setup lang="tsx">
import { createDialog, setGlobalConfig } from 'element-ui-helper'
import type { DialogOptions } from 'element-ui-helper'
import { defineComponent, ref } from 'vue'

setGlobalConfig({
  button: {
    plain: true,
  },
  confirm: {
    round: true,
  },
})
setGlobalConfig({
  dialog: {
    showClose: false,
    footer: (...args) => {
      console.debug(`[setGlobalConfig.dialog.footer] args :>> `, args);
      return <div>默认</div>
    },
  },
})

const ContentComponent = defineComponent({
  name: 'ContentComponent',
  props: ['foo'],
  mounted() { console.debug('ContentComponent mounted') },
  destroyed() { console.debug('ContentComponent destroyed') },
  setup(props) {
    return () => (
      <div>
        <h1>内容-组件</h1>
        <p>props.foo: {props.foo}</p>
      </div>
    )
  },
})

function open() {
  let title: DialogOptions['title']
  title = false
  title = '标题-字符串'

  let content: DialogOptions['content']
  content = '内容-字符串'
  content = (h) => h('div', '内容-h函数')
  content = () => '内容-函数'
  content = () => <ContentComponent foo="bar" />

  let footer: DialogOptions['footer']
  const confirmLoading = ref(false)
  footer = (h, ctx) => [
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


  let onConfirm: DialogOptions['onConfirm']
  onConfirm = () => {
    console.debug('onConfirm-void')
    dialog.setConfirmLoading(true)
    setTimeout(() => { dialog.setConfirmLoading(false) }, 1000)
  }
  onConfirm = async () => {
    console.debug('onConfirm-async')
    await new Promise((r) => setTimeout(r, 1000))
    dialog.destroy()
  }

  const dialog = createDialog({
    title,
    content,
    footer: () => [dialog.instance.getConfirmBtn(), dialog.instance.getCancelBtn(), <span
      onClick={() => {
        dialog.update({
          confirmBtn: 'null -> Confirm...',
        })
      }}
    >dialog.update</span>],
    // footer,
    onConfirm,
    cancelBtn: 'Cancel...',
    confirmBtn: null,
    onClose() {
      console.debug('onClose')
    },
  })

  // @ts-ignore
  window.dialog = dialog
}

open()
</script>

<template>
  <div>
    <el-button @click="open">open</el-button>
  </div>
</template>