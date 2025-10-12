<template>
  <div class="notifications-view">
    <h1>{{ t('notifications.title') }}</h1>
    <div class="notifications-content">
      <!-- Contenido de la vista de notificaciones -->
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'NotificationsView',
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>

<style scoped>
.notifications-view {
  padding: 2rem;
}
</style>