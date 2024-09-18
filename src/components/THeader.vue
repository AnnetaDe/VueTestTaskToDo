<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container">
    <div class="theader">
      <RouterLink :to="{ path: '/' }"
        ><FontAwesomeIcon :icon="faHashtag" size="lg" />ALL
      </RouterLink>
      <RouterLink :to="{ path: '/favorite' }"
        ><FontAwesomeIcon :icon="faHashtag" size="lg" /> LIKED</RouterLink
      >
      <RouterLink :to="{ path: '/done' }"
        ><FontAwesomeIcon :icon="faHashtag" size="lg" /> DONE</RouterLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theader {
  display: flex;
  align-items: flex-start;
  align-items: center;
  padding: 1rem 0;
}
a {
  font-size: 1.7rem;
  font-weight: 700;
  padding: 10px;
  margin-left: 1.5rem;
}

a:hover,
a.router-link-active {
  color: #b012ad;
}
</style>
