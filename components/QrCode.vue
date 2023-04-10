<template>
  <div class="flex justify-center">
    <n-image :src="src" width="300" height="300px" />
  </div>
</template>

<script setup>
import QRcode from 'qrcode'
import { NImage } from 'naive-ui'
const props = defineProps(['data'])
const src = ref('')
QRcode.toDataURL(props.data, {
  width: 280,
  height: 280,
  margin: 2
}).then((url) => {
  src.value = url
})
</script>

<style scoped></style>
