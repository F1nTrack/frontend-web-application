<script setup>

import NavBar from "../../shared/presentation/components/nav-bar.vue";
import Notifications from "@/domains/dashboard-context/components/Notifications.vue";
import NotificationsComponent from "@/domains/notifications/components/notifications.component.vue";
import FooterContent from "@/shared/presentation/components/footer-content.vue";
</script>

<template>
  <nav-bar></nav-bar>
  <NotificationsComponent></NotificationsComponent>
  <footer-content></footer-content>

</template>

<style scoped>

</style>