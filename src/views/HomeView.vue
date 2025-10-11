
<script setup>
import NavBar from "../shared/presentation/components/nav-bar.vue";
</script>
<template>
  <nav-bar></nav-bar>
  <main class="home-container">
    <h1>{{ $t('welcome') }}</h1>
  </main>
</template>



<style scoped>
.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
