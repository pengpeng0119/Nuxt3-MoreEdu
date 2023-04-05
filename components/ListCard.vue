<template>
  <div>
    <div class="flex mb-3">
      <span class="text-lg">{{ title }}</span>
      <n-button quaternary class="ml-auto">查看更多</n-button>
    </div>
    <n-grid x-gap="12" :cols="4" class="mb-6">
      <n-gi v-for="(item, index) in pdata" :key="index">
        <CourseList :item="item"></CourseList>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { NGrid, NGi, NCard } from 'naive-ui'
import { NButton } from 'naive-ui'
const props = defineProps({
  title: String,
  data: Array,
  type: {
    type: String,
    default: 'course'
  }
})
const pdata = ref(props.data || [])
if (props.type === 'group') {
  const { data } = await useGroupDataApi({
    page: 1,
    useable: 1,
    limit: 6
  })
  pdata.value = data.value?.rows || []
  //   console.log(data)
}
</script>

<style scoped></style>
