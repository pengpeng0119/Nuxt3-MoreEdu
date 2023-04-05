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
      </template>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { throwError } from 'naive-ui/es/_utils'
const { data, pending, error } = await useFetch('/index', {
  key: 'IndexData',
  headers: {
    appid: 'bd9d01ecc75dbbaaefce'
  },
  transform: (res) => {
    return res.data
  },
  baseURL: 'http://demonuxtapi.dishait.cn/pc',
  initialCache: false,
  lazy: true
})
// 服务端时直接报错
if (process.server && error.value) {
  throwError(error.value?.data?.data)
}
</script>

<style scoped></style>
