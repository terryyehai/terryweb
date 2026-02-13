<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getAllItems, mediaTypes } from '@/services/galleryService'
import GalleryGrid from '@/components/GalleryGrid.vue'
import LightboxModal from '@/components/LightboxModal.vue'

const items = ref([])
const selectedFilter = ref('all')
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

onMounted(async () => {
  items.value = await getAllItems()
})

const filteredItems = () => {
  if (selectedFilter.value === 'all') {
    return items.value
  }
  return items.value.filter(item => item.type === selectedFilter.value)
}

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxVisible.value = true
}

const closeLightbox = () => {
  lightboxVisible.value = false
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-media">
        <video autoplay muted loop playsinline class="hero-video">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-rocky-shore-ocean-waves-aerial-view-4078-large.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">探索世界的<br>無限視角</h1>
        <p class="hero-subtitle">沉浸式 360° 旅遊攝影體驗，帶你走進每一個精彩瞬間</p>
        <div class="hero-cta">
          <RouterLink to="/gallery" class="btn btn-primary">開始探索</RouterLink>
          <RouterLink to="/about" class="btn btn-outline">了解更多</RouterLink>
        </div>
      </div>
      <div class="hero-scroll">
        <span>向下滾動</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- Featured Gallery Section -->
    <section class="section categories">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">精選分類</h2>
          <p class="section-subtitle">探索不同類型的視覺體驗</p>
        </div>
        
        <div class="category-tabs">
          <button 
            v-for="type in mediaTypes" 
            :key="type.value"
            class="tab-btn"
            :class="{ active: selectedFilter === type.value }"
            @click="selectedFilter = type.value"
          >
            {{ type.label }}
          </button>
        </div>

        <GalleryGrid 
          :items="filteredItems().slice(0, 8)" 
          @item-click="openLightbox"
        />

        <div class="load-more">
          <RouterLink to="/gallery" class="btn btn-secondary">查看更多</RouterLink>
        </div>
      </div>
    </section>

    <!-- 360 Experience Section -->
    <section class="section experience-section">
      <div class="container">
        <div class="experience-content">
          <div class="experience-text">
            <span class="experience-tag">沉浸式體驗</span>
            <h2>360° 全景探索</h2>
            <p>透過我們的 360° 技術，讓您彷彿親臨現場。從世界地標到隱藏秘境，每一個角度都不會錯過。</p>
            <ul class="experience-features">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>支援手機陀螺儀互動</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>VR 頭戴裝置相容</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>8K 超高解析度內容</span>
              </li>
            </ul>
            <RouterLink to="/gallery?filter=360-photo" class="btn btn-primary">體驗 360°</RouterLink>
          </div>
          <div class="experience-demo">
            <div class="demo-360">
              <img 
                src="https://images.unsplash.com/photo-1492546643178-96d64f3fd824?w=800&q=80" 
                alt="360 示意" 
                class="demo-image"
                draggable="false"
              >
              <div class="demo-controls">
                <span class="drag-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l3 3 3-3M19 9l3 3-3 3"/>
                    <path d="M2 12h20M12 2v20"/>
                  </svg>
                  拖曳旋轉
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Preview Section -->
    <section class="section about-preview">
      <div class="container">
        <div class="about-grid">
          <div class="about-image">
            <img 
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80" 
              alt="攝影師" 
              loading="lazy"
            >
          </div>
          <div class="about-content">
            <span class="about-tag">關於我們</span>
            <h2>用影像說故事</h2>
            <p>Wanderlens 是一個專注於旅遊攝影的平台，我們相信每一張照片都承載著一個故事，每一段影片都記錄著一段旅程。</p>
            <p>我們的團隊由熱愛旅行的攝影師組成，足跡遍布全球 50+ 國家，致力於帶給您最真實、最震撼的視覺體驗。</p>
            <div class="about-stats">
              <div class="stat">
                <span class="stat-number">500+</span>
                <span class="stat-label">精選作品</span>
              </div>
              <div class="stat">
                <span class="stat-number">50+</span>
                <span class="stat-label">國家足跡</span>
              </div>
              <div class="stat">
                <span class="stat-number">100K+</span>
                <span class="stat-label">社群追蹤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="section contact-section">
      <div class="container">
        <div class="section-header centered">
          <h2 class="section-title">保持聯繫</h2>
          <p class="section-subtitle">訂閱我們的電子報，獲取最新旅遊攝影資訊</p>
        </div>
        <form class="newsletter-form" @submit.prevent>
          <input type="email" placeholder="輸入您的 Email" required>
          <button type="submit" class="btn btn-primary">訂閱</button>
        </form>
      </div>
    </section>

    <!-- Lightbox -->
    <LightboxModal 
      v-if="lightboxVisible"
      :items="filteredItems()"
      :initial-index="lightboxIndex"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.hero-content {
  position: relative;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  padding: 0 var(--spacing-lg);
  animation: fadeInUp 1s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 300;
  opacity: 0.9;
  margin-bottom: var(--spacing-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.hero-scroll {
  position: absolute;
  bottom: var(--spacing-2xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-white);
  opacity: 0.7;
  font-size: 0.875rem;
  animation: bounce 2s infinite;
}

.hero-scroll svg {
  width: 24px;
  height: 24px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Section */
.section {
  padding: var(--spacing-3xl) 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.section-header {
  margin-bottom: var(--spacing-2xl);
}

.section-header.centered {
  text-align: center;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-gray-500);
}

/* Category Tabs */
.category-tabs {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-2xl);
  flex-wrap: wrap;
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-600);
  background: var(--color-gray-100);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
}

.tab-btn:hover {
  background: var(--color-gray-200);
  color: var(--color-gray-900);
}

.tab-btn.active {
  background: var(--color-gray-900);
  color: var(--color-white);
}

.load-more {
  text-align: center;
  margin-top: var(--spacing-2xl);
}

/* Experience Section */
.experience-section {
  background: var(--color-gray-50);
}

.experience-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.experience-tag,
.about-tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-md);
}

.experience-tag {
  color: var(--color-primary);
  background: rgba(37, 99, 235, 0.1);
}

.about-tag {
  color: var(--color-accent);
  background: rgba(245, 158, 11, 0.1);
}

.experience-text h2,
.about-content h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
}

.experience-text p,
.about-content p {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-lg);
  line-height: 1.7;
}

.experience-features {
  margin-bottom: var(--spacing-xl);
  list-style: none;
  padding: 0;
}

.experience-features li {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  color: var(--color-gray-700);
}

.experience-features svg {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.experience-demo {
  position: relative;
}

.demo-360 {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  cursor: grab;
  aspect-ratio: 4 / 3;
}

.demo-360:active {
  cursor: grabbing;
}

.demo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}

.demo-controls {
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
}

.drag-hint {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-white);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
}

.drag-hint svg {
  width: 20px;
  height: 20px;
}

/* About Section */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.about-image {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.about-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.about-stats {
  display: flex;
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-gray-200);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

/* Contact Section */
.contact-section {
  background: var(--color-gray-900);
  color: var(--color-white);
}

.contact-section .section-title {
  color: var(--color-white);
}

.contact-section .section-subtitle {
  color: var(--color-gray-400);
}

.newsletter-form {
  display: flex;
  max-width: 480px;
  margin: var(--spacing-xl) auto 0;
  gap: var(--spacing-md);
}

.newsletter-form input {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1rem;
  border: 1px solid var(--color-gray-700);
  border-radius: var(--radius-full);
  background: var(--color-gray-800);
  color: var(--color-white);
  outline: none;
  transition: border-color var(--transition-fast);
}

.newsletter-form input::placeholder {
  color: var(--color-gray-500);
}

.newsletter-form input:focus {
  border-color: var(--color-primary);
}

.newsletter-form .btn-primary {
  background: var(--color-white);
  color: var(--color-gray-900);
}

.newsletter-form .btn-primary:hover {
  background: var(--color-gray-200);
}

/* Responsive */
@media (max-width: 1024px) {
  .experience-content,
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }
  
  .experience-demo {
    order: -1;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-cta {
    flex-direction: column;
  }
  
  .hero-cta .btn {
    width: 100%;
    max-width: 280px;
  }
  
  .category-tabs {
    overflow-x: auto;
    padding-bottom: var(--spacing-sm);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  
  .category-tabs::-webkit-scrollbar {
    display: none;
  }
  
  .about-stats {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
}
</style>
