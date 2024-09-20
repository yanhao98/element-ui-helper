/**
 *  https://tdesign.tencent.com/vue/global-configuration
 *  https://cn.attojs.org/guide/documentation/globalOptions.html
 */
import { merge } from 'lodash'
import type { ButtonProps, DialogOptions, DialogOptionsRequired } from './dialog/types'
import type { ElMessageBoxOptions } from 'element-ui/types/message-box'
import type { PaginationElementOptions } from './hooks/usePaginationElement'

interface GlobalConfig {
  button: ButtonProps
  confirm: ButtonProps
  dialog: DialogOptions
  messageBox: ElMessageBoxOptions
  hooks: {
    usePaginationElement?: Omit<PaginationElementOptions<unknown, unknown[]>, 'onFetch'>
  }
}

const dialogDefaultConfig: DialogOptionsRequired = {
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
  onClosed: undefined,
  immediateShow: true,
  destroyAfterClosed: true,
  fullscreen: false,
}

export const GLOBAL_CONFIG: GlobalConfig = {
  dialog: dialogDefaultConfig,
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
  hooks: {
    usePaginationElement: {
      elPaginationAttrs: {},
    },
  },
}

// https://radash-docs.vercel.app/docs/object/assign
export function setGlobalConfig(config: Partial<GlobalConfig>) {
  merge(GLOBAL_CONFIG, config)
}
