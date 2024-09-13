<script setup>
import TLayout from '@/components/TLayout.vue'
import TList from '../components/TList.vue'
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
const taskStore = useTaskStore()
onMounted(() => {
  taskStore.fetchTasks()
})
</script>
<template>
  <TLayout>
    <TList />
  </TLayout>
</template>
