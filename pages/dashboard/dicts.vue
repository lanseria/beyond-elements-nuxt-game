<script lang="ts" setup>
const DashboardDictsListRef = shallowRef()
const dictId = ref('')
function handleAdd() {
  DashboardDictsListRef.value.handleAdd()
}
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex-none border-b-1px border-gray-1 px-4 py-2 text-20px">
      字典管理
    </div>

    <div class="flex flex-none px-4 py-4">
      <ASpace>
        <AButton type="primary" @click="handleAdd()">
          <template #icon>
            <IconPlus />
          </template>
          添加
        </AButton>
      </ASpace>
    </div>

    <div class="h-1px w-full bg-gray-1" />

    <div class="flex flex-1 px-4">
      <div class="flex-1">
        <DashboardDictsList ref="DashboardDictsListRef" v-model:dict-id="dictId" />
      </div>
      <div class="h-full w-1px flex-none bg-gray-1" />
      <div class="flex-1 p-2">
        <div v-if="!dictId">
          请选择字典
        </div>
        <DashboardDictItemsList v-else :dict-id="dictId" />
      </div>
    </div>
  </div>
</template>
