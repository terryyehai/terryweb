<script setup>
import { RouterLink } from 'vue-router'

const quickLinks = [
  { path: '/', label: '首頁' },
  { path: '/gallery', label: '相簿' },
  { path: '/about', label: '關於' },
  { path: '/contact', label: '聯絡' }
]

const supportLinks = [
  { href: '#', label: '常見問題' },
  { href: '#', label: '隱私政策' },
  { href: '#', label: '使用條款' },
  { href: '#', label: 'Cookie 設定' }
]

const socialLinks = [
  { name: 'Instagram', icon: 'instagram', href: '#' },
  { name: 'YouTube', icon: 'youtube', href: '#' },
  { name: 'Facebook', icon: 'facebook', href: '#' },
  { name: 'Twitter', icon: 'twitter', href: '#' }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
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
          <p>探索世界的無限視角</p>
        </div>
        
        <div class="footer-links">
          <h4>快速連結</h4>
          <ul>
            <li v-for="link in quickLinks" :key="link.path">
              <RouterLink :to="link.path">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>
        
        <div class="footer-links">
          <h4>支援</h4>
          <ul>
            <li v-for="link in supportLinks" :key="link.label">
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-social">
          <h4>追蹤我們</h4>
          <div class="social-links">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Wanderlens. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-gray-900);
  color: var(--color-gray-400);
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
  border-top: 1px solid var(--color-gray-800);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.footer-brand .logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-white);
  margin-bottom: var(--spacing-md);
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
}

.footer-brand p {
  font-size: 0.9375rem;
  line-height: 1.6;
}

.footer-links h4,
.footer-social h4 {
  color: var(--color-white);
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-links a {
  font-size: 0.9375rem;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-white);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-gray-800);
  transition: all var(--transition-fast);
}

.social-links a:hover {
  background: var(--color-white);
  color: var(--color-gray-900);
}

.social-links svg {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-gray-800);
  text-align: center;
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-brand .logo {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>
