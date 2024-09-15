<script setup>
import TButton from './TButton.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  btnTxt: {
    type: String
  }
})
const date = new Date(props.task.createdAt).toLocaleDateString()
const emit = defineEmits(['delete', 'like', 'complete', 'editModal'])

function deleteTask() {
  emit('delete', props.task.id)
}
function likeTask() {
  emit('like', props.task)
}
function completeTask() {
  emit('complete', props.task)
}
function openModalEdit() {
  emit('editModal', props.task.id)
}
</script>
<template>
  <li class="tlistItem">
    <p class="tdate">{{ date }}</p>
    <div class="titemwrapper">
      <div class="btnLikeDone">
        <TButton @click="completeTask" :class="{ done: task.isDone }">{{
          task.isDone ? 'DONE' : 'mark done'
        }}</TButton>
        <TButton @click="likeTask" :class="{ liked: task.isLiked }">{{
          task.isLiked ? 'LIKED' : ' like me'
        }}</TButton>
      </div>
      <h3 class="titemtitle">{{ task.name }}</h3>
      <p class="tdescr">description: {{ task.description }}</p>
    </div>
    <div class="btnEditDel">
      <TButton class="controlsBtn" @click="openModalEdit">Edit</TButton>
      <TButton class="controlsBtn" @click="deleteTask">Delete</TButton>
    </div>
  </li>
</template>

<style scoped>
.tlistItem {
  background-color: #f6f6f6;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-width: 300px;
}
.tdate {
  font-size: 0.8rem;
  color: #554040;
}
.titemtitle {
  background-color: #167995;
}
.titemwrapper {
  background-color: #554040;
  padding: 0.5rem;
  height: 100%;
}
.btnEditDel {
  margin-top: 1rem;
  margin: auto 0;
  display: flex;
  gap: 0.8rem;
}
.controlsBtn {
  background-color: #55404086;
  color: #f6f5f5;
  width: 5rem;
  padding: 12px 18px;
}

.controlsBtn:hover {
  background-color: #554040;
}

.btnLikeDone {
  display: flex;
  gap: 10px;
  margin: 0.5rem 0;
  .liked {
    background-color: #07ac20;
  }
  .done {
    background-color: #1d199b;
  }
}
.tdescr {
  font-size: 0.8rem;
}
</style>
