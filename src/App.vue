//json-server --watch fixtures/db.json --port 4000
<script>


import {defineComponent} from "vue";
import NavBar from "./shared/presentation/components/nav-bar.vue";

export default defineComponent({
  components: {NavBar}
})
</script>
<template>

  <!--<router-view />-->
  <router-view />
  <!--<header><nav-bar></nav-bar></header>-->

</template>

<style>

</style>

//json-server --watch fixtures/db.json --port 4000
