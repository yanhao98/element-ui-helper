import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Element UI Helper",
  // description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    // http://localhost:5173/api-examples.html
    // http://localhost:5173/markdown-examples.html
    sidebar: [
      {
        text: 'Getting Started',
        link: '/'
      },
      {
        text: 'Helper',
        items: [
          { text: 'Dialog', link: '/dialog' },
          { text: 'MessageBox', link: '/message-box' }
        ]
      }

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yanhao98/element-ui-helper' }
    ],

    search: {
      provider: 'local'
    }
  }
})
