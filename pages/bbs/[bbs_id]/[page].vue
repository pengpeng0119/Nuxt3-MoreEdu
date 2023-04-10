<template>
  <div>
    <BbsTabs />
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <LoadingGroup
          :pending="pending"
          :error="error"
          :is-empty="rows.length === 0"
        >
          <div class="bg-white rounded">
            <UiTab>
              <UiTabItem
                v-for="(item, index) in ts"
                :key="index"
                :active="is_top == index"
                @click="handleIsTop(index)"
                >{{ item }}</UiTabItem
              >
            </UiTab>
            <PostList
              v-for="(item, index) in rows"
              :key="index"
              :item="item"
              :show-del="false"
            />
          </div>

          <div class="flex justify-center items-center mt-5 mb-10">
            <n-pagination
              size="large"
              :page="page"
              :item-count="total"
              :page-size="limit"
              :on-update:page="handlePageChange"
            />
          </div>
        </LoadingGroup>
      </n-grid-item>
      <n-grid-item :span="6">
        <NuxtLink to="/post/add">
          <n-button type="primary" class="mb-5 w-full" @click=""
            >发布帖子</n-button
          >
        </NuxtLink>

        <HotCourseList />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { NGrid, NGridItem, NButton, NPagination } from 'naive-ui'
useHead({
  title: '社区问答列表'
})

const route = useRoute()
const bbs_id = ref(route.params.bbs_id)
const is_top = ref(route.query.is_top)
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {
    return usePostListApi(() => {
      return {
        page,
        bbs_id: bbs_id.value,
        is_top: is_top.value
      }
    })
  })
// 头部导航
const ts = ref(['最新', '置顶'])
function handleIsTop(i) {
  navigateTo({
    params: {
      ...route.params,
      page: 1
    },
    query: {
      is_top: i
    }
  })
  refresh()
  is_top.value = i
}
// 中间件
definePageMeta({
  middleware(to, from) {
    const { bbs_id, page } = to.params
    if (!isNaN(+bbs_id) && !isNaN(+page)) {
      useHead({
        title: '社区问答列表'
      })
      return true
    }
    return abortNavigation('页面不存在')
  }
})
</script>

<style scoped></style>
