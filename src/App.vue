//json-server --watch fixtures/db.json --port 4000
<script>

import {defineComponent} from "vue";
import FooterContent from "./shared/presentation/components/footer-content.vue";
import NavBar from "./shared/presentation/components/nav-bar.vue";

export default defineComponent({
  components: {NavBar, FooterContent}
})
</script>
<template>
  <!--<router-view />-->
  <header>
    <nav-bar></nav-bar>
  </header>
  <body></body>
  <footer>
  </footer>
</template>

<style>

</style>

