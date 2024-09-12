<script setup>
import TButton from './TButton.vue'

const emit = defineEmits(['close'])
function handleClose() {
  emit('close')
}
function handleClickInside(event) {
  event.stopPropagation()
}
</script>
<template>
  <Teleport to="body">
    <div class="tmodalBackdrop" @click="handleClose">
      <div class="tmodalContent" @click="handleClickInside">
        <TButton @click="handleClose">Close</TButton>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modalBackdrop {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tmodalContent {
  background-color: #c2168b;
  padding: 10px;
  width: 40%;
}
</style>
