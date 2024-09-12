<script setup>
import TButton from './TButton.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'like', 'complete', 'editModal'])

function deleteTask() {
  emit('delete', props.task.id)
}
function likeTask() {
  emit('like', props.task.id)
}
function completeTask() {
  emit('complete', props.task.id)
}
function openModalEdit() {
  emit('editModal', props.task)
}
</script>
<template>
  <li class="tlistitem">
    <h3>{{ task.name }}</h3>
    <p>description: {{ task.description }}</p>
    <p>Done: {{ task.isDone ? 'Yes' : 'No' }}</p>
    <TButton @click="completeTask">Completed</TButton>
    <p>Favorite: {{ task.isLiked ? 'Yes' : 'No' }}</p>
    <TButton @click="likeTask">Like</TButton>

    <div class="editDelWrapper">
      <TButton class="controlsBtn" @click="openModalEdit">Edit</TButton>
      <TButton class="controlsBtn" @click="deleteTask">Delete</TButton>
    </div>
  </li>
</template>

<style scoped>
.tlistitem {
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);
}
.editDelWrapper {
  margin-top: 16px;
  display: flex;
  gap: 10px;
}
.controlsBtn {
  background-color: #55404086;
  color: #f6f5f5;
  width: 100px;
  padding: 12px 18px;
}
</style>
