<script setup></script>

<template>
  <button><slot>Click me</slot></button>
</template>

<style scoped>
button {
  background-color: #953232;
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #f6f5f5;
}
</style>
