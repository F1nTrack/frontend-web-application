<template>
  <div class="documents-view">
    <h1>{{ t('documents.title') }}</h1>
    <div class="documents-content">
      <!-- Contenido de la vista de documentos -->
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'DocumentsView',
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>

<style scoped>
.documents-view {
  padding: 2rem;
}
</style>