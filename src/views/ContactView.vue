<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // 模擬表單提交
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  submitSuccess.value = true
  
  // 重置表單
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  // 3 秒後重置成功狀態
  setTimeout(() => {
    submitSuccess.value = false
  }, 3000)
}

const contactInfo = [
  {
    icon: 'mail',
    title: '電子郵件',
    content: 'hello@wanderlens.com',
    link: 'mailto:hello@wanderlens.com'
  },
  {
    icon: 'phone',
    title: '電話',
    content: '+886 2 1234 5678',
    link: 'tel:+886212345678'
  },
  {
    icon: 'location',
    title: '地址',
    content: '台北市信義區松高路 1 號',
    link: '#'
  }
]
</script>

<template>
  <div class="contact-page">
    <div class="page-header">
      <div class="container">
        <h1>聯絡我們</h1>
        <p>有任何問題或合作提案？歡迎與我們聯繫</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>傳送訊息</h2>
            
            <div v-if="submitSuccess" class="success-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>訊息已成功送出！我們會盡快回覆您。</span>
            </div>
            
            <form v-else @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">姓名</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required
                  placeholder="請輸入您的姓名"
                >
              </div>
              
              <div class="form-group">
                <label for="email">電子郵件</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  placeholder="請輸入您的 Email"
                >
              </div>
              
              <div class="form-group">
                <label for="subject">主題</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="" disabled>請選擇主題</option>
                  <option value="general">一般詢問</option>
                  <option value="collaboration">合作提案</option>
                  <option value="technical">技術支援</option>
                  <option value="other">其他</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">訊息內容</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required
                  rows="5"
                  placeholder="請輸入您的訊息..."
                ></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting">傳送中...</span>
                <span v-else>送出訊息</span>
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <h2>聯絡資訊</h2>
            
            <div class="info-cards">
              <div v-for="info in contactInfo" :key="info.title" class="info-card">
                <div class="info-icon">
                  <svg v-if="info.icon === 'mail'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <svg v-else-if="info.icon === 'phone'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>{{ info.title }}</h3>
                  <a :href="info.link">{{ info.content }}</a>
                </div>
              </div>
            </div>

            <div class="social-section">
              <h3>追蹤我們</h3>
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
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  padding-top: 65px;
}

.page-header {
  background: var(--color-gray-50);
  padding: var(--spacing-3xl) 0;
  text-align: center;
}

.page-header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
}

.page-header p {
  font-size: 1.125rem;
  color: var(--color-gray-500);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.section {
  padding: var(--spacing-3xl) 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-xl);
}

/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-group label {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: var(--spacing-md);
  font-size: 1rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-gray-900);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--color-gray-400);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.success-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: #dcfce7;
  color: #166534;
  border-radius: var(--radius-md);
}

.success-message svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* Contact Info */
.info-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.info-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base);
}

.info-card:hover {
  transform: translateX(5px);
}

.info-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.info-icon svg {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.info-content h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-xs);
}

.info-content a {
  font-size: 1rem;
  color: var(--color-gray-900);
  transition: color var(--transition-fast);
}

.info-content a:hover {
  color: var(--color-primary);
}

.social-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-md);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--color-gray-100);
  color: var(--color-gray-600);
  transition: all var(--transition-fast);
}

.social-links a:hover {
  background: var(--color-gray-900);
  color: var(--color-white);
}

.social-links svg {
  width: 20px;
  height: 20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
