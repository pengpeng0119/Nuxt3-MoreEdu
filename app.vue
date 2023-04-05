<template>
  <n-config-provider inline-theme-disabled>
    <!-- naive-ui 默认情况下使用 inline style 作为主题变量的载体，因此每个组件上都会挂载许多 inline CSS。如果你需要 SSR，或者想让开发者工具看起来更干净，可以打开 inline-theme-disabled 属性。 -->
    <NuxtLayout>
      <!--全局不变  -->
      <NuxtPage></NuxtPage>
      <!-- 组要业务页面 -->
    </NuxtLayout>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from 'naive-ui'
</script>

<style scoped></style>
