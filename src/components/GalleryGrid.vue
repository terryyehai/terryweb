<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['item-click'])

const getMediaIcon = (type) => {
  switch (type) {
    case 'video':
      return 'play'
    case '360-photo':
      return '360'
    case '360-video':
      return '360-video'
    default:
      return 'expand'
  }
}

const getMediaBadge = (type) => {
  switch (type) {
    case 'video':
      return 'Video'
    case '360-photo':
      return '360°'
    case '360-video':
      return '360° Video'
    default:
      return 'Photo'
  }
}
</script>

<template>
  <div class="gallery-grid">
    <div 
      v-for="(item, index) in items" 
      :key="item.id"
      class="gallery-item"
      :class="{
        'large': index === 1,
        'tall': index === 5
      }"
      @click="emit('item-click', index)"
    >
      <div class="gallery-thumb">
        <img 
          :src="item.thumbnail" 
          :alt="item.title" 
          loading="lazy"
        >
        <div class="gallery-overlay">
          <span 
            class="gallery-icon"
            :class="{
              'play-icon': item.type === 'video',
              'icon-360': item.type === '360-photo',
              'icon-360-video': item.type === '360-video'
            }"
          >
            <!-- Expand Icon -->
            <svg v-if="item.type === 'photo'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
            <!-- Play Icon -->
            <svg v-else-if="item.type === 'video'" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <!-- 360 Icon -->
            <svg v-else-if="item.type === '360-photo'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <!-- 360 Video Icon -->
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
            </svg>
          </span>
        </div>
        <span 
          class="media-badge"
          :class="{
            'photo-badge': item.type === 'photo',
            'video-badge': item.type === 'video',
            'badge-360': item.type === '360-photo',
            'badge-360-video': item.type === '360-video'
          }"
        >
          {{ getMediaBadge(item.type) }}
        </span>
      </div>
      <div class="gallery-info">
        <h3>{{ item.title }}</h3>
        <p>{{ item.location }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.gallery-item {
  position: relative;
  cursor: pointer;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-gray-100);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.gallery-item.large {
  grid-column: span 2;
}

.gallery-item.tall {
  grid-row: span 2;
}

.gallery-thumb {
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
}

.gallery-item.tall .gallery-thumb {
  padding-bottom: 160%;
}

.gallery-item.large .gallery-thumb {
  padding-bottom: 50%;
}

.gallery-thumb img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.gallery-item:hover .gallery-thumb img {
  transform: scale(1.08);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-base);
}

.gallery-item:hover .gallery-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.gallery-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border-radius: var(--radius-full);
  color: var(--color-gray-900);
  opacity: 0;
  transform: scale(0.8);
  transition: all var(--transition-base);
}

.gallery-item:hover .gallery-icon {
  opacity: 1;
  transform: scale(1);
}

.gallery-icon svg {
  width: 24px;
  height: 24px;
}

.play-icon {
  background: var(--color-primary);
  color: var(--color-white);
}

.icon-360 {
  background: var(--color-accent);
  color: var(--color-white);
}

.icon-360-video {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-white);
}

.media-badge {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm);
  z-index: 10;
}

.photo-badge {
  background: var(--color-gray-900);
  color: var(--color-white);
}

.video-badge {
  background: var(--color-primary);
  color: var(--color-white);
}

.badge-360 {
  background: var(--color-accent);
  color: var(--color-white);
}

.badge-360-video {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-white);
}

.gallery-info {
  padding: var(--spacing-md);
  background: var(--color-white);
}

.gallery-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-xs);
}

.gallery-info p {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

@media (max-width: 1024px) {
  .gallery-item.large {
    grid-column: span 1;
  }
  
  .gallery-item.tall {
    grid-row: span 1;
  }
  
  .gallery-item.tall .gallery-thumb {
    padding-bottom: 75%;
  }
  
  .gallery-item.large .gallery-thumb {
    padding-bottom: 75%;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
