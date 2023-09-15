<script setup lang="ts">
import { usePaginationElement } from '@/components/hooks/usePaginationElement'

const { paginationAttrs, paginationEvents, data, loading, changeCurrent } = usePaginationElement({
  onLoad: async (params) => {
    console.debug('params :>> ', JSON.stringify(params, null, 2), params)
    await new Promise((r) => setTimeout(r, 1000))
    return {
      list: Array.from({ length: 3 }).map((_, i) => ({
        col1: `col1-${i}`,
        col2: `col2-${i}`,
      })),
      total: 520,
    }
  },
})
</script>

<template>
  <div>
    <h1>use-pagination-element.vue</h1>
    <!-- {{ { data } }} -->
    <el-card>
      <el-button @click="changeCurrent(1)">changeCurrent(1)</el-button>
      <el-table :data="data?.list" border v-loading="loading">
        <el-table-column prop="col1" label="col1"></el-table-column>
        <el-table-column prop="col2" label="col2"></el-table-column>
      </el-table>
      <el-pagination v-bind="paginationAttrs" v-on="paginationEvents" />
    </el-card>
  </div>
</template>

<style scoped></style>
