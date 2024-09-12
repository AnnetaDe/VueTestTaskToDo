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
    <TButton @click="openModalEdit">Edit</TButton>
    <TButton @click="deleteTask">Delete</TButton>
  </li>
</template>

<style scoped>
.tlistitem {
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);
}
</style>
