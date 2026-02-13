import { createRouter, createWebHashHistory } from 'vue-router'

// 使用 Hash Mode 確保在 GitHub Pages 和 Cloudflare Pages 都能正常運作
// Hash mode 不需要 server-side 配置，完美支援靜態部署
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: () => import('@/views/GalleryView.vue')
    },
    {
      path: '/gallery/:id',
      name: 'GalleryDetail',
      component: () => import('@/views/GalleryDetailView.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/SettingsView.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/AdminView.vue')
    },
    {
      // 404 頁面
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
