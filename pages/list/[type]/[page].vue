<template>
  <div>
    <!-- 面包屑 -->
    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item>
        <nuxt-link to="/">首页</nuxt-link>
      </n-breadcrumb-item>
      <n-breadcrumb-item>{{ title }}</n-breadcrumb-item>
    </n-breadcrumb>
    <LoadingGroup
      :pending="pending"
      :error="error"
      :is-empty="rows.length === 0"
    >
      <template #loading>
        <LoadingBookSkeleton v-if="type == 'book'" />
        <LoadingCourseSkeleton v-else />
      </template>
      <n-grid x-gap="20" :cols="type == 'book' ? 2 : 4" class="mb-6">
        <n-gi v-for="(item, index) in rows" :key="index">
          <BookList :item="item" v-if="type == 'book'"></BookList>
          <CourseList :item="item" v-else></CourseList>
        </n-gi>
      </n-grid>
      <div class="flex justify-center items-center mt-5 mb-10">
        <n-pagination
          :item-count="total"
          :page="page"
          :page-size="limit"
          size="large"
          :on-update-page="handlePageChange"
        />
      </div>
    </LoadingGroup>
  </div>
</template>

<script setup>
import { p } from '@antfu/utils'
import { NGrid, NGi, NPagination, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { onUnmounted } from 'vue'
const route = useRoute()
const { type } = route.params
const title = route.meta.title

const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {
    let query = {
      page
    }

    if (type == 'group' || type == 'flashsale') {
      query.usable = 1
    }

    return useListApi(type, query)
  })
//   指定中间件
definePageMeta({
  middleware: ['list']
})
</script>

<style scoped></style>
