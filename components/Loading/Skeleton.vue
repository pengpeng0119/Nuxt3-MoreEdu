<template>
  <n-card v-for="i in 8" :key="i" class="mb-5">
    <n-skeleton text style="width: 60%" />
    <n-skeleton text :repeat="3" /> <n-skeleton text style="width: 60%" />
  </n-card>
</template>

<script setup>
import { NCard, NSkeleton } from 'naive-ui'
</script>

<style scoped></style>
