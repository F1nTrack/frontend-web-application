<template>
  <div class="transport-view">
    <h1>{{ t('transport.title') }}</h1>
    <div class="transport-content">
      <!-- Contenido de la vista de transporte -->
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'TransportView',
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>

<style scoped>
.transport-view {
  padding: 2rem;
}
</style>