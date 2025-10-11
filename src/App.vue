<script>
import {defineComponent} from "vue";
import FooterContent from "./shared/presentation/components/footer-content.vue";
import NavBar from "./shared/presentation/components/nav-bar.vue";

export default defineComponent({
  components: {NavBar, FooterContent}
})
</script>

<template>
  <div id="app">
    <header>
      <nav-bar></nav-bar>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <footer-content></footer-content>
    </footer>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

