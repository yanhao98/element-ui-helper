<template>
  <div>
    <h1>message-box-example.vue</h1>
    <el-button type="" @click="throwFn">throwFn</el-button>
    <el-button type="" @click="showFn">showFn</el-button>
  </div>
</template>

<script setup lang="ts">
import { messageBoxConfirm } from 'element-ui-helper'
import { onMounted } from 'vue'

onMounted(function () {
  showFn()
})

async function showFn() {
  const result = await messageBoxConfirm({
    message: '确定要删除吗？',
    async onConfirm() {
      console.debug('[showFn] onConfirm]')
      await new Promise((resolve) => setTimeout(resolve, 500))
      return '[showFn] onConfirm result'
    },
  })
  console.debug('showFn end. result =>', result)
}

async function throwFn() {
  try {
    await messageBoxConfirm({
      message: '确定要删除吗？',
      async onConfirm() {
        console.debug('[throwFn] onConfirm]')
        await new Promise((resolve) => setTimeout(resolve, 300))
        throw new Error('error')
      },
    })
    console.debug('[throwFn] end.')
  } catch (error) {
    console.debug('[throwFn] catch error. error =>', error)
  }
}
window.showFn = showFn
window.throwFn = throwFn
</script>

<style scoped></style>
