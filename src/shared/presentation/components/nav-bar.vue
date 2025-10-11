<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
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
import LanguageToggle from "../../ui/login/components/LanguageToggle.component.vue";

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
    LanguageToggle,
  },
  setup() {
    const router = useRouter();
    const isOpen = ref(false);

    const showMenuButton = computed(() => {
      const routeName = router.currentRoute.value.name;
      return routeName !== 'login' && routeName !== 'register';
    });
    
    const toggleMenu = () => (isOpen.value = !isOpen.value);
    
    const navigateTo = (route) => {
      router.push({ name: route });
      isOpen.value = false;
    };
    
    const logout = () => {
      localStorage.removeItem('kapakid:user');
      router.push({ name: 'login' });
      isOpen.value = false;
    };
    
    return { isOpen, toggleMenu, navigateTo, logout, showMenuButton };
  },
};
</script>

<template>
  <div>
    <!-- Botón flotante fijo -->
    <button v-if="showMenuButton" class="menu-toggle" @click="toggleMenu" aria-label="Toggle Menu">
      <component :is="isOpen ? X : Menu" size="36" class="menu-icon" />
    </button>

    <!-- Overlay -->
    <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>

    <!-- Sidebar -->
    <aside :class="['sidebar', { open: isOpen }]">
      <nav>
        <ul>
          <li @click="navigateTo('home')"><Home /> Inicio</li>
          <li @click="navigateTo('home')"><User /> Perfil</li>
          <li @click="navigateTo('home')"><FileText /> Documentos</li>
          <li @click="navigateTo('home')"><CreditCard /> Pagos</li>
          <li @click="navigateTo('transport')"><Bus /> Transporte</li>
          <li @click="navigateTo('home')"><Clock /> Historial</li>
          <li @click="navigateTo('home')"><Bell /> Notificaciones</li>
          <li @click="navigateTo('support')"><HelpCircle /> Soporte</li>
        </ul>
      </nav>
      
      <div class="sidebar-footer">
        <div class="language-section">
          <LanguageToggle />
        </div>
        <div class="logout" @click="logout">
          <LogOut />
          <span>Cerrar Sesión</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* Botón flotante fijo con diseño moderno */
.menu-toggle {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 1000;
  background: linear-gradient(135deg, #0A3557 0%, #2D9CDB 100%);
  border: none;
  box-shadow: 0 8px 32px rgba(10, 53, 87, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
}

.menu-toggle:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 40px rgba(10, 53, 87, 0.4), 0 6px 20px rgba(0, 0, 0, 0.15);
}

.menu-toggle:active {
  transform: scale(0.95);
}

/* Ícono con animación */
.menu-icon {
  color: #ffffff;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.menu-toggle:hover .menu-icon {
  color: #ffffff;
  transform: scale(1.1);
}

/* Sidebar con diseño moderno */
.sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100%;
  background: linear-gradient(180deg, #0A3557 0%, #2D9CDB 50%, #0A3557 100%);
  box-shadow: 8px 0 40px rgba(10, 53, 87, 0.3), 4px 0 20px rgba(0, 0, 0, 0.2);
  padding: 100px 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1500;
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar.open {
  left: 0;
  box-shadow: 12px 0 50px rgba(0, 0, 0, 0.4), 6px 0 25px rgba(0, 0, 0, 0.3);
}

.sidebar nav ul {
  list-style: none;
  padding: 0 20px;
  margin: 0;
}

.sidebar nav li {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  margin: 8px 0;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: #e0e6ed;
  font-weight: 500;
  font-size: 16px;
  position: relative;
  overflow: hidden;
}

.sidebar nav li::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.sidebar nav li:hover::before {
  left: 100%;
}

.sidebar nav li:hover {
  background: linear-gradient(135deg, rgba(45, 156, 219, 0.2), rgba(10, 53, 87, 0.2));
  color: #ffffff;
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(45, 156, 219, 0.3);
}

.sidebar nav li svg {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.sidebar nav li:hover svg {
  transform: scale(1.1);
  filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.5));
}

/* Footer del sidebar */
.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: auto;
  padding: 0 20px;
}

.language-section {
  display: flex;
  justify-content: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Cerrar sesión con diseño moderno */
.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #E85B46;
  font-weight: 600;
  cursor: pointer;
  padding: 16px 20px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: rgba(232, 91, 70, 0.1);
  border: 1px solid rgba(232, 91, 70, 0.2);
  position: relative;
  overflow: hidden;
}

.logout::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.1), transparent);
  transition: left 0.5s;
}

.logout:hover::before {
  left: 100%;
}

.logout:hover {
  background: linear-gradient(135deg, #E85B46, #d44a35);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(232, 91, 70, 0.4);
}

.logout svg {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.logout:hover svg {
  transform: scale(1.1) rotate(-5deg);
}

/* Overlay con efecto moderno */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.8));
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}
</style>
