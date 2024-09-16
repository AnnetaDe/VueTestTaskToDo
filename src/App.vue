<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from './stores/useTaskStore'
const { fetchTasks } = useTaskStore()
onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  width: 1280px;
  padding: 36px;
  background-color: #953232;
  justify-content: center;
}
</style>
