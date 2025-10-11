<script>
import { ref } from "vue";
import {
  Home,
  User,
  FileText,
  CreditCard,
  Bus,
  Clock,
  Bell,
  HelpCircle,
  LogOut,
  X,
  Menu,
} from "lucide-vue-next";

export default {
  name: "VerticalNavbar",
  components: {
    Home,
    User,
    FileText,
    CreditCard,
    Bus,
    Clock,
    Bell,
    HelpCircle,
    LogOut,
    X,
    Menu,
  },
  setup() {
    const isOpen = ref(false);
    const toggleMenu = () => (isOpen.value = !isOpen.value);
    return { isOpen, toggleMenu };
  },
};
</script>

<template>
  <div>
    <!-- Botón flotante fijo -->
    <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle Menu">
      <component :is="isOpen ? X : Menu" size="36" class="menu-icon" />
    </button>

    <!-- Overlay -->
    <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>

    <!-- Sidebar -->
    <aside :class="['sidebar', { open: isOpen }]">
      <nav>
        <ul>
          <li><Home /> Inicio</li>
          <li><User /> Perfil</li>
          <li><FileText /> Documentos</li>
          <li><CreditCard /> Pagos</li>
          <li><Bus /> Transporte</li>
          <li><Clock /> Historial</li>
          <li><Bell /> Notificaciones</li>
          <li><HelpCircle /> Soporte</li>
        </ul>
      </nav>
      <div class="logout">
        <LogOut />
        <span>Cerrar Sesión</span>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* Botón flotante fijo */
.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 2000;
  background: #ffffff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

/* Ícono visible y grande */
.menu-icon {
  color: #333;
  transition: color 0.3s ease;
}

.menu-toggle:hover .menu-icon {
  color: #007bff;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: -260px;
  width: 260px;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
  padding: 90px 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: left 0.3s ease;
  z-index: 1500;
}

.sidebar.open {
  left: 0;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;
}

.sidebar nav li:hover {
  background: #bbdaef;
}

/* Cerrar sesión (efecto restaurado) */
.logout {
  display: flex;
  align-items: center;
  gap: 10px;
  color: red;
  font-weight: 600;
  margin-top: 30px;
  cursor: pointer;
  padding: 12px 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.logout:hover {
  background: red;
  color: white;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
</style>
