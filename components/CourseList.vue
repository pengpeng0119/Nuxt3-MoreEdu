<template>
  <n-card class="cursor-pointer mb-5 shadow-md !border-0">
    <template #cover>
      <img :src="item.cover" class="w-[100%] h-[150px]" />
    </template>
    <div class="pt-2">
      <span class="font-bold w-full truncate font-semibold">{{
        item.item
      }}</span>
    </div>
    <div class="flex mt-2">价格部分</div>
  </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui'
defineProps({
  item: Object
})
</script>

<style scoped></style>
