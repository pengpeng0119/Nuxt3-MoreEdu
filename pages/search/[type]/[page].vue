<template>
  <div>
    <h5 class="text-lg my-3">"{{ title }}的搜索结果"</h5>
    <UiTab>
      <UiTabItem
        v-for="(item, index) in tabs"
        :key="index"
        :active="type == item.value"
        @click="handleClick(item.value)"
        >{{ item.label }}</UiTabItem
      >
    </UiTab>
    <LoadingGroup
      :pending="pending"
      :error="error"
      :is-empty="rows.length === 0"
    >
      <template #loading>
        <LoadingCourseSkeleton />
      </template>
      <n-grid x-gap="20" :cols="4" class="mb-6">
        <n-gi v-for="(item, index) in rows" :key="index">
          <CourseList :item="item"></CourseList>
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
import { NGrid, NGi, NPagination } from 'naive-ui'
import { onUnmounted } from 'vue'
const route = useRoute()
const title = ref(route.query.keyword)
useHead({
  title
})
definePageMeta({
  middleware: ['search']
})
const type = ref(route.params.type)
const tabs = [
  {
    label: '课程',
    value: 'course'
  },
  {
    label: '专栏',
    value: 'column'
  }
]
function handleClick(t) {
  navigateTo({
    params: {
      ...route.params,
      type: t
    },
    query: {
      ...route.query
    }
  })
}
const { page, limit, total, handlePageChange, rows, pending, refresh, error } =
  await usePage(({ page, limit }) => {
    return useSearchListApi(() => ({
      page: page,
      keyword: encodeURIComponent(title.value),
      type: type.value
    }))
  })
// const page = ref(parseInt(route.params.page))
// const limit = ref(10)
// // 函数式动态传参
// const { data, pending, error, refresh } = await useSearchListApi(() => ({
//   page: page.value,
//   keyword: encodeURIComponent(title.value),
//   type: type.value
// }))
// const rows = computed(() => data.value?.rows ?? [])
// const total = computed(() => data.value?.count ?? [])
// function handlePageChange(p) {
//   navigateTo({
//     params: {
//       ...route.params,
//       page: p
//     },
//     query: {
//       ...route.query
//     }
//   })
// }
// /开启监听器
const stop = watch(
  () => route.query.keyword,
  (newVal) => {
    title.value = newVal
    refresh()
  }
)
// 关闭监听器
onUnmounted(() => stop())
</script>

<style scoped></style>
