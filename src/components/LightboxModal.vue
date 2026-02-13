<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

const currentIndex = ref(props.initialIndex)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const rotationX = ref(0)
const rotationY = ref(0)
const mediaRef = ref(null)

const currentItem = computed(() => props.items[currentIndex.value] || null)
const is360 = computed(() => currentItem.value?.type?.includes('360'))

const prev = () => {
  currentIndex.value = currentIndex.value > 0 
    ? currentIndex.value - 1 
    : props.items.length - 1
  resetRotation()
}

const next = () => {
  currentIndex.value = currentIndex.value < props.items.length - 1 
    ? currentIndex.value + 1 
    : 0
  resetRotation()
}

const resetRotation = () => {
  rotationX.value = 0
  rotationY.value = 0
}

const handleKeydown = (e) => {
  switch(e.key) {
    case 'Escape':
      emit('close')
      break
    case 'ArrowLeft':
      prev()
      break
    case 'ArrowRight':
      next()
      break
  }
}

const handleBackdropClick = (e) => {
  if (e.target.classList.contains('lightbox')) {
    emit('close')
  }
}

// 360 Interaction
const onDragStart = (e) => {
  if (!is360.value) return
  isDragging.value = true
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
  startX.value = clientX
  startY.value = clientY
  e.preventDefault()
}

const onDragMove = (e) => {
  if (!isDragging.value || !is360.value) return
  
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

const mediaStyle = computed(() => {
  if (!is360.value) return {}
  return {
    transform: `perspective(1000px) rotateX(${-rotationX.value}deg) rotateY(${rotationY.value}deg) scale(1.1)`
  }
})

const share = async () => {
  const item = currentItem.value
  if (navigator.share) {
    try {
      await navigator.share({
        title: item.title,
        text: `探索 ${item.title} - ${item.location}`,
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

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
  document.addEventListener('touchmove', onDragMove, { passive: false })
  document.addEventListener('touchend', onDragEnd)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
  document.removeEventListener('touchmove', onDragMove)
  document.removeEventListener('touchend', onDragEnd)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div class="lightbox active" @click="handleBackdropClick">
      <button class="lightbox-close" aria-label="關閉" @click="emit('close')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      
      <button class="lightbox-nav lightbox-prev" aria-label="上一張" @click="prev">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      
      <button class="lightbox-nav lightbox-next" aria-label="下一張" @click="next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      
      <div class="lightbox-content">
        <div 
          ref="mediaRef"
          class="lightbox-media"
          :class="{ 'is-360': is360 }"
          @mousedown="onDragStart"
          @touchstart="onDragStart"
        >
          <template v-if="currentItem">
            <!-- Photo -->
            <img 
              v-if="currentItem.type === 'photo' || currentItem.type === '360-photo'"
              :src="currentItem.fullsize" 
              :alt="currentItem.title"
              :style="is360 ? mediaStyle : {}"
              draggable="false"
            >
            
            <!-- Video -->
            <video 
              v-else
              :src="currentItem.videoUrl"
              :poster="currentItem.fullsize"
              controls
              autoplay
              :style="is360 ? mediaStyle : {}"
            />
          </template>
        </div>
        
        <div class="lightbox-info" v-if="currentItem">
          <h3>{{ currentItem.title }}</h3>
          <p>{{ currentItem.location }}</p>
          <p class="description">{{ currentItem.description }}</p>
          <div class="lightbox-actions">
            <button class="btn-share" @click="share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              分享
            </button>
          </div>
        </div>
      </div>
      
      <div class="lightbox-360-controls" :class="{ visible: is360 }">
        <span class="hint-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l3 3 3-3M19 9l3 3-3 3"/>
          </svg>
          拖曳或使用方向鍵旋轉探索
        </span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-base);
}

.lightbox.active {
  opacity: 1;
  visibility: visible;
}

.lightbox-close {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  color: var(--color-white);
  transition: all var(--transition-fast);
  z-index: 10;
  border: none;
  cursor: pointer;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.lightbox-close svg {
  width: 24px;
  height: 24px;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  color: var(--color-white);
  transition: all var(--transition-fast);
  z-index: 10;
  border: none;
  cursor: pointer;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-prev {
  left: var(--spacing-lg);
}

.lightbox-next {
  right: var(--spacing-lg);
}

.lightbox-nav svg {
  width: 24px;
  height: 24px;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(0.9);
  opacity: 0;
  transition: all var(--transition-base);
}

.lightbox.active .lightbox-content {
  transform: scale(1);
  opacity: 1;
}

.lightbox-media {
  position: relative;
  max-width: 100%;
  max-height: 70vh;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.lightbox-media img,
.lightbox-media video {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  transition: transform 0.1s ease;
}

.lightbox-media.is-360 {
  cursor: grab;
}

.lightbox-media.is-360:active {
  cursor: grabbing;
}

.lightbox-info {
  text-align: center;
  padding: var(--spacing-lg) 0;
  color: var(--color-white);
}

.lightbox-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.lightbox-info p {
  color: var(--color-gray-400);
  margin-bottom: var(--spacing-sm);
}

.lightbox-info .description {
  font-size: 0.9375rem;
  max-width: 600px;
  margin: 0 auto var(--spacing-md);
}

.lightbox-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.btn-share {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-white);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  border: none;
  cursor: pointer;
}

.btn-share:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-share svg {
  width: 16px;
  height: 16px;
}

.lightbox-360-controls {
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  display: none;
}

.lightbox-360-controls.visible {
  display: block;
}

.hint-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 0.875rem;
  color: var(--color-white);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
}

.hint-text svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .lightbox-nav {
    width: 40px;
    height: 40px;
  }
  
  .lightbox-prev {
    left: var(--spacing-sm);
  }
  
  .lightbox-next {
    right: var(--spacing-sm);
  }
}
</style>
