<template>
  <div id="app">
    <el-card>
      <el-radio-group v-model="currentName">
        <template v-for="key in Object.keys(comptMap)">
          <el-radio :label="key">{{ key }}</el-radio>
        </template>
      </el-radio-group>
    </el-card>

    <el-card>
      <template #header>
        <!-- <h1>{{ currentComptFileName }}</h1> -->
      </template>

      <component :is="comptMap[currentName]" />
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import { computed, ref, watch } from 'vue'


let comptMap: Record<string, any>
(() => {
  const files = import.meta.glob('./_examples/*.vue')
  comptMap = Object.keys(files).reduce((map, path) => {
    const name = path.match(/\.\/_examples\/(.*)\.vue$/)?.[1]
    if (name) {
      map[name] = files[path]
    }
    return map
  }, {} as Record<string, any>)
})();

const currentName = ref('')
currentName.value = localStorage.getItem('currentName') || Object.keys(comptMap)[0]

watch(currentName, (value) => {
  console.debug(`value :>> `, value);
  localStorage.setItem('currentName', value)
})

</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

h1 {
  margin: 0;
}
</style>
