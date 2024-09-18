<script setup>
import { ref } from 'vue'
import TListItem from '../components/TListItem.vue'
import TButton from '../components/TButton.vue'
import TModal from '../components/TModal.vue'
import TModalForm from '../components/TModalForm.vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { faArrowUp, faArrowDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { tasks, paginatedTasks } = storeToRefs(useTaskStore())
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
  <div class="tlistContainer">
    <div class="tfilter">
      <TButton @click="handleAddTask"
        ><FontAwesomeIcon :icon="faPlusCircle" size="lg" /> Task</TButton
      >
      <TButton @click="toggleToSort"
        ><FontAwesomeIcon :icon="faArrowUp" size="lg" /><FontAwesomeIcon
          :icon="faArrowDown"
          size="lg"
          swap-opacity
        />
        Sort
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
    </div>
    <TButton class="loadBtn" v-if="taskStore.canLoadMore" @click="loadMore">Load More</TButton>
  </div>
  <TModal v-if="isOpen" @close="closeModal">
    <TModalForm @save="handleSave" :task="selectedTask" />
  </TModal>
</template>

<style lang="scss" scoped>
.listWrapper {
}
.tlistContainer {
  padding: 2rem;
}
.tlist {
  max-width: 1200px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  font-family: $font-stack;
  margin-bottom: 1rem;
}
.tfilter {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  button {
    padding: 8px 16px;
    border-radius: 5px;
  }
}

.loadBtn {
  background: none;
  padding: 16px 24px;
  border: 1px solid $light-color;
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
</style>
