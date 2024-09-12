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
        <TButton @click="handleClose">X</TButton>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.tmodalBackdrop {
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
  background-color: #f6f6f6;
  padding: 16px;
  width: 30%;
  border-radius: 5px;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);
}
</style>
