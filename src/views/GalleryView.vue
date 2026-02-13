<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getAllItems, mediaTypes } from '@/services/galleryService'
import GalleryGrid from '@/components/GalleryGrid.vue'
import LightboxModal from '@/components/LightboxModal.vue'

const route = useRoute()
const items = ref([])
const selectedFilter = ref('all')
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

onMounted(async () => {
  items.value = await getAllItems()
  
  // Check for filter in query params
  if (route.query.filter) {
    selectedFilter.value = route.query.filter
  }
})

watch(() => route.query.filter, (newFilter) => {
  if (newFilter) {
    selectedFilter.value = newFilter
  }
})

const filteredItems = computed(() => {
  if (selectedFilter.value === 'all') {
    return items.value
  }
  return items.value.filter(item => item.type === selectedFilter.value)
})

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxVisible.value = true
}

const closeLightbox = () => {
  lightboxVisible.value = false
}
</script>

<template>
  <div class="gallery-page">
    <div class="page-header">
      <div class="container">
        <h1>探索相簿</h1>
        <p>發現世界各地的精彩瞬間</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="gallery-controls">
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
          
          <div class="results-count">
            {{ filteredItems.length }} 個項目
          </div>
        </div>

        <GalleryGrid 
          :items="filteredItems" 
          @item-click="openLightbox"
        />

        <div v-if="filteredItems.length === 0" class="empty-state">
          <p>沒有找到符合條件的項目</p>
        </div>
      </div>
    </section>

    <LightboxModal 
      v-if="lightboxVisible"
      :items="filteredItems"
      :initial-index="lightboxIndex"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
.gallery-page {
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

.gallery-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.category-tabs {
  display: flex;
  gap: var(--spacing-sm);
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

.results-count {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--color-gray-500);
}

@media (max-width: 768px) {
  .gallery-controls {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .category-tabs {
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--spacing-sm);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    flex-wrap: nowrap;
  }
  
  .category-tabs::-webkit-scrollbar {
    display: none;
  }
  
  .tab-btn {
    flex-shrink: 0;
  }
}
</style>
