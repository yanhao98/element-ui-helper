/**
 * 参考：
 *  https://tdesign.tencent.com/vue/components/dialog?tab=api
 */
import { Button as ElButton, Dialog as ElDialog } from 'element-ui'
import Vue from 'vue'
import { GLOBAL_CONFIG } from '../config'
import { renderContent, renderTNodeJSX } from '../utils/render-tnode'
import type { DialogOptions } from './types'

function createDialog(options: DialogOptions) {
  const DialogConstructor = Vue.extend({
    name: 'FunctionDialogRoot',
    data: () => ({
      ...GLOBAL_CONFIG.dialog,
      ...options,
      visible: false,
      // destoryAfterClose: false,
    }),
    methods: {
      getConfirmBtn() {
        if (this.confirmBtn === null) return null

        return (
          <ElButton
            props={{
              ...GLOBAL_CONFIG.button,
              ...GLOBAL_CONFIG.confirm,
              loading: this.confirmLoading,
            }}
            onClick={() => {
              const result = this.onConfirm?.()
              if (result instanceof Promise) {
                this.confirmLoading = true
                result.finally(() => {
                  this.confirmLoading = false
                })
              }
            }}
          >
            {this.confirmBtn || '确定'}
          </ElButton>
        )
      },
      getCancelBtn() {
        if (this.cancelBtn === null) return null

        return (
          <ElButton
            props={{
              ...GLOBAL_CONFIG.button,
            }}
            onClick={() => {
              this.visible = false
            }}
          >
            {this.cancelBtn || '取消'}
          </ElButton>
        )
      },
      getFooter() {
        const defaultFooter = [this.getCancelBtn(), this.getConfirmBtn()]
        const footerContent = renderTNodeJSX(this, 'footer', {
          defaultNode: defaultFooter,
          params: {
            instance: this,
          },
        })
        // const footer = this.footer ? footerContent : null
        return footerContent
      },
    },
    created() {
      // console.debug(`[FunctionDialog] App created`)
    },
    mounted() {
      // console.debug(`[FunctionDialog] App mounted`)
    },
    destroyed() {
      // console.debug(`[FunctionDialog] App destroyed`)
    },
    beforeDestroy() {
      // this.$el.parentNode?.removeChild?.(this.$el)
    },
    render() {
      const defaultTitle = ''
      const title = renderTNodeJSX(this, 'title', defaultTitle)

      const content = renderContent(this, 'default', 'content')

      const footer = this.getFooter()

      return (
        <ElDialog
          ref="dialogRef"
          props={{
            visible: this.visible,
            width: this.width,
            showClose: this.showClose,
            closeOnClickModal: this.closeOnClickModal,
            closeOnPressEscape: this.closeOnPressEscape,
            customClass: this.customClass,
          }}
          on={{
            'update:visible': (visible: boolean) => {
              this.visible = visible
            },
            open: () => {
              // console.debug(`[FunctionDialog][ElDialog] onOpen`)
            },
            opened: () => {
              // console.debug(`[FunctionDialog][ElDialog] onOpened`)
            },
            close: () => {
              this.onClose?.()
            },
            closed: () => {
              // console.debug(`[FunctionDialog][ElDialog] onClosed`)
              /* if (this.destoryAfterClose) {
                this.$destroy()
                this.$el.parentNode?.removeChild?.(this.$el)
              } */
            },
          }}
        >
          <template slot="title">
            <span class="el-dialog__title">{title}</span>
          </template>

          <template slot="default">{content}</template>

          <template slot="footer">{footer}</template>
        </ElDialog>
      )
    },
  })

  // const dialog = new DialogConstructor().$mount()
  const dialogInstance = new DialogConstructor()
  setTimeout(() => {
    dialogInstance.$mount()
    dialogInstance.visible = true
    document.body.appendChild(dialogInstance.$el)
  }, 0)

  return {
    show() {
      dialogInstance.visible = true
    },
    hide() {
      dialogInstance.visible = false
    },
    destroy() {
      /* 
          (function (){
            dialog.hide();
            dialog.destroy();
          })()
      */
      ;(async function () {
        console.debug(`dialogInstance :>> `, dialogInstance)
        console.debug(`dialogInstance.$refs.dialogRef :>> `, dialogInstance.$refs.dialogRef)
        if (dialogInstance.visible) {
          dialogInstance.visible = false
          await new Promise((resolve) => {
            ;(dialogInstance.$refs.dialogRef as ElDialog).$once('closed', resolve)
          })
        }

        dialogInstance.$destroy()
        dialogInstance.$el.parentNode?.removeChild?.(dialogInstance.$el)
      })()
    },
    update(options: DialogOptions) {
      Object.assign(dialogInstance, options)
    },
    setConfirmLoading: (val: boolean) => {
      dialogInstance.confirmLoading = val
    },
    instance: dialogInstance,
  }
}

export { createDialog }
