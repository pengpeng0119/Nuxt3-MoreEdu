<template>
  <n-drawer
    v-model:show="drawer"
    placement="top"
    :on-after-enter="addKeydownEvent"
    :on-after-leave="removeKeydownEvent"
  >
    <div class="h-full flex justify-center items-center">
      <n-input-group class="flex justify-center items-center">
        <n-input
          :style="{ width: '500px' }"
          placeholder="请输入关键词"
          v-model:value="keyword"
          size="large"
        />
        <n-button
          type="primary"
          ghost
          :disabled="!keyword"
          @click="handleSearch"
          size="large"
        >
          搜索
        </n-button>
      </n-input-group>
    </div>
  </n-drawer>
</template>

<script setup>
import { NDrawer, NInputGroup, NInput, NButton } from 'naive-ui'
const drawer = ref(false)
const keyword = ref('')
const close = () => (drawer.value = false)
function open() {
  keyword.value = ''
  drawer.value = true
}

function handleSearch() {
  setTimeout(() => {
    close()
  }, 100)
  navigateTo({
    name: 'search-type-page',
    params: {
      type: 'course',
      page: 1
    },
    query: {
      keyword: keyword.value
    }
  })
}

function handleEnterEvent(e) {
  if (e.key === 'Enter' && keyword.value) {
    handleSearch()
  }
}
const addKeydownEvent = () =>
  document.addEventListener('keydown', handleEnterEvent)
const removeKeydownEvent = () =>
  document.removeEventListener('keydown', handleEnterEvent)
defineExpose({ open })
</script>

<style scoped></style>
