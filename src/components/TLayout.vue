<template>
  <header>
    <nav>
      <router-link to="/favorite">Favorite</router-link>
      <router-link to="/done">Done</router-link>
    </nav>
  </header>
  <div>
    <slot> </slot>
  </div>
</template>
