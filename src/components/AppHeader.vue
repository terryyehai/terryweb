<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  isScrolled: Boolean,
  isMobileMenuOpen: Boolean
})

const emit = defineEmits(['toggle-menu', 'close-menu'])

const navLinks = [
  { name: 'Home', path: '/', label: '首頁' },
  { name: 'Gallery', path: '/gallery', label: '相簿' },
  { name: 'About', path: '/about', label: '關於' },
  { name: 'Contact', path: '/contact', label: '聯絡' },
  { name: 'Settings', path: '/settings', label: '設定' }
]
</script>

<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <RouterLink to="/" class="logo">
        <svg class="logo-icon" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
          <circle cx="20" cy="20" r="8" stroke="currentColor" stroke-width="2"/>
          <line x1="20" y1="2" x2="20" y2="10" stroke="currentColor" stroke-width="2"/>
          <line x1="20" y1="30" x2="20" y2="38" stroke="currentColor" stroke-width="2"/>
          <line x1="2" y1="20" x2="10" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="30" y1="20" x2="38" y2="20" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span class="logo-text">Wanderlens</span>
      </RouterLink>
      
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink :to="link.path" class="nav-link" active-class="active">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <button class="btn-icon" aria-label="搜尋">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <button class="btn-login">登入</button>
        <button 
          class="mobile-menu-btn" 
          :class="{ active: isMobileMenuOpen }"
          aria-label="選單"
          @click="emit('toggle-menu')"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation -->
  <div class="mobile-nav" :class="{ active: isMobileMenuOpen }">
    <ul class="mobile-nav-list">
      <li v-for="link in navLinks" :key="link.name">
        <RouterLink :to="link.path" @click="emit('close-menu')">
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-gray-200);
  transition: all var(--transition-base);
}

.header.scrolled {
  box-shadow: var(--shadow-md);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.nav-list {
  display: flex;
  gap: var(--spacing-xl);
}

.nav-link {
  position: relative;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-gray-600);
  padding: var(--spacing-sm) 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-gray-900);
  transition: width var(--transition-fast);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-gray-900);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--color-gray-700);
  transition: all var(--transition-fast);
}

.btn-icon:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-900);
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}

.btn-login {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.btn-login:hover {
  background: var(--color-gray-900);
  color: var(--color-white);
  border-color: var(--color-gray-900);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
}

.mobile-menu-btn span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-gray-700);
  border-radius: 1px;
  transition: all var(--transition-fast);
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  position: fixed;
  top: 65px;
  left: 0;
  right: 0;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  z-index: 99;
  transform: translateY(-100%);
  opacity: 0;
  transition: all var(--transition-base);
}

.mobile-nav.active {
  transform: translateY(0);
  opacity: 1;
}

.mobile-nav-list {
  padding: var(--spacing-lg);
}

.mobile-nav-list li {
  border-bottom: 1px solid var(--color-gray-100);
}

.mobile-nav-list a {
  display: block;
  padding: var(--spacing-md) 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.mobile-nav-list a:hover {
  color: var(--color-gray-900);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-nav {
    display: block;
  }
  
  .btn-login {
    display: none;
  }
}
</style>
