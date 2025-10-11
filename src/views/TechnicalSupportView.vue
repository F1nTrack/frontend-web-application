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
.kapakid-page-content { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 40px 30px; 
  font-family: "Poppins", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; 
  position: relative;
  background: linear-gradient(135deg, #0A3557 0%, #2D9CDB 100%);
  min-height: 100vh;
  color: #F9FAFB;
}

.kapakid-page-content::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(45, 156, 219, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(10, 53, 87, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.language-toggle-container {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}
.page-header { 
  font-size: 3rem; 
  font-weight: 800; 
  color: #1e293b; 
  margin-bottom: 1rem;
  text-align: center;
  color: #F9FAFB;
  font-family: 'Poppins', sans-serif;
  position: relative;
  z-index: 1;
}

.page-subtitle { 
  color: #E5E7EB; 
  margin-bottom: 3rem; 
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  position: relative;
  z-index: 1;
  font-family: 'Roboto', sans-serif;
}

.card { 
  background: rgba(249, 250, 251, 0.9); 
  border-radius: 24px; 
  padding: 32px; 
  margin-bottom: 2rem; 
  box-shadow: 
    0 20px 40px rgba(10, 53, 87, 0.1),
    0 8px 16px rgba(45, 156, 219, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(45, 156, 219, 0.2);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: #374151;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0A3557, #2D9CDB, #0A3557);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 64px rgba(10, 53, 87, 0.15),
    0 16px 32px rgba(45, 156, 219, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.card-title { 
  font-size: 1.5rem; 
  font-weight: 700; 
  color: #1e293b; 
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

/* ================================ */
/* BLOQUE: CENTRO DE AYUDA          */
/* ================================ */
.search-input { 
  width: 100%; 
  padding: 18px 24px; 
  background: rgba(255, 255, 255, 0.8); 
  border: 2px solid rgba(229, 231, 235, 0.5); 
  border-radius: 16px; 
  font-size: 1rem; 
  color: #1f2937; 
  margin-bottom: 2rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 
    0 0 0 4px rgba(102, 126, 234, 0.1),
    0 8px 25px rgba(102, 126, 234, 0.15);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.popular-topics-header { 
  font-weight: 600; 
  color: #374151; 
  margin-top: 1.5rem; 
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.popular-topics-grid { 
  display: flex; 
  gap: 16px; 
  flex-wrap: wrap; 
  margin-bottom: 1.5rem; 
}

.topic-button { 
  background: linear-gradient(135deg, rgba(10, 53, 87, 0.1), rgba(45, 156, 219, 0.1)); 
  color: #2D9CDB; 
  border: 1px solid rgba(45, 156, 219, 0.2); 
  border-radius: 12px; 
  padding: 12px 20px; 
  cursor: pointer; 
  font-size: 0.95rem; 
  font-weight: 600; 
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  font-family: 'Roboto', sans-serif;
}

.topic-button:hover { 
  background: linear-gradient(135deg, #0A3557, #2D9CDB);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(10, 53, 87, 0.3);
}

/* ================================ */
/* BLOQUE: CONTACTO DIRECTO         */
/* ================================ */
.card-subtitle-contact { 
  color: #64748b; 
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.contact-options-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 24px; 
}

.contact-option-panel { 
  border: 1px solid rgba(229, 231, 235, 0.5); 
  border-radius: 20px; 
  padding: 32px 24px; 
  text-align: center; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.contact-option-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.contact-option-panel small { 
  display: block; 
  color: #64748b; 
  margin-bottom: 24px; 
  flex-grow: 1;
  font-size: 0.95rem;
  line-height: 1.5;
}

.button { 
  padding: 16px 24px; 
  border-radius: 16px; 
  font-weight: 700; 
  cursor: pointer; 
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
  width: 100%; 
  text-decoration: none; 
  display: inline-block;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.button:hover::before {
  left: 100%;
}

.button.primary { 
  background: linear-gradient(135deg, #0A3557 0%, #2D9CDB 100%);
  color: white; 
  border: none;
  box-shadow: 0 8px 25px rgba(10, 53, 87, 0.3);
  font-family: 'Roboto', sans-serif;
}

.button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(10, 53, 87, 0.4);
}

.button.secondary { 
  background: rgba(249, 250, 251, 0.8); 
  color: #2D9CDB; 
  border: 2px solid #2D9CDB;
  backdrop-filter: blur(10px);
  font-family: 'Roboto', sans-serif;
}

.button.secondary:hover {
  background: #2D9CDB;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 156, 219, 0.3);
}

/* ==================================== */
/* BLOQUE: GUÍAS Y DOCUMENTACIÓN        */
/* ==================================== */
.documentation-list { 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
}

.doc-item-link { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 20px 24px; 
  border-radius: 16px;
  text-decoration: none; 
  color: #374151;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(229, 231, 235, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-weight: 500;
}

.doc-item-link:hover { 
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(8px);
  color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.doc-item-link:last-child { 
  margin-bottom: 0; 
}
.doc-item-link span { font-weight: 500; display: block; }
.doc-format { font-size: 0.8em; color: #888; }
</style>