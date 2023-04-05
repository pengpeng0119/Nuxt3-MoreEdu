<template>
  <div class="menu">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
.menu {
  @apply flex items-center px-4;
}
</style>
