<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getItemById } from '@/services/galleryService'

const route = useRoute()
const item = ref(null)
const loading = ref(true)
const rotationX = ref(0)
const rotationY = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)

onMounted(async () => {
  item.value = await getItemById(route.params.id)
  loading.value = false
})

const is360 = () => item.value?.type?.includes('360')

const onDragStart = (e) => {
  if (!is360()) return
  isDragging.value = true
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
  startX.value = clientX
  startY.value = clientY
  e.preventDefault()
}

const onDragMove = (e) => {
  if (!isDragging.value || !is360()) return
  
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
  
  const deltaX = clientX - startX.value
  const deltaY = clientY - startY.value
  
  rotationY.value += deltaX * 0.3
  rotationX.value = Math.max(-30, Math.min(30, rotationX.value + deltaY * 0.3))
  
  startX.value = clientX
  startY.value = clientY
}

const onDragEnd = () => {
  isDragging.value = false
}

const mediaStyle = () => {
  if (!is360()) return {}
  return {
    transform: `perspective(1000px) rotateX(${-rotationX.value}deg) rotateY(${rotationY.value}deg) scale(1.05)`
  }
}

const share = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: item.value.title,
        text: `探索 ${item.value.title} - ${item.value.location}`,
        url: window.location.href
      })
    } catch (e) {
      console.log('Share cancelled')
    }
  } else {
    await navigator.clipboard.writeText(window.location.href)
    alert('連結已複製到剪貼簿！')
  }
}
</script>

<template>
  <div class="detail-page">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="!item" class="not-found">
      <h1>找不到此項目</h1>
      <RouterLink to="/gallery" class="btn btn-primary">返回相簿</RouterLink>
    </div>
    
    <div v-else class="detail-content">
      <div 
        class="media-container"
        :class="{ 'is-360': is360() }"
        @mousedown="onDragStart"
        @mousemove="onDragMove"
        @mouseup="onDragEnd"
        @mouseleave="onDragEnd"
        @touchstart="onDragStart"
        @touchmove="onDragMove"
        @touchend="onDragEnd"
      >
        <img 
          v-if="item.type === 'photo' || item.type === '360-photo'"
          :src="item.fullsize" 
          :alt="item.title"
          :style="mediaStyle()"
          draggable="false"
        >
        <video 
          v-else
          :src="item.videoUrl"
          :poster="item.fullsize"
          controls
          :style="mediaStyle()"
        />
        
        <div v-if="is360()" class="drag-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l3 3 3-3M19 9l3 3-3 3"/>
          </svg>
          拖曳旋轉探索 360°
        </div>
      </div>
      
      <div class="info-container">
        <div class="container">
          <span class="media-badge" :class="`badge-${item.type}`">
            {{ item.type === 'photo' ? 'Photo' : item.type === 'video' ? 'Video' : item.type === '360-photo' ? '360°' : '360° Video' }}
          </span>
          <h1>{{ item.title }}</h1>
          <p class="location">{{ item.location }}</p>
          <p class="description">{{ item.description }}</p>
          
          <div class="tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          
          <div class="actions">
            <button class="btn btn-primary" @click="share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              分享
            </button>
            <RouterLink to="/gallery" class="btn btn-secondary">返回相簿</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  padding-top: 65px;
  min-height: 100vh;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-gray-200);
  border-top-color: var(--color-gray-900);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: var(--spacing-lg);
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.media-container {
  position: relative;
  background: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  overflow: hidden;
}

.media-container.is-360 {
  cursor: grab;
}

.media-container.is-360:active {
  cursor: grabbing;
}

.media-container img,
.media-container video {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  transition: transform 0.1s ease;
  user-select: none;
}

.drag-hint {
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
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

.info-container {
  padding: var(--spacing-2xl) 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.media-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
}

.badge-photo {
  background: var(--color-gray-900);
  color: var(--color-white);
}

.badge-video {
  background: var(--color-primary);
  color: var(--color-white);
}

.badge-360-photo {
  background: var(--color-accent);
  color: var(--color-white);
}

.badge-360-video {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-white);
}

h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
}

.location {
  font-size: 1.125rem;
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-lg);
}

.description {
  font-size: 1rem;
  color: var(--color-gray-700);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.tag {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-gray-600);
  background: var(--color-gray-100);
  border-radius: var(--radius-full);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.actions .btn svg {
  width: 18px;
  height: 18px;
}
</style>
