/* 
  https://github.com/unplugin/unplugin-vue-components/blob/main/src/core/resolvers/element-ui.ts
*/

import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2Jsx(),
    dts({
      // rollupTypes: true,
      include: ['src/components/**/*'],
      tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),
      // root: path.resolve(__dirname),
      entryRoot: path.resolve(__dirname, 'src/components'),
      staticImport: true,
      logLevel: 'info',
      outDir: 'types',
      beforeWriteFile(filePath, content) {
        return {
          filePath,
          content: content
            .replaceAll('v3-component-public-instance.js', 'v3-component-public-instance')
            .replaceAll('v3-component-options.js', 'v3-component-options')
            .replaceAll('vue.js', 'vue'),
        }
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    lib: {
      name: 'element-ui-helper',
      formats: [
        'es',
        // 'cjs'
      ],
      // fileName: (format) => `index.${format}.js`,
      // fileName: 'index',
      entry: path.resolve(__dirname, 'src/components/index.ts'),
    },
    // target: 'es2015',
    rollupOptions: {
      external: [
        'vue',
        'element-ui',
        '@vue/babel-helper-vue-jsx-merge-props',
        'vue-request' /* , 'vue-demi' */,
        'lodash',
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: path.resolve(path.resolve(__dirname), 'src') + '/$1',
      },
      {
        find: 'element-ui-helper',
        replacement: path.resolve(path.resolve(__dirname), 'src') + '/components',
      },
    ],
  },
})
