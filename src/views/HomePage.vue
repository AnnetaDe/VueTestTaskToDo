<script setup>
import { ref } from 'vue'
import TListItem from '../components/TListItem.vue'
import TButton from '../components/TButton.vue'
import TModal from '../components/TModal.vue'
import TModalForm from '../components/TModalForm.vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
const { tasks } = storeToRefs(useTaskStore())
const { filteredTasks } = storeToRefs(useTaskStore())
console.log(filteredTasks)
const taskStore = useTaskStore()

const isOpen = ref(false)
const selectedTask = ref(null)

function openModal() {
  isOpen.value = true
}
function closeModal() {
  isOpen.value = false
}
function handleAddTask() {
  openModal()
  selectedTask.value = null
}
function handleLike(task) {
  const index = tasks.value.findIndex((t) => t.id === task.id)
  if (index !== -1) {
    tasks.value[index].isLiked = !tasks.value[index].isLiked
    taskStore.piniaSaveTask(task)
  }
}
function handleComplete(task) {
  const index = tasks.value.findIndex((t) => t.id === task.id)
  if (index !== -1) {
    tasks.value[index].isDone = !tasks.value[index].isDone
    taskStore.piniaSaveTask(task)
  }
}
function handleEdit(taskId) {
  const task = tasks.value.find((task) => task.id === taskId)
  selectedTask.value = task
  openModal()
}
function handleSave(task) {
  taskStore.piniaSaveTask(task)
  closeModal()
}
</script>

<template>
  <div>
    <h2>Filter</h2>
  </div>
  <div class="listWrapper">
    <ul class="tlist">
      <TListItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        :class="{ liked: task.isLiked, done: task.isDone }"
        @delete="taskStore.piniaDeleteTask"
        @complete="handleComplete"
        @like="handleLike"
        @editModal="handleEdit"
      />
    </ul>
  </div>
  <TButton @click="handleAddTask">Add New Task</TButton>
  <TModal v-if="isOpen" @close="closeModal">
    <TModalForm @save="handleSave" :task="selectedTask" />
  </TModal>
</template>

<style lang="scss" scoped>
.listWrapper {
  background-color: #953232;
}
.tlist {
  max-width: 1200px;
  border-radius: 2px;
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  font-family: $font-stack;
}
</style>
