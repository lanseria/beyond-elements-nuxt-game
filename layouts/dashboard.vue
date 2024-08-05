<script setup lang="ts">
import { appName } from '~/constants'

const router = useRouter()
const route = useRoute()
function menuItemClickHandler(key: string) {
  router.push(key)
}
</script>

<template>
  <ALayout class="layout-dashboard">
    <ALayoutHeader class="border-b-1px border-gray-1 px-5">
      <div class="h-full flex justify-between">
        <div class="flex items-center gap-3">
          <img class="h-48px w-48px" src="/icon.svg">
          <div class="text-20px text-gray-7 font-bold">
            {{ appName }}工作台
          </div>
        </div>
        <div class="flex gap-2">
          <DashboardTaskInfoDropDown />
          <DashboardUserInfoDropDown />
        </div>
      </div>
    </ALayoutHeader>
    <ALayout>
      <ALayoutSider collapsible breakpoint="xl">
        <AMenu
          :selected-keys="[route.path]"
          :style="{ width: '100%' }"
          @menu-item-click="menuItemClickHandler"
        >
          <AMenuItem key="/dashboard">
            <IconHome />
            工作台
          </AMenuItem>
          <AMenuItem key="/dashboard/users">
            <IconUser />
            用户管理
          </AMenuItem>
          <AMenuItem key="/dashboard/login_records">
            <IconMindMapping />
            登录记录
          </AMenuItem>
          <AMenuItem key="/dashboard/invite_codes">
            <IconUserAdd />
            邀请码
          </AMenuItem>
          <AMenuItem key="/dashboard/dicts">
            <IconBook />
            字典管理
          </AMenuItem>
        </AMenu>
        <!-- trigger -->
        <template #trigger="{ collapsed }">
          <IconCaretRight v-if="collapsed" />
          <IconCaretLeft v-else />
        </template>
      </ALayoutSider>
      <div class="m-2 w-full flex-y-hidden rounded bg-white shadow">
        <slot />
      </div>
    </ALayout>
  </ALayout>
</template>

<style lang="css" scoped>
.layout-dashboard {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-dashboard :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-dashboard :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-dashboard :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
