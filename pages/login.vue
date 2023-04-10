<template>
  <n-form
    :model="form"
    ref="formRef"
    :rules="rules"
    :inline="false"
    size="large"
    class="w-[340px]"
  >
    <n-form-item label="" path="username" :show-label="false">
      <n-input v-model:value="form.username" placeholder="用户名/手机/邮箱" />
    </n-form-item>
    <n-form-item label="" path="password" :show-label="false">
      <n-input
        v-model:value="form.password"
        placeholder="密码"
        type="password"
      />
    </n-form-item>
    <n-form-item
      label=""
      path="repassword"
      :show-label="false"
      v-if="type != 'login'"
    >
      <n-input
        v-model:value="form.repassword"
        placeholder="确认密码"
        type="password"
      />
    </n-form-item>
    <div class="flex justify-between w-full mb-2">
      <n-button type="primary" quaternary size="tiny" @click="changeType">{{
        type === 'login' ? '注册' : '登录'
      }}</n-button>
      <nuxt-link to="/forget">
        <n-button type="primary" quaternary size="tiny">忘记密码?</n-button>
      </nuxt-link>
    </div>
    <div>
      <n-button
        type="primary"
        @click="onSubmit"
        class="w-full"
        :loading="loading"
        >{{ type === 'login' ? '登录' : '注册' }}</n-button
      >
    </div>
    <div
      class="flex justify-center items-center w-full text-xs mt-5 text-gray-600"
    >
      注册即同意
      <n-button quaternary type="primary" size="tiny">《服务协议》</n-button>
      和
      <n-button quaternary type="primary" size="tiny">《隐私政策》</n-button>
    </div>
  </n-form>
</template>

<script setup>
import { NForm, NFormItem, NInput, NButton, createDiscreteApi } from 'naive-ui'
definePageMeta({
  layout: 'login',
  middleware: ['only-visitor']
})
const route = useRoute()
const formRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  repassword: ''
})
const type = ref('login')
const title = ref('登录')
useHead({ title })
const rules = computed(() => {
  let r = {
    username: [
      {
        required: true,
        message:
          type.value === 'login' ? '用户名/手机号/邮箱必填' : '用户名必填'
      }
    ],
    password: [
      {
        required: true,
        message: '密码必填'
      }
    ]
  }

  if (type.value != 'login') {
    r.repassword = [
      {
        required: true,
        message: '确认密码必填'
      },
      {
        validator(rule, value) {
          return value === form.password
        },
        message: '两次密码输入不一致',
        trigger: ['input', 'blur']
      }
    ]
  }

  return r
})
const loading = ref(false)
function onSubmit() {
  formRef.value?.validate(async (errors) => {
    if (errors) return
    loading.value = true
    let { data, error } =
      type.value === 'login' ? await userloginApi(form) : await useRegApi(form)

    loading.value = false
    if (error.value) return
    const { message } = createDiscreteApi(['message'])
    message.success(type.value === 'login' ? '登录成功' : '注册成功')
    if (type.value === 'login') {
      //   将用户登录成功返回的token存储在cookie中,用户登录成功的标识
      const token = useCookie('token')
      token.value = data.value.token
      // 存全局
      const user = useUser()
      user.value = data.value
      //     跳转
      navigateTo(route.query.from || '/', {
        replace: 'true'
      })
    } else {
      // 切换回登录页
      changeType()
    }
  })
}
useEnterEvent(() => onSubmit())
function changeType() {
  type.value = type.value === 'login' ? 'reg' : 'login'
  title.value = type.value == 'login' ? '登录' : '注册'
  form.username = ''
  form.password = ''
  form.repassword = ''
  route.meta.title = title.value
  formRef.value.restoreValidation()
}
</script>

<style scoped></style>
