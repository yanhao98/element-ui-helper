<template>
  <div id="app">
    <component :is="comptMap['dialog-example']" />
  </div>
</template>

<script setup lang="tsx">
const files = import.meta.glob('./_examples/*.vue')
const comptMap = Object.keys(files).reduce((map, path) => {
  const name = path.match(/\.\/_examples\/(.*)\.vue$/)?.[1]
  if (name) {
    map[name] = files[path]
  }
  return map
}, {} as Record<string, any>)
</script>

<style scoped></style>
