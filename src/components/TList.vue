<script setup>
import { ref } from 'vue'
import TListItem from './TListItem.vue'
import TButton from './TButton.vue'
import TModal from './TModal.vue'
import TModalForm from './TModalForm.vue'

const toDOList = ref([
  { id: 1, name: 'Task 1', description: 'dosmthing0', isDone: false, isLiked: false },
  { id: 2, name: 'Task 2', description: 'dosmthing1', isDone: false, isLiked: false },
  { id: 3, name: 'Task 3', description: 'dosmthing2', isDone: false, isLiked: false }
])

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
        v-for="task in toDOList"
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
</style>
