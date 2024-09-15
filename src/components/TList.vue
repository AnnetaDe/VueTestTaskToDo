<!-- <script setup>
import { ref } from 'vue'
import TListItem from './TListItem.vue'
import TButton from './TButton.vue'
import TModal from './TModal.vue'
import TModalForm from './TModalForm.vue'
import { useTaskStore } from '@/stores/taskStore'
import { onMounted } from 'vue'

const taskStore = useTaskStore()
console.log(taskStore.tasks)
const tasks = ref(taskStore.tasks)
// watch(
//   () => tasks,
//   (newTasks) => {
//     toDOList.value = newTasks
//   }
// )

// addNewTask({ name: 'Task 4', description: 'dosmthing3', isDone: false, isLiked: false })
// updateTask({ id: 1, name: 'Task 1', description: 'updated', isDone: false, isLiked: false })
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
function handleDelete(taskId) {
  const index = toDOList.value.findIndex((task) => task.id === taskId)
  if (index !== -1) {
    toDOList.value.splice(index, 1)
  }

  deleteTask(taskId)
}
function handleLike(taskId) {
  const index = toDOList.value.findIndex((task) => task.id === taskId)
  if (index !== -1) {
    toDOList.value[index].isLiked = !toDOList.value[index].isLiked
  }
}
function handleComplete(taskId) {
  const index = toDOList.value.findIndex((task) => task.id === taskId)
  if (index !== -1) {
    toDOList.value[index].isDone = !toDOList.value[index].isDone
  }
}
function handleEdit(task) {
  openModal()
  selectedTask.value = task
}
function handleSave(task) {
  console.log(task)
  if (selectedTask.value) {
    const index = toDOList.value.findIndex((t) => t.id === selectedTask.value.id)
    if (index !== -1) {
      toDOList.value[index] = { ...task, id: selectedTask.value.id }
    }
  } else {
    toDOList.value.push({ ...task, id: toDOList.value.length + 1 })
  }
  closeModal()
}
</script>

<template>
  <div>
    <ul class="tlist">
      <TListItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="handleDelete"
        @complete="handleComplete"
        @like="handleLike"
        @editModal="handleEdit"
      />
    </ul>
    <TButton @click="handleAddTask">Add New Task</TButton>
    <TModal v-if="isOpen" @close="closeModal">
      <TModalForm @save="handleSave" :task="selectedTask" />
    </TModal>
  </div>
</template>

<style scoped>
.tlist {
  background-color: #953232;
  border-radius: 2px;
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
}
</style> -->
