<template>
  <div>
    <template v-if="pending">
      <slot name="loading">
        <loading-skeleton></loading-skeleton>
      </slot>
    </template>
    <template v-else-if="error">
      <n-result
        status="500"
        title="错误提示"
        :description="error?.data?.data || '页面走丢了'"
        class="mt-10"
      >
        <template #footer>
          <n-button @click="$router.go(-1)">返回上一页</n-button>
        </template>
      </n-result>
    </template>
    <template v-else-if="isEmpty">
      <Empty></Empty>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { NButton, NResult } from 'naive-ui'
import { onBeforeUnmount } from 'vue'
const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: [String, Boolean, Symbol],
    default: false
  },
  isEmpty: {
    type: Boolean,
    default: false
  }
})
// const loading = ref(false)
// const stop = watchEffect((props) => {
//   if (props.pending && !loading.value) {
//     loading.value = true
//   } else {
//     setTimeout(() => {
//       loading.value = false
//     }, 200)
//   }
// })
// onBeforeUnmount(() => stop())
</script>

<style scoped></style>
