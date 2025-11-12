<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/services/api.client.js'

const usuario = ref(null)
const message = ref('')
const chatOpen = ref(false)
const chatMessages = ref([
  { sender: 'soporte', text: '¡Hola! 👋 Bienvenido al centro de ayuda de Finanzas App.' },
  { sender: 'soporte', text: '¿En qué puedo ayudarte hoy?' }
])

onMounted(async () => {
  try {
    const response = await apiClient.get('/usuarios/1')
    usuario.value = response.data
  } catch (error) {
    console.error('Error al cargar usuario:', error)
  }
})

const sendMessage = () => {
  if (message.value.trim() === '') return
  chatMessages.value.push({ sender: 'usuario', text: message.value })
  setTimeout(() => {
    chatMessages.value.push({
      sender: 'soporte',
      text: 'Gracias por tu mensaje, te responderemos pronto 💬'
    })
  }, 800)
  message.value = ''
}

const downloadChat = () => {
  const content = chatMessages.value
      .map(msg => `${msg.sender === 'usuario' ? 'Tú' : 'Soporte'}: ${msg.text}`)
      .join('\n')
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'conversacion_soporte.txt'
  link.click()
}
</script>

<template>
  <div class="support-wrapper">
    <div class="support-container">
      <div class="header">
        <h2>Centro de Soporte</h2>
        <p v-if="usuario">Hola, <b>{{ usuario.firstName }}</b> 👋 ¿Necesitas asistencia?</p>
        <p v-else>Cargando tus datos...</p>
      </div>

      <div class="contact-options">
        <div class="contact-card">
          <i class="pi pi-envelope"></i>
          <h3>Correo</h3>
          <p>support@finanzasapp.com</p>
        </div>
        <div class="contact-card">
          <i class="pi pi-phone"></i>
          <h3>Teléfono</h3>
          <p>+51 987 654 321</p>
        </div>
        <div class="contact-card highlight">
          <i class="pi pi-comments"></i>
          <h3>Chat en línea</h3>
          <p>Habla con un agente en tiempo real</p>
          <button class="btn-primary" @click="chatOpen = true">Abrir chat</button>
        </div>
      </div>
    </div>

    <!-- MODAL CHAT -->
    <div v-if="chatOpen" class="modal-overlay" @click.self="chatOpen = false">
      <div class="modal">
        <div class="modal-header">
          <h3>💬 Chat con Soporte</h3>
          <button class="close-btn" @click="chatOpen = false">&times;</button>
        </div>

        <div class="chat-body">
          <div
              v-for="(msg, index) in chatMessages"
              :key="index"
              :class="['chat-message', msg.sender]"
          >
            <p>{{ msg.text }}</p>
          </div>
        </div>

        <div class="chat-footer">
          <input
              type="text"
              v-model="message"
              placeholder="Escribe tu mensaje..."
              @keyup.enter="sendMessage"
          />
          <button class="btn-primary" @click="sendMessage">Enviar</button>
          <button class="btn-secondary" @click="downloadChat">📄 Descargar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.support-wrapper {
  background: linear-gradient(135deg, #e0f2fe, #f0f9ff);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3rem;
}

.support-container {
  max-width: 900px;
  width: 90%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 160px;
  animation: fadeIn 0.8s ease;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h2 {
  color: #1e40af;
  font-weight: 700;
}

.contact-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.contact-card {
  width: 250px;
  text-align: center;
  padding: 1.5rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.15);
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
}

.contact-card i {
  font-size: 2.3rem;
  color: #2563eb;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
}

.contact-card:hover i {
  transform: scale(1.1);
}

.contact-card.highlight {
  border: 2px solid #2563eb;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #1e40af;
}

.btn-secondary {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 0.9rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-secondary:hover {
  background-color: #059669;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background-color: white;
  border-radius: 1rem;
  width: 420px;
  max-width: 95%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fadeUp 0.4s ease;
}

.modal-header {
  background-color: #2563eb;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  color: white;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}

.chat-body {
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat-message {
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.4;
}

.chat-message.usuario {
  background-color: #2563eb;
  color: white;
  align-self: flex-end;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
}

.chat-message.soporte {
  background-color: #e5e7eb;
  align-self: flex-start;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.chat-footer {
  display: flex;
  gap: 0.5rem;
  padding: 0.7rem 1rem 1rem;
  background-color: #f1f5f9;
}

.chat-footer input {
  flex: 1;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.5rem;
  outline: none;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
