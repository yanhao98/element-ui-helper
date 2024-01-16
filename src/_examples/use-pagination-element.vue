<!-- 

待研究：https://www.npmjs.com/package/@tanstack/vue-query

-->
<script setup lang="ts">
import { setGlobalConfig, usePaginationElement } from "element-ui-helper";

setGlobalConfig({
  hooks: {
    usePaginationElement: {
      defaultParams: {
        pageNum: 2,
        pageSize: 50,
      },
      pagination: {
        currentKey: "pageNum",
        pageSizeKey: "pageSize",
        totalKey: "totalll",
      },
      elPaginationAttrs: {
        style: "text-align: center",
        background: true,
        layout: "prev, jumper, pager, next, sizes, slot, ->, total",
        pageSizes: [10, 50, 100],
      },
    },
  },
});
const tableHook = usePaginationElement({
  // manual: true,
  onFetch: async (params) => {
    console.debug("[onFetch] params :>> ", JSON.stringify(params, null, 2), params);

    await new Promise((r) => setTimeout(r, 1000));

    return {
      totalll: 520,
      list: Array.from({ length: 3 }).map((_, i) => ({
        col1: `col1-${i}`,
        col2: `col2-${i}`,
      })),
      date: new Date().toLocaleString(),
    };
  },
});
const { paginationAttrs, paginationEvents, data, loading, changeCurrent } = tableHook;
</script>

<template>
  <div>
    <el-button @click="changeCurrent(1)">changeCurrent(1)</el-button>
    <div>tableHook.loading: {{ tableHook.loading }}</div>
    <!-- someHook.someProp: fixed in 2.7.16 -->
    <!-- https://github.com/vuejs/vue/issues/12884 -->
    <hr />
    <el-table :data="data?.list" border v-loading="loading">
      <el-table-column label="ix" type="index" width="50" :index="tableHook.indexMethod" />
      <el-table-column label="col1" prop="col1" />
      <el-table-column label="col2" prop="col2" />
    </el-table>
    <el-pagination v-bind="paginationAttrs" v-on="paginationEvents" />
    <div style="border: 1px solid #ccc; margin-top: 20px; padding: 10px">
      {{ { data } }}
    </div>
  </div>
</template>

<style scoped></style>
