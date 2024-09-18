<script setup>
import { onMounted, watch, computed } from 'vue'
import { useTaskStore } from './stores/useTaskStore'
import THeader from '@/components/THeader.vue'
import { useRoute } from 'vue-router'

const { fetchTasks, setFilter } = useTaskStore()

onMounted(() => {
  fetchTasks()
})
const route = useRoute()

watch(
  () => route.params.filter,
  (newFilter) => {
    setFilter(newFilter || 'all')
  },
  { immediate: true }
)
</script>

<template>
  <THeader />
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  width: 1280px;
  // padding: 0 3rem 1rem 2rem;
  background-color: $dark-color;
}
</style>
