<template>
  <UiTab>
    <UiTabItem
      v-for="(item, index) in tabs"
      :key="index"
      :active="item.id == bbs_id"
      @click="handleClick(item.id)"
      >{{ item.title }}</UiTabItem
    >
  </UiTab>
</template>

<script setup>
const { data } = await useBbsListApi()
// 当前的社区分类id
const route = useRoute()
const bbs_id = ref(parseInt(route.params.bbs_id))
const tabs = computed(() => {
  return [
    {
      id: 0,
      title: '全部'
    },
    ...(data.value ? data.value.rows : [])
  ]
})
// 切换社区
function handleClick(id) {
  navigateTo({
    query: {
      ...route.query,
      page: 1
    },
    params: {
      ...route.params,
      bbs_id: id
    }
  })
}
</script>

<style scoped></style>
