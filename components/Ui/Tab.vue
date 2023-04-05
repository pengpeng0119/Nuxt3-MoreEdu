<template>
  <div class="tab">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
.tab {
  @apply w-full flex overflow-x-auto bg-white mb-4 rounded;
}
</style>
