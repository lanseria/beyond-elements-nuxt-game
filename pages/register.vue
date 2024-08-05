<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { appName } from '~/constants'
import type { RegisterData } from '~/types'

const InviteCodeInputRef = shallowRef()

const router = useRouter()
const { loading, setLoading } = useLoading(false)
const formData = ref<RegisterData>({
  inviteCode: '',
  username: '',
  password: '',
  confirmPassword: '',
})

async function handleRegister() {
  try {
    setLoading(true)
    const res = await postRegister(formData.value)
    const { code, msg } = res
    if (code) {
      Message.warning(msg)
    }
    else {
      Message.success('注册成功')
      router.push('/login')
    }
  }
  catch (error) {
    console.warn(error)
  }
  finally {
    setLoading(false)
  }
}

onMounted(() => {
  if (storeToken.value) {
    router.push('/')
  }
  else {
    InviteCodeInputRef.value.focus()
  }
})
</script>

<template>
  <main class="h-screen w-screen flex items-center justify-center">
    <div class="flex flex-col items-center gap-10">
      <div class="text-20px">
        {{ appName }}
      </div>
      <div class="w-300px flex flex-col gap-5">
        <AInput
          ref="InviteCodeInputRef"
          v-model:model-value="formData.inviteCode"
          placeholder="请输入验证码"
        />
        <AInput
          v-model:model-value="formData.username"
          placeholder="请输入用户名"
        />
        <AInput
          v-model:model-value="formData.password"
          type="password"
          placeholder="请输入密码"
        />
        <AInput
          v-model:model-value="formData.confirmPassword"
          type="password"
          placeholder="请输入确认密码"
          @press-enter="handleRegister()"
        />
      </div>
      <AButton type="primary" long :loading="loading" @click="handleRegister()">
        注册
      </AButton>
      <NuxtLink to="/login" class="text-blue-5 underline-blue hover:underline">
        登录
      </NuxtLink>
    </div>
  </main>
</template>
