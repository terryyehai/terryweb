<script setup>
const team = [
  {
    name: '陳心怡',
    role: '創辦人 / 首席攝影師',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
    description: '15 年旅遊攝影經驗，足跡遍布 60+ 國家'
  },
  {
    name: '張志偉',
    role: '360° 技術總監',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    description: 'VR/AR 技術專家，專注沉浸式體驗開發'
  },
  {
    name: '林雅琪',
    role: '影片製作人',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    description: '紀錄片導演，擅長捕捉旅途中的感動瞬間'
  }
]

const milestones = [
  { year: '2020', event: 'Wanderlens 正式成立' },
  { year: '2021', event: '推出 360° 照片功能' },
  { year: '2022', event: '達成 10 萬社群追蹤' },
  { year: '2023', event: '推出 360° 影片功能' },
  { year: '2024', event: '推出 VR 互動體驗' }
]
</script>

<template>
  <div class="about-page">
    <div class="page-header">
      <div class="container">
        <h1>關於 Wanderlens</h1>
        <p>用影像記錄世界，傳遞旅行的感動</p>
      </div>
    </div>

    <!-- Mission Section -->
    <section class="section">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-image">
            <img 
              src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80" 
              alt="旅行攝影"
              loading="lazy"
            >
          </div>
          <div class="mission-content">
            <h2>我們的使命</h2>
            <p>Wanderlens 誕生於對旅行與攝影的熱愛。我們相信，每一個角落都有值得被記錄的故事，每一張照片都能喚起探索世界的渴望。</p>
            <p>透過先進的 360° 技術，我們致力於打造沉浸式的視覺體驗，讓您即使身在家中，也能感受世界的壯麗與美好。</p>
            <div class="stats-row">
              <div class="stat">
                <span class="number">500+</span>
                <span class="label">精選作品</span>
              </div>
              <div class="stat">
                <span class="number">50+</span>
                <span class="label">國家足跡</span>
              </div>
              <div class="stat">
                <span class="number">100K+</span>
                <span class="label">社群追蹤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section team-section">
      <div class="container">
        <div class="section-header centered">
          <h2>核心團隊</h2>
          <p>由熱愛旅行的攝影師與技術專家組成</p>
        </div>
        <div class="team-grid">
          <div v-for="member in team" :key="member.name" class="team-card">
            <div class="team-image">
              <img :src="member.image" :alt="member.name" loading="lazy">
            </div>
            <div class="team-info">
              <h3>{{ member.name }}</h3>
              <span class="role">{{ member.role }}</span>
              <p>{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="section">
      <div class="container">
        <div class="section-header centered">
          <h2>發展歷程</h2>
          <p>我們的成長軌跡</p>
        </div>
        <div class="timeline">
          <div v-for="milestone in milestones" :key="milestone.year" class="timeline-item">
            <span class="year">{{ milestone.year }}</span>
            <span class="event">{{ milestone.event }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>準備好探索世界了嗎？</h2>
          <p>瀏覽我們的相簿，開啟您的視覺旅程</p>
          <RouterLink to="/gallery" class="btn btn-primary btn-large">探索相簿</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
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

.section-header {
  margin-bottom: var(--spacing-2xl);
}

.section-header.centered {
  text-align: center;
}

.section-header h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
}

.section-header p {
  font-size: 1.125rem;
  color: var(--color-gray-500);
}

/* Mission Section */
.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.mission-image {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.mission-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.mission-content h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-lg);
}

.mission-content p {
  color: var(--color-gray-600);
  line-height: 1.7;
  margin-bottom: var(--spacing-md);
}

.stats-row {
  display: flex;
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-gray-200);
}

.stat {
  text-align: center;
}

.stat .number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat .label {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

/* Team Section */
.team-section {
  background: var(--color-gray-50);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.team-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.team-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.team-info {
  padding: var(--spacing-lg);
}

.team-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-xs);
}

.team-info .role {
  display: block;
  font-size: 0.875rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.team-info p {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base);
}

.timeline-item:hover {
  transform: translateX(10px);
}

.timeline-item .year {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  min-width: 80px;
}

.timeline-item .event {
  font-size: 1rem;
  color: var(--color-gray-700);
}

/* CTA Section */
.cta-section {
  background: var(--color-gray-900);
  color: var(--color-white);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.cta-content p {
  font-size: 1.125rem;
  color: var(--color-gray-400);
  margin-bottom: var(--spacing-xl);
}

.btn-large {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .mission-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }
}

@media (max-width: 768px) {
  .stats-row {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .timeline-item {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }
  
  .timeline-item:hover {
    transform: translateX(0) scale(1.02);
  }
}
</style>
