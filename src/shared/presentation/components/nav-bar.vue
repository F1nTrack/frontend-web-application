<script setup >
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
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
  Menu
} from 'lucide-vue-next'
import {Button as PvButton} from "primevue";

const { t } = useI18n()
const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
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
          <li>
            <RouterLink :to="{ name: 'home' }" @click="toggleMenu">
              <Home />
              {{ t('nav-bar.home') }}
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/documents" @click="toggleMenu">
              <FileText />
              {{ t('nav-bar.documents') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/payments" @click="toggleMenu">
              <CreditCard />
              {{ t('nav-bar.payments') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/transport" @click="toggleMenu">
              <Bus />
              {{ t('nav-bar.transport') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/history" @click="toggleMenu">
              <Clock />
              {{ t('nav-bar.history') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/notifications" @click="toggleMenu">
              <Bell />
              {{ t('nav-bar.notifications') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/technicalSupport" @click="toggleMenu">
              <HelpCircle />
              {{ t('nav-bar.support') }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="international">
        <pv-button class="en-btn" @click="$i18n.locale = 'en'">EN</pv-button>
        <pv-button class="es-btn" @click="$i18n.locale = 'es'">ES</pv-button>
      </div>
      <div class="logout">
        <RouterLink to="auth/login" @click="toggleMenu">
        <LogOut />
        <span>{{ t('nav-bar.out') }}</span>
        </RouterLink>
      </div>
    </aside>
  </div>
<router-view></router-view>

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
.international {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.en-btn,
.es-btn {
  background-color: #576b81;
  color: white;
  border: none;
  border-radius: 100px;
}
.menu-toggle:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}
.menu-icon {
  color: #333;
  transition: color 0.3s ease;
}
.menu-toggle:hover .menu-icon {
  color: #007bff;
}
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
.sidebar nav li a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  text-decoration: none;
  width: 100%;
}
.sidebar nav li:hover {
  background: #d5e2ea;
  box-shadow: 10px 5px 40px rgba(82, 159, 159, 0.28);
}
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
.logout{
  display: flex;
  justify-content: center;
  align-items: center;
}
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