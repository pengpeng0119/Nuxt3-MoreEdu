<template>
  <img
    :src="item.src"
    class="w-[100%] h-[100px] rounded mb-6 cursor-pointer"
    v-for="(item, index) in data"
    :key="index"
    @click="$commonOpen(item)"
  />
</template>

<script setup>
defineProps({
  data: Array
})
</script>

<style scoped></style>
