<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
    <div class="px-3 pt-4">
      <UserBuyList
        v-for="(item, index) in rows"
        :key="index"
        :item="item"
      ></UserBuyList>
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
  title: '购买记录'
})
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => useOrderListApi(page))
</script>

<style scoped></style>
