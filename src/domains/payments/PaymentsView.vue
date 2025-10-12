<template>
  <div class="payments-view">
    <h1>{{ t('payments.title') }}</h1>
    <div class="payments-content">
      <!-- Contenido de la vista de pagos -->
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'PaymentsView',
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>

<style scoped>
.payments-view {
  padding: 2rem;
}
</style>