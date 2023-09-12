/**
 * 参开：
 *  https://tdesign.tencent.com/vue/components/dialog?tab=api
 *  https://tdesign.tencent.com/vue/global-configuration
 *  https://cn.attojs.org/guide/documentation/globalOptions.html
 */
import type { ButtonProps, FunctionDialogOptions, DialogOptionsRequired } from './types'
import { Dialog as ElDialog, Button as ElButton } from 'element-ui'
import Vue from 'vue'
import { renderContent, renderTNodeJSX } from '../utils/render-tnode'

const DEFAULT_OPTIONS: DialogOptionsRequired = {
  title: true,
  width: undefined,
  customClass: undefined,
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  content: undefined,
  confirmBtn: undefined,
  confirmLoading: false,
  onConfirm: undefined,
  cancelBtn: undefined,
  footer: true,
  onClose: undefined,
}

const DEFAULT_BUTTON_PROPS: ButtonProps = {}

const DEFAULT_CONFIRM_BUTTON_PROPS: ButtonProps = {
  type: 'primary',
}

function setGlobalOptions(config: {
  dialogOptions?: FunctionDialogOptions
  buttonProps?: ButtonProps
  confirmButtonProps?: ButtonProps
}) {
  Object.assign(DEFAULT_OPTIONS, config.dialogOptions)
  Object.assign(DEFAULT_BUTTON_PROPS, config.buttonProps)
  Object.assign(DEFAULT_CONFIRM_BUTTON_PROPS, config.confirmButtonProps)
}

function createDialog(options: FunctionDialogOptions) {
  const DialogConstructor = Vue.extend({
    name: 'FunctionDialogRoot',
    data: () => ({
      ...DEFAULT_OPTIONS,
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
              ...DEFAULT_BUTTON_PROPS,
              ...DEFAULT_CONFIRM_BUTTON_PROPS,
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
              ...DEFAULT_BUTTON_PROPS,
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
        const footerContent = renderTNodeJSX(this, 'footer', defaultFooter)
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

  const dialog = new DialogConstructor().$mount()
  dialog.visible = true
  document.body.appendChild(dialog.$el)

  return {
    show() {
      dialog.visible = true
    },
    hide() {
      dialog.visible = false
    },
    destroy() {
      ;(async function () {
        if (dialog.visible) {
          dialog.visible = false
          await new Promise((resolve) => {
            ;(dialog.$refs.dialogRef as ElDialog).$once('closed', resolve)
          })
        }

        dialog.$destroy()
        dialog.$el.parentNode?.removeChild?.(dialog.$el)
      })()
    },
    update(options: FunctionDialogOptions) {
      Object.assign(dialog, options)
    },
    setConfirmLoading: (val: boolean) => {
      dialog.confirmLoading = val
    },
  }
}

export { setGlobalOptions, createDialog }
