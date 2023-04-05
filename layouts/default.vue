<template>
  <div class="body">
    <NavBar />
    <main class="container">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>

<script setup></script>

<style scoped>
.body {
  min-width: 1000px;
  @apply bg-gray-100 flex-col min-h-screen flex;
}
</style>
