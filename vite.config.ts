/* 
  https://github.com/unplugin/unplugin-vue-components/blob/main/src/core/resolvers/element-ui.ts
*/
/// <reference types="vitest" />

import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import path from 'path'
import { UserConfig, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const config: UserConfig = {
    test: {
      include: ['src/**/__tests__/**/*'],
      environment: 'jsdom',
    },
    define: {
      __DEV__: env.command === 'serve',
    },
    plugins: [
      vue2(),
      vue2Jsx(),
    ],
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
  };
  if (env.mode !== 'preview') {
    config.plugins?.push(
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
      }),)
    config.build = {
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
    }
  } else {
    config.build = {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk/[name]_[hash].js',
          entryFileNames: 'assets/entry/[name]_[hash].js',
          assetFileNames: 'assets/[ext]/[name]_[hash].[ext]',
          manualChunks: (id, { getModuleIds, getModuleInfo }) => {
            if (id.includes('node_modules')) {
              let pkgName = id;
              pkgName = pkgName.split('.pnpm/')?.[1] || pkgName;
              pkgName = pkgName.split('node_modules/')?.[1] || pkgName;
              pkgName = pkgName.startsWith('@')
                ? pkgName.split('/')[0] + '/' + pkgName.split('/')[1]
                : pkgName.split('/')[0];

              if (
                pkgName.startsWith('@vue/') ||
                pkgName === 'vue-demi'
              ) pkgName = 'vue'

              return `libs/${pkgName}`;
            }
          },
        }
      },
    }
  }
  return config;
})
