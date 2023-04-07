<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
    <div class="px-3 pt-4">
      <n-grid :x-gap="20" :cols="2">
        <n-grid-item v-for="(item, index) in rows" :key="index">
          <UserCouponList :item="item"></UserCouponList>
        </n-grid-item>
      </n-grid>
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
import { NPagination, NGrid, NGridItem } from 'naive-ui'
useHead({
  title: '优惠卷记录'
})
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => useUserCouponApi(page))
</script>

<style scoped></style>
