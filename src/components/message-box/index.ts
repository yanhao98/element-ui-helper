import { MessageBox } from 'element-ui'
import { omit } from 'lodash'
import { GLOBAL_CONFIG } from '../config'
import type { MessageBoxConfirmOptions } from './types'

/**
 * 打开一个确认框，可以传入一个 Promise，Promise 执行过程中，确认按钮呈现 loading 状态
 */
function messageBoxConfirm(options: MessageBoxConfirmOptions) {
  options.$type = options.$type || 'confirm'

  return new Promise((resolve, reject) => {
    MessageBox({
      ...GLOBAL_CONFIG.messageBox,
      ...omit(options, ['onConfirm']),
      async beforeClose(action, instance, done) {
        if (action === 'confirm') {
          instance.showClose = false
          instance.showCancelButton = false
          // @ts-ignore
          instance.closeOnClickModal = false
          // @ts-ignore
          instance.closeOnPressEscape = false
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '执行中...'

          try {
            resolve(await options.onConfirm?.({ instance }))
            done()
          } catch (error) {
            /* 
            // 不关闭弹窗确认按钮可以重新点击。用一个变量来控制是否关闭弹窗
            instance.confirmButtonLoading = false
            Object.assign(instance, {
              ...GLOBAL_CONFIG.messageBox,
              ...options,
            }) */
            reject(error)
            done()
          } finally {
            setTimeout(() => {
              instance.confirmButtonLoading = false
            }, 300)
          }
        } else {
          done()
        }
      },
    })
      /* .then((d) => {
        console.log('ElMessageBox then')
        console.debug(`d :>> `, d)
      }) */
      .catch(reject)
  })
}

export { messageBoxConfirm }
