import type { ElMessageBoxOptions } from 'element-ui/types/message-box'

export interface MessageBoxConfirmOptions extends ElMessageBoxOptions {
  onConfirm?: () => Promise<any>
}
