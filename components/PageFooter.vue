<template>
  <div class="mt-auto bg-dark-400 text-gray-100">
    <div class="flex items-center justify-center py-4">
      <!--   <a href="item.url" v-for="(item, index) in myData" class="p-3">{{
        item.name
      }}</a> -->
      <n-popover
        trigger="hover"
        href="item.url"
        v-for="(item, index) in myData"
        class="p-3 cursor-pointer"
      >
        <template #trigger>
          <span class="p-3" @click="open(item)">{{ item.name }}</span>
        </template>
        <span>{{ item.url }}</span>
      </n-popover>
    </div>
    <div
      class="container border-t border-gray-700 flex items-center justify-center py-5"
    >
      <small>pengpeng0119 @ 2022 jxedu.cn 赣360502 江西师范大学 </small>
    </div>
  </div>
</template>

<script setup>
import { NPopover, NButton } from 'naive-ui'
const myData = [
  {
    name: '该github仓库',
    url: 'https://github.com/pengpeng0119/Nuxt3-MoreEdu'
  },
  {
    name: '多功能挂号',
    url: 'https://github.com/pengpeng0119/MedicalAppointment'
  },
  {
    name: 'Fool-UI',
    url: 'https://github.com/pengpeng0119/Fool-UI'
  },
  {
    name: '医元疗PC',
    url: 'https://gitee.com/pwh2279265610/11_3'
  },
  {
    name: '医元疗uniapp',
    url: 'https://gitee.com/pwh2279265610/medical-treatment-applet'
  }
]
const open = (item) => {
  window.open(item.url)
}
</script>

<style scoped></style>
