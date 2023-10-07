<template>
  <div>
    <el-button type="" @click="throwFn">throwFn</el-button>
    <el-button type="" @click="showFn">showFn</el-button>
    <el-button type="" @click="showFnOrigin">showFnOrigin</el-button>
    <el-button type="" @click="componentContent">componentContent</el-button>
    <el-button type="" @click="prompt">prompt</el-button>
  </div>
</template>

<script setup lang="tsx">
import { Message, MessageBox } from 'element-ui';
import { messageBoxConfirm, setGlobalConfig } from 'element-ui-helper';
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
import type { VNode } from 'vue/types/vnode.d.ts';

setGlobalConfig({
  messageBox: {
    title: '~提示~',
  }
})
const { proxy } = getCurrentInstance()!

onMounted(function () {
  // showFn()
  // componentContent()
})

function componentContent() {
  const AComponent = defineComponent({
    name: 'AComponent',
    setup() {
      const foo = ref('foo')
      return () => (
        <div>
          <p>AComponent</p>
          <p>foo: {foo.value}</p>
          <button onClick={() => foo.value = 'bar' + Math.random()}>foo.value = 'bar'</button>
        </div>
      )
    }
  })
  // const message = proxy.$createElement(AComponent)
  let message: VNode
  message = (function (h = proxy.$createElement) {
    return <AComponent />
  })()

  // ############################# 这样不行。
  // const baz = ref('default baz')
  // message = (function (h = proxy.$createElement) {
  //   return (
  //     <div>
  //       <p>baz: {baz.value}</p>
  //       <button onClick={() => baz.value = 'baz' + Math.random()}>baz.value = 'baz'</button>
  //     </div>
  //   )
  // })()
  // #############################

  messageBoxConfirm({
    dangerouslyUseHTMLString: true,
    message,
  })
}

async function showFn() {
  const result = await messageBoxConfirm({
    message: '确定要删除吗？',
    async onConfirm() {
      console.debug('[showFn] onConfirm]')
      await new Promise((resolve) => setTimeout(resolve, 500))
      return '[showFn] onConfirm result'
    },
  })
  Message.success('操作成功')
  console.debug('showFn end. result =>', result)
}

function showFnOrigin() {
  MessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    Message.success('操作成功')
  }).catch((e) => {
    console.debug(`e :>> `, e);
    Message.info('已取消删除')
  })
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
    Message.error('操作失败')
  }
}
window.showFn = showFn
window.throwFn = throwFn


async function prompt() {
  await messageBoxConfirm({
    $type: 'prompt',
    inputType: 'password',
    inputPattern: new RegExp('^[0-9]*$'),
    inputErrorMessage: '只能输入数字',
    message: '请输入密码',
    showInput: true,
    async onConfirm({ instance }) {
      console.debug(`instance :>> `, instance);
      console.debug(`instance.inputValue :>> `, instance.inputValue)
      await new Promise((resolve) => setTimeout(resolve, 300))
    },
  },
  )
}

</script>

<style scoped></style>
