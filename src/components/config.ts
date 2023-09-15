/**
 *  https://tdesign.tencent.com/vue/global-configuration
 *  https://cn.attojs.org/guide/documentation/globalOptions.html
 */
import { merge } from 'lodash'
import type { ButtonProps, DialogOptions, DialogOptionsRequired } from './dialog/types'
import type { ElMessageBoxOptions } from 'element-ui/types/message-box'

interface GlobalConfig {
  dialog: DialogOptions
  button: ButtonProps
  confirm: ButtonProps
  messageBox: ElMessageBoxOptions
}

const dialog: DialogOptionsRequired = {
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

export const GLOBAL_CONFIG: GlobalConfig = {
  dialog,
  button: {},
  confirm: {
    type: 'primary',
  },
  messageBox: {
    showClose: true,
    showCancelButton: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    confirmButtonText: '确定',
    title: '提示',
    type: 'warning',
  },
}

export function setGlobalConfig(config: Partial<GlobalConfig>) {
  merge(GLOBAL_CONFIG, config)
}
