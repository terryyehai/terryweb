# Wanderlens - 旅遊照片展示網站

一個支援 360° 照片與影片的現代化旅遊攝影展示平台。

## 專案特色

- 🖼️ 高品質旅遊照片與影片展示
- 🌐 360° 照片與影片互動播放
- 📱 完整 RWD 響應式設計
- ⚡ Vite + Vue 3 高效能架構
- 🚀 支援雙平台部署（GitHub Pages + Cloudflare Pages）
- ☁️ **Google Drive 整合** - 直接從 Google Drive 載入圖片和影片

## 🗂️ Google Drive 整合

Wanderlens 支援從 Google Drive 載入圖庫資料，讓您可以：

- ✅ 直接在 Google Drive 管理照片和影片
- ✅ 更新內容無需重新部署網站
- ✅ 使用 Google Drive 的免費儲存空間
- ✅ 透過 JSON 檔案控制圖庫結構

### 快速開始

1. **前往設定頁面**：點擊導航列的「設定」
2. **建立資料檔**：在 Google Drive 建立 `gallery-data.json`  
   → [下載範例檔案](public/gallery-data-example.json)
3. **上傳媒體檔案**：將照片和影片上傳到 Google Drive
4. **設為公開分享**：將所有檔案設定為「知道連結的任何人都可以檢視」
5. **貼上連結**：在設定頁面貼上 JSON 檔案的分享連結

📖 **詳細教學**：[Google Drive 整合教學](docs/GOOGLE_DRIVE_SETUP.md)

## 專案結構

```
wanderlens-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自動部署
├── docs/
│   └── GOOGLE_DRIVE_SETUP.md  # Google Drive 整合教學
├── public/
│   ├── 404.html               # SPA fallback (GitHub Pages)
│   ├── _redirects             # Cloudflare Pages 重定向規則
│   └── gallery-data-example.json  # JSON 資料範例檔
├── src/
│   ├── components/            # Vue 組件
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── GalleryGrid.vue
│   │   └── LightboxModal.vue
│   ├── views/                 # 頁面視圖
│   │   ├── HomeView.vue
│   │   ├── GalleryView.vue
│   │   ├── GalleryDetailView.vue
│   │   ├── AboutView.vue
│   │   ├── ContactView.vue
│   │   ├── SettingsView.vue   # 設定頁面（新）
│   │   └── NotFoundView.vue
│   ├── services/              # 資料服務
│   │   └── galleryService.js  # 支援 Google Drive 載入
│   ├── router/                # Vue Router 設定
│   │   └── index.js
│   ├── styles/                # 全域樣式
│   │   └── main.css
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 技術架構

| 技術 | 用途 |
|------|------|
| Vue 3 | 前端框架 |
| Vue Router | 路由管理 (Hash Mode) |
| Vite 5 | 建構工具 |
| CSS Variables | 主題系統 |
| Google Drive | 圖片/影片儲存與資料來源 |
| Unsplash API | 外部圖片服務（備用） |
| Mixkit | 外部影片服務（備用） |

## 雙平台相容性設計

### 1. 純靜態架構
- 不使用 Node.js server
- 不依賴 Server-Side Rendering
- 所有資料使用外部服務 API

### 2. 路由設計
- 使用 **Hash Mode** (`createWebHashHistory`)
- URL 格式: `https://domain.com/#/gallery`
- 無需 server 配置即可支援 SPA 路由

### 3. 相對路徑
- Vite 設定 `base: './'`
- 所有資源使用相對路徑
- 可部署在任意子目錄

### 4. 404 Fallback
- GitHub Pages: `public/404.html` 自動重定向
- Cloudflare Pages: `public/_redirects` 規則

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽建構結果
npm run preview
```

## 部署指南

### GitHub Pages 部署

#### 方式一：GitHub Actions 自動部署 (推薦)

1. **建立 GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **啟用 GitHub Pages**
   - 前往 Repository → Settings → Pages
   - Source 選擇 **GitHub Actions**
   - 等待 Action 完成部署

3. **訪問網站**
   - URL 格式: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

#### 方式二：手動部署

```bash
# 建構專案
npm run build

# 複製 404.html
cp dist/index.html dist/404.html

# 部署到 gh-pages 分支
npx gh-pages -d dist
```

### Cloudflare Pages 部署

#### 方式一：連接 GitHub Repository (推薦)

1. **登入 Cloudflare Dashboard**
   - 前往 Workers & Pages → Create Application → Pages

2. **連接 Git**
   - 選擇 GitHub
   - 授權並選擇 Repository

3. **設定建構**
   | 設定項目 | 值 |
   |---------|-----|
   | Framework preset | Vue |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` (或 `wanderlens-app` 如果是子目錄) |

4. **部署**
   - 點擊 Save and Deploy
   - 等待建構完成

#### 方式二：Direct Upload

```bash
# 建構專案
npm run build

# 使用 Wrangler CLI 上傳
npx wrangler pages deploy dist --project-name=wanderlens
```

## 環境設定比較

| 設定項目 | GitHub Pages | Cloudflare Pages |
|---------|--------------|------------------|
| Build Command | `npm run build` | `npm run build` |
| Output Directory | `dist` | `dist` |
| Node Version | 20 | 20 (Environment Variables) |
| 404 Fallback | `404.html` 自動生效 | `_redirects` 規則 |
| Custom Domain | Settings → Pages | Custom Domains |
| HTTPS | 自動 | 自動 |

## 注意事項

### 為什麼使用 Hash Mode？

Hash Mode (`/#/path`) 的優點：
- ✅ 不需要 server 配置
- ✅ 支援任意靜態託管平台
- ✅ 子目錄部署完全相容
- ✅ 無 404 問題

如果需要使用 History Mode (`/path`)：
1. 需要確保 404.html fallback 正確配置
2. Cloudflare Pages 需要 `_redirects` 規則
3. 可能需要根據部署平台調整 base URL

### 外部服務說明

本專案使用以下外部服務：
- **Unsplash**: 高品質圖片 (無需 API Key 的直接連結)
- **Mixkit**: 免費影片素材

這些服務提供免費的公開資源，無需後端 API。

### 自訂網域

**GitHub Pages:**
1. Repository Settings → Pages → Custom domain
2. 新增 DNS CNAME 記錄指向 `username.github.io`

**Cloudflare Pages:**
1. Project Settings → Custom domains
2. 新增網域並設定 DNS

## 授權

MIT License

## 貢獻

歡迎提交 Issue 或 Pull Request！
