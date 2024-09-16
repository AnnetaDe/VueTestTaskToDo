<script setup>
import TButton from './TButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faTrash,
  faEdit,
  faHeart,
  faHeartBroken,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

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

const deadLine = new Date(props.task.deadLine).toLocaleDateString()
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
    <div class="btnLikeDone">
      <TButton @click="completeTask" class="controlsBtn" :class="{ done: task.isDone }"
        ><FontAwesomeIcon :icon="faCheckCircle"
      /></TButton>
      <TButton @click="likeTask" class="controlsBtn" :class="{ liked: task.isLiked }"
        ><FontAwesomeIcon :icon="faHeart"
      /></TButton>
    </div>
    <div class="dateWrapper">
      <p class="tdate">{{ date }}</p>
      <p class="tdeadline">Deadline: {{ deadLine }}</p>
    </div>
    <div class="titemwrapper">
      <h3 class="titemtitle">{{ task.name }}</h3>
      <p class="tdescr">description: {{ task.description }}</p>
    </div>
    <div class="btnEditDel">
      <TButton class="controlsBtn" @click="openModalEdit"
        ><FontAwesomeIcon :icon="faEdit"
      /></TButton>
      <TButton class="controlsBtn" @click="deleteTask"><FontAwesomeIcon :icon="faTrash" /></TButton>
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
.dateWrapper {
  display: flex;
  justify-content: space-between;
}
.tdate,
.tdeadline {
  font-size: 0.8rem;
  color: #554040;
}
.titemtitle {
  background-color: #167995;
}
.titemwrapper {
  height: 100%;
}
.btnEditDel {
  padding: 0.5rem 0;
  margin: auto 0;
  display: flex;
  gap: 0.8rem;
  .controlsBtn {
    border: #55404086 solid 1px;
    color: #f6f5f5;
    padding: 16px;
    background-color: #55404086;
  }
}
.btnLikeDone {
  padding: 0.5rem 0;
  display: flex;
  gap: 10px;
  .controlsBtn {
    border: #55404086 solid 1px;
    color: #f6f5f5;
    padding: 16px;
    background-color: #55404086;
  }
}

.controlsBtn.done {
  background-color: #0e707b;
}

.controlsBtn.liked {
  background-color: red;
}

.controlsBtn:hover {
  background-color: #554040;
}

.tdescr {
  font-size: 0.8rem;
}
</style>
