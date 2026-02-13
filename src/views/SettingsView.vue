<template>
  <div class="settings-view">
    <div class="settings-container">
      <h1>⚙️ 設定</h1>
      
      <!-- Google Drive 資料來源設定 -->
      <section class="settings-section">
        <h2>📁 Google Drive 資料來源</h2>
        <p class="section-description">
          設定 Google Drive 的 JSON 檔案連結，網站將自動載入該檔案內的圖片和影片資訊。
        </p>
        
        <div class="input-group">
          <label for="data-source-url">Google Drive JSON 檔案連結：</label>
          <input 
            id="data-source-url"
            v-model="dataSourceUrl" 
            type="url" 
            placeholder="https://drive.google.com/file/d/FILE_ID/view"
            class="text-input"
          />
          <small class="hint">
            請貼上 Google Drive 中 JSON 檔案的分享連結
          </small>
        </div>
        
        <div class="button-group">
          <button @click="saveDataSource" class="btn btn-primary">
            💾 儲存設定
          </button>
          <button @click="testDataSource" class="btn btn-secondary">
            🔍 測試連線
          </button>
          <button v-if="currentDataSource" @click="clearDataSource" class="btn btn-danger">
            🗑️ 清除設定
          </button>
        </div>
        
        <div v-if="statusMessage" :class="['status-message', statusType]">
          {{ statusMessage }}
        </div>
        
        <div v-if="currentDataSource" class="current-source">
          <strong>目前資料來源：</strong>
          <code>{{ currentDataSource }}</code>
        </div>
      </section>
      
      <!-- 快取管理 -->
      <section class="settings-section">
        <h2>🔄 快取管理</h2>
        <p class="section-description">
          為了提升載入速度，系統會快取 Google Drive 的資料 5 分鐘。如果您更新了 Drive 中的檔案，可以手動清除快取。
        </p>
        
        <button @click="clearCacheHandler" class="btn btn-secondary">
          🗑️ 清除快取
        </button>
      </section>
      
      <!-- 使用說明 -->
      <section class="settings-section">
        <h2>📖 如何設定 Google Drive</h2>
        <ol class="instructions">
          <li>
            <strong>建立 JSON 資料檔：</strong>
            在 Google Drive 建立一個 <code>gallery-data.json</code> 檔案，內容格式請參考下方範例
          </li>
          <li>
            <strong>上傳圖片和影片：</strong>
            將所有圖片和影片上傳到 Google Drive 同一個資料夾
          </li>
          <li>
            <strong>設定為公開分享：</strong>
            將 JSON 檔案和所有媒體檔案都設定為「知道連結的任何人都可以檢視」
          </li>
          <li>
            <strong>複製分享連結：</strong>
            在 JSON 檔案上右鍵 → 取得連結 → 複製連結
          </li>
          <li>
            <strong>貼上設定：</strong>
            將複製的連結貼到上方輸入框，點擊「儲存設定」
          </li>
        </ol>
        
        <details class="json-example">
          <summary>📝 點擊查看 JSON 資料格式範例</summary>
          <pre><code>{{ jsonExample }}</code></pre>
        </details>
        
        <div class="download-example">
          <button @click="downloadExample" class="btn btn-secondary">
            📥 下載範例 JSON 檔案
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { setDataSource, getDataSource, clearCache } from '@/services/galleryService'

const dataSourceUrl = ref('')
const currentDataSource = ref(null)
const statusMessage = ref('')
const statusType = ref('') // 'success', 'error', 'info'

const jsonExample = `[
  {
    "id": 1,
    "type": "photo",
    "title": "阿爾卑斯山脈",
    "location": "瑞士, 歐洲",
    "description": "壯麗的阿爾卑斯山脈，白雪覆蓋的山峰在陽光下閃耀。",
    "thumbnail": "https://drive.google.com/file/d/YOUR_THUMBNAIL_FILE_ID/view",
    "fullsize": "https://drive.google.com/file/d/YOUR_FULLSIZE_FILE_ID/view",
    "tags": ["山脈", "瑞士", "自然"]
  },
  {
    "id": 2,
    "type": "video",
    "title": "馬爾地夫海灘",
    "location": "馬爾地夫, 印度洋",
    "description": "清澈見底的海水，純白的沙灘。",
    "thumbnail": "https://drive.google.com/file/d/YOUR_THUMBNAIL_FILE_ID/view",
    "fullsize": "https://drive.google.com/file/d/YOUR_FULLSIZE_FILE_ID/view",
    "videoUrl": "https://drive.google.com/file/d/YOUR_VIDEO_FILE_ID/view",
    "tags": ["海灘", "馬爾地夫", "度假"]
  }
]`

onMounted(() => {
  currentDataSource.value = getDataSource()
  if (currentDataSource.value) {
    dataSourceUrl.value = currentDataSource.value
  }
})

function showStatus(message, type) {
  statusMessage.value = message
  statusType.value = type
  setTimeout(() => {
    statusMessage.value = ''
  }, 5000)
}

function saveDataSource() {
  if (!dataSourceUrl.value.trim()) {
    showStatus('❌ 請輸入 Google Drive 連結', 'error')
    return
  }
  
  try {
    setDataSource(dataSourceUrl.value.trim())
    currentDataSource.value = getDataSource()
    showStatus('✅ 設定已儲存！重新整理頁面後將載入新資料。', 'success')
  } catch (error) {
    showStatus('❌ 儲存失敗：' + error.message, 'error')
  }
}

async function testDataSource() {
  if (!dataSourceUrl.value.trim()) {
    showStatus('❌ 請先輸入連結', 'error')
    return
  }
  
  showStatus('🔍 測試連線中...', 'info')
  
  try {
    // 轉換連結格式
    let testUrl = dataSourceUrl.value.trim()
    const match = testUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match && match[1]) {
      testUrl = `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
    
    const response = await fetch(testUrl)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    if (!Array.isArray(data)) {
      throw new Error('資料格式錯誤：必須是陣列')
    }
    
    showStatus(`✅ 連線成功！找到 ${data.length} 個項目。`, 'success')
    
  } catch (error) {
    showStatus(`❌ 連線失敗：${error.message}。請確認連結正確且檔案已設為公開分享。`, 'error')
  }
}

function clearDataSource() {
  if (confirm('確定要清除 Google Drive 設定嗎？將改用本地範例資料。')) {
    setDataSource(null)
    dataSourceUrl.value = ''
    currentDataSource.value = null
    showStatus('✅ 已清除設定，將使用本地範例資料', 'success')
  }
}

function clearCacheHandler() {
  clearCache()
  showStatus('✅ 快取已清除！重新整理頁面將載入最新資料。', 'success')
}

function downloadExample() {
  const blob = new Blob([jsonExample], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'gallery-data-example.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  showStatus('✅ 範例檔案已下載', 'success')
}
</script>

<style scoped>
.settings-view {
  min-height: calc(100vh - 200px);
  padding: 3rem 1.5rem;
  background: var(--color-gray-50);
}

.settings-container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-gray-900);
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.settings-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-gray-900);
}

.section-description {
  color: var(--color-gray-600);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-gray-700);
}

.text-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.hint {
  display: block;
  margin-top: 0.5rem;
  color: var(--color-gray-500);
  font-size: 0.875rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-gray-200);
  color: var(--color-gray-700);
}

.btn-secondary:hover {
  background: var(--color-gray-300);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.status-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
}

.status-message.success {
  background: #d1fae5;
  color: #065f46;
}

.status-message.error {
  background: #fee2e2;
  color: #991b1b;
}

.status-message.info {
  background: #dbeafe;
  color: #1e40af;
}

.current-source {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-gray-100);
  border-radius: 8px;
  word-break: break-all;
}

.current-source code {
  color: var(--color-primary);
}

.instructions {
  padding-left: 1.5rem;
  line-height: 1.8;
  color: var(--color-gray-700);
}

.instructions li {
  margin-bottom: 1rem;
}

.instructions code {
  background: var(--color-gray-100);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--color-primary);
}

.json-example {
  margin-top: 1.5rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
}

.json-example summary {
  padding: 1rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-gray-700);
  user-select: none;
}

.json-example summary:hover {
  background: var(--color-gray-50);
}

.json-example pre {
  padding: 1rem;
  background: var(--color-gray-900);
  color: #a5d6a7;
  border-radius: 0 0 8px 8px;
  overflow-x: auto;
  margin: 0;
}

.json-example code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.download-example {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .settings-view {
    padding: 2rem 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .settings-section {
    padding: 1.5rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
