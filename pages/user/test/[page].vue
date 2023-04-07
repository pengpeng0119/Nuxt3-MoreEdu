<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
    <div class="px-3 pt-4">
      <UserTestList
        v-for="(item, index) in rows"
        :key="index"
        :item="item"
      ></UserTestList>
    </div>
    <!-- 分页 -->
    <div class="flex justify-center items-center mt-5 pb-10">
      <n-pagination
        size="large"
        :page="page"
        :item-count="total"
        :page-size="limit"
        :on-update:page="handlePageChange"
      />
    </div>
  </LoadingGroup>
</template>

<script setup>
import { NPagination } from 'naive-ui'
useHead({
  title: '考试记录'
})
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => useUserTestApi(page))
</script>

<style scoped></style>
