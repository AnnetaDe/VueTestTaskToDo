<script setup>
import TButton from './TButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash, faEdit, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

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
    <div class="dateWrapper">
      <p class="tdeadline">Deadline: {{ deadLine }}</p>
      <div class="btnLikeDone">
        <TButton @click="completeTask" class="controlsBtn" :class="{ done: task.isdone }"
          ><FontAwesomeIcon :icon="faCheckCircle" size="3x"
        /></TButton>
        <TButton @click="likeTask" class="controlsBtn" :class="{ liked: task.isliked }"
          ><FontAwesomeIcon :icon="faHeart" size="3x"
        /></TButton>
      </div>
    </div>

    <h2 class="titemtitle">{{ task.name }}</h2>

    <div class="titemwrapper">
      <p class="tdescr">description: {{ task.description }}</p>
    </div>
    <div class="btnEditDel">
      <TButton class="controlsBtn" @click="openModalEdit"
        ><FontAwesomeIcon :icon="faEdit" size="lg"
      /></TButton>
      <TButton class="controlsBtn" @click="deleteTask"
        ><FontAwesomeIcon :icon="faTrash" size="lg"
      /></TButton>
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
  margin: auto 0;
  display: flex;
  gap: 0.8rem;
  .controlsBtn {
    padding: 16px 32px;
    width: 100%;
  }
}
.btnLikeDone {
  display: flex;
  padding: 8px;

  .controlsBtn {
    padding: 16px;
    background-color: #f6f6f6;
  }
}

.fa-circle-check,
.fa-heart {
  color: #8d8c8c;
}

.controlsBtn.done .fa-circle-check {
  color: #0e707b;
}

.controlsBtn.liked .fa-heart {
  color: #b012ad;
}

.controlsBtn {
  .fa-heart :hover {
    color: #b012ad;
  }
  .fa-circle-check :hover {
    color: #0e707b;
  }
}

.tdescr {
  font-size: 0.8rem;
}
</style>
