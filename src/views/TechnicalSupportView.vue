<template>
    
  <div class="kapakid-page-content">
    <!-- Botón de idioma en la esquina superior derecha -->
    <div class="language-toggle-container">
      <LanguageToggle />
    </div>
    
    <h1 class="page-header">{{ $t('help.title') }}</h1>
    <p class="page-subtitle">{{ $t('help.subtitle') }}</p>

    <div class="card help-center-card">
      <h2 class="card-title">{{ $t('help.center_title') }}</h2>

      <div class="search-bar">
        <input
            type="text"
            :placeholder="$t('help.search_placeholder')"
            class="search-input"
        />
      </div> 
  
      
      <h3 class="popular-topics-header">{{ $t('help.popular_topics') }}</h3>
      <div class="popular-topics-grid">
        <button class="topic-button">{{ $t('help.topic_login') }}</button>
        <button class="topic-button">{{ $t('help.topic_dce') }}</button>
        <button class="topic-button">{{ $t('help.topic_recharge') }}</button>
        <button class="topic-button">{{ $t('help.topic_data') }}</button>
      </div>
    </div>

    <div class="card contact-card">
      <h2 class="card-title">{{ $t('help.contact_title') }}</h2>
      <p class="card-subtitle-contact">{{ $t('help.contact_subtitle') }}</p>

      <div class="contact-options-grid">
        <div class="contact-option-panel">
          <h4>{{ $t('help.chat_title') }}</h4>
          <small>{{ $t('help.chat_hours') }}</small>
          <a href="#" class="button primary">{{ $t('help.chat_button') }}</a>
        </div>

        <div class="contact-option-panel">
          <h4>{{ $t('help.ticket_title') }}</h4>
          <small>{{ $t('help.ticket_response') }}</small>
          <a href="#" class="button secondary">{{ $t('help.ticket_button') }}</a>
        </div>
      </div>
    </div>

    <div class="card docs-card">
      <h2 class="card-title">{{ $t('help.docs_title') }}</h2>
      <p class="card-subtitle">{{ $t('help.docs_subtitle') }}</p>

      <div class="documentation-list">
        <a href="#"
           v-for="(doc, index) in documentationLinks"
           :key="index"
           class="doc-item-link"
        >
          <div>
            <span>{{ $t('help.' + doc.key) }}</span>
            <small class="doc-format">{{ doc.format }}</small>
          </div>
        </a>
      </div>
    </div>

  </div> 
</template>

<script>
import LanguageToggle from '../shared/ui/login/components/LanguageToggle.component.vue';

export default {
  name: 'SoporteAyuda',
  components: {
    LanguageToggle
  },
  
  data() {
    return {
      documentationLinks: [
        { key: 'doc_guide', format: 'PDF/Web' },
        { key: 'doc_terms', format: 'Web' },
        { key: 'doc_privacy', format: 'Web' },
        { key: 'doc_faq', format: 'Web' },
        { key: 'doc_security', format: 'PDF' },
      ]
    };
  }
}
</script>

<style scoped>
/* ================================ */
/* ESTILOS GENERALES Y LAYOUT BASE  */
/* ================================ */
.kapakid-page-content { max-width: 1200px; margin: 0 auto; padding: 30px; font-family: sans-serif; position: relative; }

.language-toggle-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}
.page-header { font-size: 2em; font-weight: 600; color: #1a1a1a; margin-bottom: 5px; }
.page-subtitle { color: #6a6a6a; margin-bottom: 30px; font-size: 1.1em; }
.card { background: #ffffff; border-radius: 12px; padding: 25px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03); }
.card-title { font-size: 1.3em; font-weight: 600; color: #333; margin-bottom: 15px; }

/* ================================ */
/* BLOQUE: CENTRO DE AYUDA          */
/* ================================ */
.search-input { width: 100%; padding: 12px 15px; background: #f7f7f7; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 1em; color: #333; margin-bottom: 25px; }
.popular-topics-header { font-weight: 500; color: #555; margin-top: 15px; margin-bottom: 10px; }
.popular-topics-grid { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }
.topic-button { background: #f0f3ff; color: #007bff; border: none; border-radius: 8px; padding: 10px 15px; cursor: pointer; font-size: 0.9em; font-weight: 500; transition: background 0.2s; }
.topic-button:hover { background: #d4e0ff; }

/* ================================ */
/* BLOQUE: CONTACTO DIRECTO         */
/* ================================ */
.card-subtitle-contact { color: #6a6a6a; margin-bottom: 20px; }
.contact-options-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.contact-option-panel { border: 1px solid #eee; border-radius: 10px; padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; }
.contact-option-panel small { display: block; color: #888; margin-bottom: 20px; flex-grow: 1; }
.button { padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.3s; width: 100%; text-decoration: none; display: inline-block; }
.button.primary { background-color: #007bff; color: white; border: 1px solid #007bff; }
.button.secondary { background-color: white; color: #007bff; border: 1px solid #007bff; }

/* ==================================== */
/* BLOQUE: GUÍAS Y DOCUMENTACIÓN        */
/* ==================================== */
.documentation-list { display: flex; flex-direction: column; gap: 1px; }
.doc-item-link { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; text-decoration: none; color: #333; }
.doc-item-link:last-child { border-bottom: none; }
.doc-item-link:hover { background-color: #f9f9f9; }
.doc-item-link span { font-weight: 500; display: block; }
.doc-format { font-size: 0.8em; color: #888; }
</style>