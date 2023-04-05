<template>
  <div>
    <div class="flex mb-3">
      <span class="text-lg">{{ title }}</span>
      <n-button quaternary class="ml-auto">查看更多</n-button>
    </div>
    <n-grid x-gap="12" :cols="4" class="mb-6">
      <n-gi v-for="(item, index) in data" :key="index">
        <CourseList :item="item"></CourseList>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { NGrid, NGi, NCard } from 'naive-ui'
import { NButton } from 'naive-ui'
defineProps({
  title: String,
  data: Array
})
</script>

<style scoped></style>
