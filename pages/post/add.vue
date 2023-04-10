<template>
  <div class="flex justify-center">
    <ClientOnly>
      <n-form
        :model="form"
        ref="formRef"
        :rules="rules"
        :show-label="false"
        style="width: 600px"
      >
        <n-form-item label="" path="bbs_id">
          <n-select
            v-model:value="form.bbs_id"
            :options="options"
            clearable
            placeholder="请选择社区"
            class="w-full"
            value-field="id"
            label-field="title"
          />
        </n-form-item>
        <div
          class="bg-white rounded p-5 mb-5 shadow"
          v-for="(item, index) in form.content"
          :key="index"
        >
          <div v-if="index > 0" class="flex justify-end mb-2">
            <n-button size="small" @click="removeBlock(index)">
              <n-icon size="20">
                <Close />
              </n-icon>
            </n-button>
          </div>
          <n-form-item>
            <n-input
              v-model:value="item.text"
              type="textarea"
              placeholder="请填写帖子内容"
            />
          </n-form-item>

          <n-form-item>
            <!-- 图片 -->
            <Uploader v-model="item.images" :max="9" />
          </n-form-item>
        </div>

        <n-form-item>
          <n-button type="primary" dashed @click="addBlock" class="w-full"
            >创建区块</n-button
          >
        </n-form-item>

        <n-form-item>
          <n-button
            type="primary"
            @click="onSubmit"
            class="ml-auto"
            :loading="loading"
            >发布帖子</n-button
          >
          <!-- <n-button>取消</n-button> -->
        </n-form-item>
      </n-form>
    </ClientOnly>
  </div>
</template>

<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NIcon,
  NButton,
  createDiscreteApi
} from 'naive-ui'
import { Close } from '@vicons/ionicons5'
const formRef = ref(null)
const form = reactive({
  bbs_id: null,
  content: [
    {
      text: '',
      images: []
    }
  ]
})
const rules = {
  bbs_id: [
    {
      required: true,
      message: '请选择社区'
    }
  ]
}
definePageMeta({
  middleware: ['auth']
})
// 请求数据
const { data: bbsData } = await useBbsListApi()
const options = computed(() => {
  return bbsData.value ? bbsData.value.rows : []
})
// 添加区块
function addBlock() {
  form.content.push({
    text: '',
    images: []
  })
}
// 移除区块
function removeBlock(index) {
  const { dialog, message } = createDiscreteApi(['message', 'dialog'])
  dialog.warning({
    content: '是否要删除该区块？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick() {
      form.content.splice(index, 1)
      message.success('删除成功')
    }
  })
}
// 发布
const loading = ref(false)
// 验证是否为空
const lg = form.content.filter((o) => o.text.trim() == '').length
function onSubmit() {
  console.log(form)
  const { message } = createDiscreteApi(['message'])
  formRef.value.validate(async (errors) => {
    if (errors) return message.warning('请检查帖子内容是否为空')
    loading.value = true

    const { data, error } = await useAddPostApi(form)
    loading.value = false
    if (error.value) return
    message.success('发帖成功')
    navigateTo('/bbs/0/1')
  })
}
</script>

<style scoped></style>
