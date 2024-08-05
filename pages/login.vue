<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { appName } from '~/constants'
import type { LoginData } from '~/types'

const UsernameInputRef = shallowRef()
const router = useRouter()
const { loading, setLoading } = useLoading(false)
const formData = ref<LoginData>({
  username: '',
  password: '',
})

async function handleLogin() {
  try {
    setLoading(true)
    const res = await postLogin(formData.value)
    const { code, msg, data } = res
    if (code) {
      Message.warning(msg)
    }
    else {
      storeToken.value = data
      Message.success('登录成功')
      router.push('/')
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
    UsernameInputRef.value.focus()
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
          ref="UsernameInputRef"
          v-model:model-value="formData.username"
          placeholder="请输入用户名"
        />
        <AInput
          v-model:model-value="formData.password"
          type="password"
          placeholder="请输入密码"
          @press-enter="handleLogin()"
        />
      </div>
      <AButton type="primary" long :loading="loading" @click="handleLogin()">
        登录
      </AButton>
      <NuxtLink to="/register" class="text-blue-5 underline-blue hover:underline">
        邀请码注册
      </NuxtLink>
    </div>
  </main>
</template>
