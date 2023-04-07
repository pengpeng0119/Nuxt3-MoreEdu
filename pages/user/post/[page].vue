<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
    <div class="px-3 pt-4">
      <!-- <UserTestList
        v-for="(item, index) in rows"
        :key="index"
        :item="item"
      ></UserTestList> -->
      <!-- {{ rows }} -->
      <PostList
        v-for="(item, index) in rows"
        :key="index"
        :item="item"
        @delete="handleDeleteItem"
      ></PostList>
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
  title: '我的帖子'
})
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => useMypostListApi(page))
async function handleDeleteItem({ id, success, fail }) {
  let { error } = await useDeletePostApi(id)
  if (error.value) {
    fail()
  } else {
    success()
    refresh()
  }
}
</script>

<style scoped></style>
