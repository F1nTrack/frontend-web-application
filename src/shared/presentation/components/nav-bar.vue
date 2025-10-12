<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  Home,
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
    const { t } = useI18n();
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
    
    return { isOpen, toggleMenu, navigateTo, logout, showMenuButton, t };
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
          <li @click="navigateTo('home')">
            <Home />
            <span>{{ t('nav-bar.home') }}</span>
          </li>
          <li @click="navigateTo('documents')">
            <FileText />
            <span>{{ t('nav-bar.documents') }}</span>
          </li>
          <li @click="navigateTo('payments')">
            <CreditCard />
            <span>{{ t('nav-bar.payments') }}</span>
          </li>
          <li @click="navigateTo('transport')">
            <Bus />
            <span>{{ t('nav-bar.transport') }}</span>
          </li>
          <li @click="navigateTo('history')">
            <Clock />
            <span>{{ t('nav-bar.history') }}</span>
          </li>
          <li @click="navigateTo('notifications')">
            <Bell />
            <span>{{ t('nav-bar.notifications') }}</span>
          </li>
          <li @click="navigateTo('support')">
            <HelpCircle />
            <span>{{ t('nav-bar.support') }}</span>
          </li>
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
  top: 20px;
  left: 20px;
  z-index: 2000;
  background: linear-gradient(135deg, #2D9CDB 0%, #0A3557 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(45, 156, 219, 0.2);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
}

.menu-toggle:hover {
  transform: scale(1.05) rotate(90deg);
  box-shadow: 0 6px 20px rgba(45, 156, 219, 0.3);
}

.menu-toggle:active {
  transform: scale(0.95);
}

/* Ícono con animación */
.menu-icon {
  color: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-toggle:hover .menu-icon {
  transform: scale(1.1);
  color: #ffffff;
}

/* Sidebar con diseño moderno */
.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.05);
  padding: 100px 24px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1500;
  border-right: 1px solid rgba(45, 156, 219, 0.1);
}

.sidebar.open {
  left: 0;
  box-shadow: 5px 0 25px rgba(45, 156, 219, 0.1);
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar nav li {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  margin: 0;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #64748b;
  font-weight: 500;
  font-size: 15px;
  position: relative;
  background: transparent;
}

.sidebar nav li:hover {
  background: linear-gradient(135deg, rgba(45, 156, 219, 0.1) 0%, rgba(10, 53, 87, 0.05) 100%);
  color: #2D9CDB;
  transform: translateX(8px);
}

.sidebar nav li svg {
  width: 22px;
  height: 22px;
  color: #94a3b8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar nav li:hover svg {
  transform: scale(1.1) rotate(5deg);
  color: #2D9CDB;
}

/* Footer del sidebar */
.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: auto;
  padding: 24px 0;
  border-top: 1px solid rgba(45, 156, 219, 0.1);
}

.language-section {
  display: flex;
  justify-content: center;
  padding: 16px;
  background: linear-gradient(135deg, rgba(45, 156, 219, 0.05) 0%, rgba(10, 53, 87, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid rgba(45, 156, 219, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.language-section:hover {
  background: linear-gradient(135deg, rgba(45, 156, 219, 0.1) 0%, rgba(10, 53, 87, 0.1) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 156, 219, 0.1);
}

/* Cerrar sesión con diseño moderno */
.logout {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #ef4444;
  font-weight: 500;
  cursor: pointer;
  padding: 16px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(127, 29, 29, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(8px);
}

.logout:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(127, 29, 29, 0.1) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
}

.logout svg {
  width: 22px;
  height: 22px;
  color: #ef4444;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout:hover svg {
  transform: scale(1.1) rotate(5deg);
}

/* Overlay con efecto moderno */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 53, 87, 0.3);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
