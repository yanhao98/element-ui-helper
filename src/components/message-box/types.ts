import type { ElMessageBoxComponent, ElMessageBoxOptions } from 'element-ui/types/message-box'

type OnConfirmContext = {
  instance: ElMessageBoxComponent
}

export interface MessageBoxConfirmOptions extends ElMessageBoxOptions {
  onConfirm?: (context: OnConfirmContext) => Promise<any>

  $type?: 'confirm' | 'alert' | 'prompt'
}
