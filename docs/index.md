# Getting Started

## Installation
::: code-group

```sh [npm]
$ npm add element-ui-helper
```

```sh [pnpm]
$ pnpm add element-ui-helper
```

```sh [yarn]
$ yarn add element-ui-helper
```

```sh [bun]
$ bun add element-ui-helper
```

:::

## Open in StackBlitz
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/yanhao98/element-ui-helper?file=src/App.vue)


## Set Global Config
```ts
// main.ts
import { setGlobalConfig } from 'element-ui-helper'
setupElementUiHelper()

function setupElementUiHelper() {
  setGlobalConfig({
    button: {},
    confirm: {},
    dialog: {},
    messageBox: {},
    hooks: {
      usePaginationElement: {},
    },
  })
}
```