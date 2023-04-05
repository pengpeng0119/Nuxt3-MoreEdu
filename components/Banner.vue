<template>
  <n-carousel
    direction="vertical"
    dot-placement="right"
    show-arrow
    style="width: 100%; height: 400px"
    autoplay
    class="mb-6 rounded cursor-pointer"
  >
    <img
      v-for="(item, index) in data"
      :key="index"
      class="carousel-img"
      :src="item.src"
      @click="$commonOpen(item)"
    />
  </n-carousel>
</template>

<script setup>
import { NCarousel } from 'naive-ui'
defineProps({
  data: Array
})
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
