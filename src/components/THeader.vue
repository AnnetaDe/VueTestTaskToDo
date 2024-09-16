<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

import { RouterLink } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'

const { setFilter } = useTaskStore()
</script>

<template>
  <div class="container">
    <div class="theader">
      <RouterLink :to="{ path: '/' }"><FontAwesomeIcon :icon="faHashtag" />ALL </RouterLink>
      <RouterLink :to="{ path: '/favorite' }"
        ><FontAwesomeIcon :icon="faHashtag" /> LIKED</RouterLink
      >
      <RouterLink :to="{ path: '/done' }"><FontAwesomeIcon :icon="faHashtag" /> DONE</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theader {
  display: flex;
  align-items: flex-start;
  align-items: center;
  background-color: #953232;
  padding: 1rem;
}
a {
  font-size: 1.2rem;
  font-weight: 700;
  padding: 10px;
  margin-left: 1rem;
}

a:hover,
a.router-link-active {
  color: #b012ad;
  border: 1px solid #b012ad;
}
</style>
