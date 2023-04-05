<template>
  <img
    :src="src"
    v-bind="$attrs"
    :style="{ 'object-fit': objectFit }"
    @error="handleImageError"
  />
</template>

<script setup>
defineProps({
  src: String,
  objectFit: {
    type: String,
    default: 'cover'
  }
})
const handleImageError = (e) => {
  e.target.src = '/fail.png'
}
</script>

<style scoped></style>
