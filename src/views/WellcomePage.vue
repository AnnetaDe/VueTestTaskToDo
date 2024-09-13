<script setup>
import TButton from '../components/TButton.vue'
</script>

<template>
  <div class="wellcomePage">
    <h1>Wellcome to the Task Manager</h1>
    <router-link to="tasks"><TButton>Go to tasks</TButton> </router-link>
  </div>
  <router-view></router-view>
</template>
