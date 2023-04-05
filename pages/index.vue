<template>
  <div>
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">错误提示{{ error?.data?.data }}</div>
    <div v-else>
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
    </div>
  </div>
</template>

<script setup>
import { Search } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { throwError } from 'naive-ui/es/_utils'
const { pending, data, refresh, error } = await useIndexDataApi()

// 服务端时直接报错
if (process.server && error.value) {
  throwError(error.value?.data?.data)
}
useHead({
  title: '首页',
  meta: [
    { name: 'description', content: '梦真编程首页描述' },
    { name: 'keywords', content: '梦真编程关键词' }
  ]
})
</script>

<style scoped></style>
