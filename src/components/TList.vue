<!-- <script setup>
import { ref, computed, watch } from 'vue'
import TListItem from '../components/TListItem.vue'
import TButton from '../components/TButton.vue'
import TModal from '../components/TModal.vue'
import TModalForm from '../components/TModalForm.vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import {  faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { tasks, paginatedTasks } = storeToRefs(useTaskStore())
const taskStore = useTaskStore()

const isOpen = ref(false)
const selectedTask = ref(null)

const draggableTask = ref(null)

function handleDragStart(task) {
  draggableTask.value = task
}
function handleDragOver(status) {
  if (status === 'done') {
    draggableTask.value.isdone = true
  }
  if (status === 'liked') {
    draggableTask.value.isliked = true
  }
  taskStore.piniaSaveTask(draggableTask.value)
  draggableTask.value = null
}

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
    tasks.value[index].isliked = !tasks.value[index].isliked
    taskStore.piniaSaveTask(task)
  }
}
function handleComplete(task) {
  const index = tasks.value.findIndex((t) => t.id === task.id)
  if (index !== -1) {
    tasks.value[index].isdone = !tasks.value[index].isdone
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

function toggleToSort() {
  console.log('toggleToSort')
  taskStore.setSorting()
}
function loadMore() {
  taskStore.loadMoreTasks()
}
</script>

<template>
  <div class="tfilter">
    <TButton @click="handleAddTask">Add New Task</TButton>
    <TButton @click="toggleToSort"
      ><FontAwesomeIcon :icon="faArrowUp" /><FontAwesomeIcon :icon="faArrowDown" /> Sort
    </TButton>
  </div>
  <div class="listWrapper">
    <ul class="tlist">
      <TListItem
        v-for="task in paginatedTasks"
        :key="task.id"
        :task="task"
        :class="{ liked: task.isliked, done: task.isdone }"
        @delete="taskStore.piniaDeleteTask"
        @complete="handleComplete"
        @like="handleLike"
        @editModal="handleEdit"
      />
    </ul>
    <TButton v-if="taskStore.canLoadMore" @click="loadMore">Load More</TButton>
  </div>
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
.tfilter {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

}
a {
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 10px;
}

a:hover,
a.router-link-active {
  color: #b012ad;
}
.active {
  color: #aa9d9d;
}
</style> -->
