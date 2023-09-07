import { FunctionDialog } from './components'
import type { IDialogCtx, FunctionDialogOptions } from './components/dialog/types'

// FunctionDialogOptions
interface FormDialogOptions extends FunctionDialogOptions<ButtonOnClickCtxForm> {}

interface ButtonOnClickCtxForm extends IDialogCtx {
  xx: string
  // dialog: FormDialog
}

export class FormDialog extends FunctionDialog<ButtonOnClickCtxForm> {
  constructor(options: FormDialogOptions) {
    super(options)
  }

  _handleOnOpen(): void {
    console.log('[FormDialog] open')
  }

  protected get _dialogCtx(): ButtonOnClickCtxForm {
    return {
      ...super._dialogCtx,
      xx: 'xx',
    }
  }
}

export const formDialog = new FormDialog({
  buttons: [
    {
      text: '确定',
      onClick(ctx) {
        console.debug(`[FormDialog] ctx :>> `, ctx)
        ctx.dialog
      },
    },
  ],
})
