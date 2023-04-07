<template>
  <div>考试列表{{ $route.params.page }}-----{{ $route.name }}</div>
  <n-button type="primary" size="medium" @click="test">click me</n-button>
</template>

<script setup>
import { NButton } from 'naive-ui'
const route = useRoute()
useHead({
  title: '考试列表'
})
function test() {
  useHasAuth(() => {
    console.log('已经登录并且绑定手机号')
  })
}
</script>

<style scoped></style>
