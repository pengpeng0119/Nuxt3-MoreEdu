<template>
  <LoadingGroup :pending="pending" :error="error">
    <template v-for="(item, index) in data" :key="index">
      <Banner :data="item.data" v-if="item.type == 'swiper'"></Banner>
      <ImageNav v-else-if="item.type == 'icons'" :data="item.data"></ImageNav>
      <ImageAd v-else-if="item.type == 'imageAd'" :data="item.data"></ImageAd>
      <ListCard
        v-else-if="item.type == 'list'"
        :title="item.title"
        :data="item.data"
      ></ListCard>
      <ListCard
        v-else-if="item.type == 'promotion'"
        :title="item.title"
        :data="item.data"
        :type="item.listType"
      ></ListCard>
    </template>
  </LoadingGroup>
</template>

<script setup>
import { throwError } from 'naive-ui/es/_utils'
useHead({
  title: '帝莎编程首页',
  meta: [
    { name: 'description', content: '首页描述' },
    { name: 'keywords', content: '首页关键词' }
  ]
})

const { pending, data, refresh, error } = await useIndexDataApi()

// 服务端时直接报错
if (process.server && error.value) {
  throwError(error.value?.data?.data)
}
</script>

<style scoped></style>
