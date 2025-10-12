<template>
  <div class="history-view">
    <h1>{{ t('history.title') }}</h1>
    <div class="history-content">
      <!-- Contenido de la vista de historial -->
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'HistoryView',
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>

<style scoped>
.history-view {
  padding: 2rem;
}
</style>