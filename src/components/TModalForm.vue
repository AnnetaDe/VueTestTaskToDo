<script setup>
import { reactive } from 'vue'
import { watch, onMounted } from 'vue'
import TButton from './TButton.vue'
const emit = defineEmits(['save'])
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})
const form = reactive({
  name: '',
  description: '',
  isDone: false,
  isLiked: false
})
onMounted(() => {
  if (props.task) {
    form.name = props.task.name
    form.description = props.task.description
  }
})
watch(
  () => props.task,
  (newTask) => {
    form.name = newTask.name
    form.description = newTask.description
  }
)
</script>
<template>
  <form @submit.prevent="emit('save', { ...form })">
    <div class="tmodalForm">
      <h3>{{ task ? 'Edit Task' : 'Add Task' }}</h3>
      <label for="name">Name </label>
      <input
        id="name"
        type="text"
        v-model="form.name"
        :placeholder="form.name ? `${form.name}` : 'Enter name'"
        required
      />
      <label for="description">Description </label>
      <input
        id="description"
        type="textarea"
        v-model="form.description"
        :placeholder="form.description ? `${form.description}` : 'Enter description'"
      />
      <TButton>submit</TButton>
    </div>
  </form>
</template>

<style scoped>
.tmodalForm {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f6f6f6;
  padding: 8px;
  display: flex;
  justify-content: center;
}
input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
