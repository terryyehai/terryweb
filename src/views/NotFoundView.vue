<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found-page">
    <div class="container">
      <div class="content">
        <div class="illustration">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2" opacity="0.2"/>
            <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="2" opacity="0.3"/>
            <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="2" opacity="0.4"/>
            <text x="100" y="115" text-anchor="middle" font-size="48" font-weight="700" fill="currentColor">404</text>
          </svg>
        </div>
        
        <h1>頁面不存在</h1>
        <p>抱歉，您要找的頁面似乎不存在或已被移動。</p>
        
        <div class="actions">
          <RouterLink to="/" class="btn btn-primary">返回首頁</RouterLink>
          <RouterLink to="/gallery" class="btn btn-secondary">瀏覽相簿</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  padding-top: 65px;
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-50);
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.content {
  text-align: center;
}

.illustration {
  max-width: 200px;
  margin: 0 auto var(--spacing-2xl);
  color: var(--color-gray-400);
}

.illustration svg {
  width: 100%;
  height: auto;
}

h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-md);
}

p {
  font-size: 1.125rem;
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-2xl);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}
</style>
