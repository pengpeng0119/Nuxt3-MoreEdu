<template>
    <li class="detail-menu-item" :class="{ 'active': active }">
        <n-tag type="info" size="small" class="mr-3" v-if="item.type">
            {{ t[item.type] }}
        </n-tag>
        章节{{ index + 1 }}.{{ item.title }}
        <n-tag type="success" size="small" class="ml-auto" :bordered="false" v-if="item.price == 0 || item.isfree == 1">
            免费
        </n-tag>
    </li>
</template>

<script setup>
import { NTag } from 'naive-ui'
defineProps({
    item: Object,
    index: Number,
    active: {
        type: Boolean,
        default: false
    }
})
const t = {
    media: '图文',
    audio: '音频',
    video: '视频'
}
</script>

<style scoped>
.detail-menu-item {
    @apply flex p-5 border-b cursor-pointer text-sm hover: ( !bg-gray-100) active:( !bg-gray-200);
}

.active {
    @apply bg-gray-200;
}
</style>
