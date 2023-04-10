<template>
  <div class="border-b p-5">
    <div class="cursor-pointer text-gray-600" @click="open">
      <n-tag type="success" size="small" :bordered="false" v-if="item.is_top"
        >置顶</n-tag
      >
      {{ item.desc.text }}
    </div>
    <div
      class="mt-3 cursor-pointer max-w-[500px]"
      style="max-width: 500px"
      @click="open"
    >
      <n-image
        :src="img"
        :width="item.desc.images.length == 1 ? 300 : 150"
        :height="item.desc.images.length == 1 ? 200 : 100"
        v-for="(img, imgI) in item.desc.images"
        :key="imgI"
        class="mr-3 mb-2 rounded"
        preview-disabled
      ></n-image>
    </div>
    <div class="flex mt-5">
      <n-button
        secondary
        strong
        size="tiny"
        class="mr-3"
        :type="item.issupport ? 'primary' : 'tertiary'"
        @click.stop="handleSupport(item)"
        :loading="supportLoading"
      >
        <template #icon>
          <n-icon><ThumbsUpSharp /></n-icon>
        </template>
        点赞 {{ item.support_count || '' }}
      </n-button>

      <n-button secondary strong size="tiny" class="mr-3" @click="open">
        <template #icon>
          <n-icon><ChatboxEllipsesOutline /></n-icon>
        </template>
        评论 {{ item.comment_count || '' }}
      </n-button>
      <n-button text size="tiny" class="mr-3"
        >作者：{{ item.user.name }}</n-button
      >
      <n-button
        type="error"
        size="tiny"
        class="mr-3"
        @click="deleteItem"
        :loading="loading"
        v-if="showDel"
      >
        删除
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { NTag, NImage, NButton, NIcon, createDiscreteApi } from 'naive-ui'
import { ThumbsUpSharp, ChatboxEllipsesOutline } from '@vicons/ionicons5'
const props = defineProps({
  item: Object,
  showDel: {
    type: Boolean,
    default: true
  }
})
// const supportLoading = ref(false)
// // 点赞与取消点赞
// function handleSupport(item) {
//   useHasAuth(async () => {
//     // 进行行为的判断
//     let type = item.issupport ? 'unsupport' : 'support'
//     let msg = item.issupport ? '取消点赞' : '点赞'
//     supportLoading.value = true
//     const { error } = await usePostSupportApi(item.id, type)
//     supportLoading.value = false
//     // fail return
//     if (error.value) return
//     // +1/-1
//     if (type === 'unsupport') {
//       item.support_count--
//     } else {
//       item.support_count++
//     }
//     item.issupport = !item.issupport
//     const { message } = createDiscreteApi(['message'])
//     message.success(msg + '成功')
//   })
// }
const { supportLoading, handleSupport } = useHandleSupportPost()
const loading = ref(false)
const emit = defineEmits(['delete'])
const deleteItem = () => {
  const { dialog, message } = createDiscreteApi(['dialog', 'message'])
  dialog.warning({
    content: '是否要删除该帖子？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      loading.value = true
      emit('delete', {
        id: props.item.id,
        success() {
          message.success('删除成功')
          loading.value = false
        },
        fail() {
          loading.value = false
        }
      })
    }
  })
}
const open = () => {
  navigateTo('/post_detail/' + props.item.id)
}
</script>

<style scoped></style>
