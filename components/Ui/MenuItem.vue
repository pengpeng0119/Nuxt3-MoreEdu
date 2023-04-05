<template>
  <div class="menu-item" :class="{ 'menu-item-active': active }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.menu-item {
  transition: all 0.3s;
  @apply px-6 hover:(bg-green-50 text-green-700) h-10 flex items-center active:(!bg-green-100) cursor-pointer;
}
.menu-item-active {
  @apply !bg-green-100 !text-green-600;
}
</style>
