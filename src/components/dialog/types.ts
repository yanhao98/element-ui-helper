import type { ElButton } from 'element-ui/types/button'
import type { ElementUIComponent } from 'element-ui/types/component'
import type { ElDialog } from 'element-ui/types/dialog'
import type { TNode } from '../common'

export type FunctionDialogOptions = Partial<DialogOptionsRequired>

/**
 * Required 的目的是解决 dialog.update 不更新的问题。因为 Vue 的 data 如果初始化没有值响应式会失效
 */
export interface DialogOptionsRequired {
  title: string | boolean | TNode | undefined
  width: ElDialog['width'] | undefined
  customClass: ElDialog['customClass'] | undefined
  showClose: ElDialog['showClose'] | undefined
  closeOnClickModal: ElDialog['closeOnClickModal'] | undefined
  closeOnPressEscape: ElDialog['closeOnPressEscape'] | undefined
  /**
   * 对话框内容
   */
  content: string | TNode | undefined
  confirmBtn: string | /* ButtonProps | TNode | */ null | undefined
  /**
   * 确认按钮加载状态
   */
  confirmLoading: boolean | undefined
  /**
   * 如果“确认”按钮存在，则点击“确认”按钮时触发。如果函数函数是异步的，会自动显示加载状态
   */
  onConfirm: (() => Promise<void> | void) | undefined
  cancelBtn: string | /* ButtonProps | TNode | */ null | undefined
  /**
   * 底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 不显示任何内容，值类型为 Function 表示自定义底部内容
   * @default true
   */
  footer: boolean | TNode | undefined
  /**
   * 底部操作按钮，如果有值，则会覆盖默认的“确认”和“取消”按钮
   */
  // footerBtns: Array<FooterButtonProps> | undefined
  /**
   * 关闭事件，点击取消按钮、点击关闭按钮、点击蒙层、按下 ESC 等场景下触发
   */
  onClose: (() => void) | undefined
}

export type ButtonProps = Partial<Omit<ElButton, keyof ElementUIComponent>>

export type FooterButtonProps = ButtonProps & {
  content: string
  onClick: () => Promise<void> | void
}
