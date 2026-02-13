<template>
  <div class="admin-view">
    <div class="admin-container">
      <header class="admin-header">
        <h1>🔧 管理後台</h1>
        <p>管理您的旅遊照片和影片集</p>
      </header>

      <!-- 統計面板 -->
      <section class="stats-panel">
        <div class="stat-card">
          <span class="stat-icon">📸</span>
          <div class="stat-info">
            <span class="stat-value">{{ photoCount }}</span>
            <span class="stat-label">照片</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🎬</span>
          <div class="stat-info">
            <span class="stat-value">{{ videoCount }}</span>
            <span class="stat-label">影片</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🌐</span>
          <div class="stat-info">
            <span class="stat-value">{{ panoramaCount }}</span>
            <span class="stat-label">360° 內容</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📁</span>
          <div class="stat-info">
            <span class="stat-value">{{ totalItems }}</span>
            <span class="stat-label">總計</span>
          </div>
        </div>
      </section>

      <!-- 新增項目表單 -->
      <section class="add-item-section">
        <h2>➕ 新增媒體項目</h2>
        
        <form @submit.prevent="addItem" class="add-item-form">
          <div class="form-row">
            <div class="form-group">
              <label for="item-type">類型 *</label>
              <select id="item-type" v-model="newItem.type" required>
                <option value="photo">📸 照片</option>
                <option value="video">🎬 影片</option>
                <option value="panorama">🌐 360° 全景</option>
                <option value="360-video">🎥 360° 影片</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="item-title">標題 *</label>
              <input 
                id="item-title"
                v-model="newItem.title" 
                type="text" 
                placeholder="例：東京鐵塔夜景"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="item-location">地點</label>
              <input 
                id="item-location"
                v-model="newItem.location" 
                type="text" 
                placeholder="例：日本東京"
              />
            </div>
            
            <div class="form-group">
              <label for="item-date">日期</label>
              <input 
                id="item-date"
                v-model="newItem.date" 
                type="date"
              />
            </div>
          </div>

          <div class="form-group full-width">
            <label for="item-description">描述</label>
            <textarea 
              id="item-description"
              v-model="newItem.description" 
              placeholder="描述這張照片或影片..."
              rows="2"
            ></textarea>
          </div>

          <!-- 檔案上傳或 URL 輸入 -->
          <div class="upload-section">
            <div class="upload-tabs">
              <button 
                type="button"
                :class="['tab-btn', { active: uploadMode === 'url' }]"
                @click="uploadMode = 'url'"
              >
                🔗 使用 URL
              </button>
              <button 
                type="button"
                :class="['tab-btn', { active: uploadMode === 'file' }]"
                @click="uploadMode = 'file'"
              >
                📁 上傳檔案
              </button>
            </div>

            <div v-if="uploadMode === 'url'" class="url-input-group">
              <div class="form-group">
                <label for="item-url">媒體 URL *</label>
                <input 
                  id="item-url"
                  v-model="newItem.url" 
                  type="url" 
                  placeholder="https://... 或 Google Drive 分享連結"
                  :required="uploadMode === 'url'"
                />
                <small>支援 Google Drive、Unsplash、Mixkit 等外部連結</small>
              </div>
              
              <div class="form-group">
                <label for="item-thumbnail">縮圖 URL（選填）</label>
                <input 
                  id="item-thumbnail"
                  v-model="newItem.thumbnail" 
                  type="url" 
                  placeholder="縮圖 URL（留空則使用主圖）"
                />
              </div>
            </div>

            <div v-else class="file-upload-group">
              <div class="file-drop-zone" 
                   @drop.prevent="handleDrop" 
                   @dragover.prevent="isDragging = true"
                   @dragleave="isDragging = false"
                   :class="{ dragging: isDragging }">
                <input 
                  type="file" 
                  ref="fileInput"
                  @change="handleFileSelect"
                  accept="image/*,video/*"
                  class="file-input"
                />
                <div class="drop-content">
                  <span class="drop-icon">📤</span>
                  <p>拖曳檔案到此處或<button type="button" @click="$refs.fileInput.click()" class="browse-btn">瀏覽檔案</button></p>
                  <small>支援 JPG、PNG、GIF、MP4、WebM 格式</small>
                </div>
              </div>
              
              <div v-if="selectedFile" class="selected-file">
                <span class="file-icon">{{ isVideoFile ? '🎬' : '📸' }}</span>
                <span class="file-name">{{ selectedFile.name }}</span>
                <span class="file-size">{{ formatFileSize(selectedFile.size) }}</span>
                <button type="button" @click="clearSelectedFile" class="remove-file">✕</button>
              </div>

              <div class="upload-notice">
                <p>⚠️ <strong>注意：</strong>檔案將轉換為 Base64 格式存儲在瀏覽器中。</p>
                <p>建議：大型檔案請上傳到 Google Drive 並使用 URL 模式。</p>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="item-tags">標籤（用逗號分隔）</label>
            <input 
              id="item-tags"
              v-model="newItem.tagsInput" 
              type="text" 
              placeholder="例：夜景, 城市, 日本"
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="!canSubmit">
              ➕ 新增項目
            </button>
            <button type="button" @click="resetForm" class="btn btn-secondary">
              🔄 重置
            </button>
          </div>
        </form>
      </section>

      <!-- 現有項目列表 -->
      <section class="items-section">
        <div class="section-header">
          <h2>📋 媒體項目列表</h2>
          <div class="section-actions">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="🔍 搜尋..."
              class="search-input"
            />
            <select v-model="filterType" class="filter-select">
              <option value="all">全部類型</option>
              <option value="photo">📸 照片</option>
              <option value="video">🎬 影片</option>
              <option value="panorama">🌐 360° 全景</option>
              <option value="360-video">🎥 360° 影片</option>
            </select>
          </div>
        </div>

        <div v-if="filteredItems.length === 0" class="empty-state">
          <span class="empty-icon">📭</span>
          <p>目前沒有媒體項目</p>
          <p>使用上方表單新增您的第一個項目</p>
        </div>

        <div v-else class="items-grid">
          <div v-for="item in filteredItems" :key="item.id" class="item-card">
            <div class="item-preview">
              <img 
                :src="getItemThumbnail(item)" 
                :alt="item.title"
                @error="handleImageError"
              />
              <span class="item-type-badge">{{ getTypeBadge(item.type) }}</span>
            </div>
            <div class="item-info">
              <h3>{{ item.title }}</h3>
              <p class="item-location" v-if="item.location">📍 {{ item.location }}</p>
              <p class="item-date" v-if="item.date">📅 {{ formatDate(item.date) }}</p>
            </div>
            <div class="item-actions">
              <button @click="editItem(item)" class="btn-icon" title="編輯">✏️</button>
              <button @click="deleteItem(item.id)" class="btn-icon" title="刪除">🗑️</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 匯出/匯入 -->
      <section class="export-section">
        <h2>💾 資料匯出/匯入</h2>
        
        <div class="export-buttons">
          <button @click="exportToJson" class="btn btn-primary">
            📥 匯出 JSON
          </button>
          <button @click="exportToDrive" class="btn btn-secondary">
            ☁️ 匯出給 Google Drive
          </button>
          <label class="btn btn-secondary import-btn">
            📤 匯入 JSON
            <input type="file" accept=".json" @change="importFromJson" hidden />
          </label>
        </div>

        <div class="export-info">
          <h3>📌 使用說明</h3>
          <ol>
            <li><strong>匯出 JSON：</strong>下載目前所有項目的 JSON 檔案</li>
            <li><strong>匯出給 Google Drive：</strong>下載格式化的 JSON，可直接上傳到 Google Drive</li>
            <li><strong>匯入 JSON：</strong>從 JSON 檔案匯入項目（會與現有項目合併）</li>
          </ol>
        </div>
      </section>

      <!-- 狀態訊息 -->
      <div v-if="statusMessage" :class="['status-toast', statusType]">
        {{ statusMessage }}
      </div>
    </div>

    <!-- 編輯 Modal -->
    <div v-if="editingItem" class="modal-overlay" @click.self="cancelEdit">
      <div class="modal-content">
        <h3>✏️ 編輯項目</h3>
        <form @submit.prevent="saveEdit">
          <div class="form-group">
            <label>標題</label>
            <input v-model="editingItem.title" type="text" required />
          </div>
          <div class="form-group">
            <label>地點</label>
            <input v-model="editingItem.location" type="text" />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="editingItem.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>URL</label>
            <input v-model="editingItem.url" type="url" />
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">💾 儲存</button>
            <button type="button" @click="cancelEdit" class="btn btn-secondary">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 狀態管理
const items = ref([])
const searchQuery = ref('')
const filterType = ref('all')
const statusMessage = ref('')
const statusType = ref('success')
const uploadMode = ref('url')
const isDragging = ref(false)
const selectedFile = ref(null)
const fileInput = ref(null)
const editingItem = ref(null)

// 新項目表單
const newItem = ref({
  type: 'photo',
  title: '',
  location: '',
  date: '',
  description: '',
  url: '',
  thumbnail: '',
  tagsInput: ''
})

// 本地儲存 key
const STORAGE_KEY = 'wanderlens_admin_items'

// 統計數據
const photoCount = computed(() => items.value.filter(i => i.type === 'photo').length)
const videoCount = computed(() => items.value.filter(i => i.type === 'video').length)
const panoramaCount = computed(() => items.value.filter(i => ['panorama', '360-video'].includes(i.type)).length)
const totalItems = computed(() => items.value.length)

// 過濾後的項目
const filteredItems = computed(() => {
  let result = items.value
  
  if (filterType.value !== 'all') {
    result = result.filter(item => item.type === filterType.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.title.toLowerCase().includes(query) ||
      (item.location && item.location.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  
  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// 是否可以提交
const canSubmit = computed(() => {
  if (!newItem.value.title.trim()) return false
  if (uploadMode.value === 'url' && !newItem.value.url.trim()) return false
  if (uploadMode.value === 'file' && !selectedFile.value) return false
  return true
})

// 是否為影片檔案
const isVideoFile = computed(() => {
  if (!selectedFile.value) return false
  return selectedFile.value.type.startsWith('video/')
})

// 載入儲存的項目
onMounted(() => {
  loadItems()
})

function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      items.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load items:', e)
  }
}

function saveItems() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  } catch (e) {
    console.error('Failed to save items:', e)
    showStatus('儲存失敗：空間不足', 'error')
  }
}

function showStatus(message, type = 'success') {
  statusMessage.value = message
  statusType.value = type
  setTimeout(() => {
    statusMessage.value = ''
  }, 3000)
}

// 新增項目
async function addItem() {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  
  let url = newItem.value.url
  let thumbnail = newItem.value.thumbnail
  
  // 如果是檔案上傳模式
  if (uploadMode.value === 'file' && selectedFile.value) {
    try {
      url = await fileToBase64(selectedFile.value)
      thumbnail = url // 使用相同的 Base64 作為縮圖
    } catch (e) {
      showStatus('檔案轉換失敗', 'error')
      return
    }
  }
  
  const item = {
    id,
    type: newItem.value.type,
    title: newItem.value.title.trim(),
    location: newItem.value.location.trim() || null,
    date: newItem.value.date || null,
    description: newItem.value.description.trim() || null,
    url,
    thumbnail: thumbnail || url,
    tags: newItem.value.tagsInput 
      ? newItem.value.tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : [],
    createdAt: new Date().toISOString()
  }
  
  items.value.push(item)
  saveItems()
  showStatus('項目已新增！')
  resetForm()
}

function resetForm() {
  newItem.value = {
    type: 'photo',
    title: '',
    location: '',
    date: '',
    description: '',
    url: '',
    thumbnail: '',
    tagsInput: ''
  }
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 檔案處理
function handleDrop(e) {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

function handleFileSelect(e) {
  const files = e.target.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

function handleFile(file) {
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
    showStatus('請選擇圖片或影片檔案', 'error')
    return
  }
  
  if (file.size > 10 * 1024 * 1024) {
    showStatus('檔案大小超過 10MB，建議使用 URL 模式', 'warning')
  }
  
  selectedFile.value = file
  
  // 自動設定類型
  if (file.type.startsWith('video/')) {
    newItem.value.type = 'video'
  } else {
    newItem.value.type = 'photo'
  }
}

function clearSelectedFile() {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// 編輯項目
function editItem(item) {
  editingItem.value = { ...item }
}

function saveEdit() {
  const index = items.value.findIndex(i => i.id === editingItem.value.id)
  if (index !== -1) {
    items.value[index] = { ...editingItem.value }
    saveItems()
    showStatus('項目已更新！')
  }
  editingItem.value = null
}

function cancelEdit() {
  editingItem.value = null
}

// 刪除項目
function deleteItem(id) {
  if (confirm('確定要刪除此項目嗎？')) {
    items.value = items.value.filter(i => i.id !== id)
    saveItems()
    showStatus('項目已刪除')
  }
}

// 匯出功能
function exportToJson() {
  const data = JSON.stringify(items.value, null, 2)
  downloadFile(data, 'wanderlens-data.json', 'application/json')
  showStatus('JSON 已下載！')
}

function exportToDrive() {
  // 轉換為 Google Drive 格式
  const driveData = {
    items: items.value.map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description || '',
      location: item.location || '',
      date: item.date || '',
      url: item.url,
      thumbnail: item.thumbnail || item.url,
      tags: item.tags || []
    }))
  }
  
  const data = JSON.stringify(driveData, null, 2)
  downloadFile(data, 'gallery-data.json', 'application/json')
  showStatus('Google Drive 格式 JSON 已下載！')
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 匯入功能
async function importFromJson(e) {
  const file = e.target.files[0]
  if (!file) return
  
  try {
    const text = await file.text()
    const data = JSON.parse(text)
    
    // 支援兩種格式
    let importedItems = Array.isArray(data) ? data : (data.items || [])
    
    // 驗證並合併
    let count = 0
    for (const item of importedItems) {
      if (item.title && item.url) {
        // 檢查是否已存在
        if (!items.value.find(i => i.id === item.id)) {
          items.value.push({
            id: item.id || Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            type: item.type || 'photo',
            title: item.title,
            description: item.description || null,
            location: item.location || null,
            date: item.date || null,
            url: item.url,
            thumbnail: item.thumbnail || item.url,
            tags: item.tags || [],
            createdAt: item.createdAt || new Date().toISOString()
          })
          count++
        }
      }
    }
    
    saveItems()
    showStatus(`已匯入 ${count} 個項目！`)
    
  } catch (err) {
    showStatus('匯入失敗：無效的 JSON 格式', 'error')
    console.error('Import error:', err)
  }
  
  e.target.value = ''
}

// 工具函數
function getItemThumbnail(item) {
  return item.thumbnail || item.url || '/placeholder.jpg'
}

function getTypeBadge(type) {
  const badges = {
    'photo': '📸',
    'video': '🎬',
    'panorama': '🌐',
    '360-video': '🎥'
  }
  return badges[type] || '📷'
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-TW')
}

function handleImageError(e) {
  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect fill="%23333" width="200" height="150"/><text fill="%23666" x="100" y="75" text-anchor="middle" dy=".3em">No Image</text></svg>'
}
</script>

<style scoped>
.admin-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 2rem;
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-header h1 {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.admin-header p {
  color: rgba(255, 255, 255, 0.7);
}

/* 統計面板 */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, background 0.3s;
}

.stat-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.12);
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4ecdc4;
}

.stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Section 樣式 */
section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

section h2 {
  color: #fff;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 表單樣式 */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s, background 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4ecdc4;
  background: rgba(0, 0, 0, 0.5);
}

.form-group small {
  display: block;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

/* 上傳區域 */
.upload-section {
  margin-bottom: 1rem;
}

.upload-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background: #4ecdc4;
  border-color: #4ecdc4;
  color: #1a1a2e;
}

.url-input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.file-drop-zone {
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
}

.file-drop-zone.dragging,
.file-drop-zone:hover {
  border-color: #4ecdc4;
  background: rgba(78, 205, 196, 0.1);
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.drop-content {
  pointer-events: none;
}

.drop-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.drop-content p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.drop-content small {
  color: rgba(255, 255, 255, 0.5);
}

.browse-btn {
  background: none;
  border: none;
  color: #4ecdc4;
  text-decoration: underline;
  cursor: pointer;
  pointer-events: auto;
}

.selected-file {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(78, 205, 196, 0.1);
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.file-icon {
  font-size: 1.5rem;
}

.file-name {
  color: #fff;
  flex: 1;
}

.file-size {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.remove-file {
  background: rgba(255, 100, 100, 0.2);
  border: none;
  color: #ff6464;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}

.upload-notice {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 200, 50, 0.1);
  border-radius: 0.5rem;
  border-left: 3px solid #ffc832;
}

.upload-notice p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

/* 表單按鈕 */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 項目列表 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header h2 {
  margin: 0;
  border: none;
  padding: 0;
}

.section-actions {
  display: flex;
  gap: 1rem;
}

.search-input,
.filter-select {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #fff;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.item-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.item-preview {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.item-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-type-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 1.2rem;
}

.item-info {
  padding: 1rem;
}

.item-info h3 {
  color: #fff;
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.item-location,
.item-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.item-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0 1rem 1rem;
}

.btn-icon {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 空狀態 */
.empty-state {
  text-align: center;
  padding: 3rem;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0.5rem 0;
}

/* 匯出區域 */
.export-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.import-btn {
  cursor: pointer;
}

.export-info {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}

.export-info h3 {
  color: #fff;
  margin: 0 0 1rem;
  font-size: 1rem;
}

.export-info ol {
  margin: 0;
  padding-left: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.export-info li {
  margin-bottom: 0.5rem;
}

/* 狀態 Toast */
.status-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: #fff;
  font-weight: 500;
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

.status-toast.success {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.status-toast.error {
  background: linear-gradient(135deg, #ff6464, #c94c4c);
}

.status-toast.warning {
  background: linear-gradient(135deg, #ffc832, #e6a700);
  color: #1a1a2e;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #1a1a2e;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-content h3 {
  color: #fff;
  margin: 0 0 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

/* RWD */
@media (max-width: 768px) {
  .admin-view {
    padding: 1rem;
  }
  
  .admin-header h1 {
    font-size: 1.8rem;
  }
  
  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
  }
  
  section {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .url-input-group {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .section-actions {
    width: 100%;
  }
  
  .search-input {
    flex: 1;
  }
  
  .export-buttons {
    flex-direction: column;
  }
  
  .export-buttons .btn {
    width: 100%;
  }
}
</style>
