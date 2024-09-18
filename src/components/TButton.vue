<script setup></script>

<template>
  <button><slot>Click me</slot></button>
</template>

<style lang="scss" scoped>
button {
  padding: 8px 10px;
  border-radius: 8px;

  cursor: pointer;
}
</style>
