/**
 * Gallery Data Service
 * 支援從 Google Drive 載入圖片和影片
 * 也支援本地靜態資料作為備用
 */

// Google Drive 公開資料 JSON 檔案連結
// 格式: https://drive.google.com/uc?export=download&id=FILE_ID
const GOOGLE_DRIVE_DATA_URL = localStorage.getItem('gallery_data_url') || null

// 使用 Unsplash 作為圖片來源（外部服務 - 備用）
const UNSPLASH_BASE = 'https://images.unsplash.com'

// Mixkit 作為影片來源（外部服務 - 備用）
const MIXKIT_BASE = 'https://assets.mixkit.co/videos/preview'

/**
 * 將 Google Drive 分享連結轉換為直接存取連結
 * @param {string} shareUrl - Google Drive 分享連結
 * @returns {string} 直接存取連結
 */
function convertGoogleDriveUrl(shareUrl) {
  if (!shareUrl) return shareUrl
  
  // 如果已經是直接連結，直接返回
  if (shareUrl.includes('drive.google.com/uc?')) {
    return shareUrl
  }
  
  // 從分享連結提取 FILE_ID
  // 格式: https://drive.google.com/file/d/FILE_ID/view
  const match = shareUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`
  }
  
  // 如果是其他格式，直接返回原連結
  return shareUrl
}

// 本地靜態資料（備用）
const LOCAL_GALLERY_ITEMS = [
  {
    id: 1,
    type: 'photo',
    title: '阿爾卑斯山脈',
    location: '瑞士, 歐洲',
    description: '壯麗的阿爾卑斯山脈，白雪覆蓋的山峰在陽光下閃耀著金色光芒。',
    thumbnail: `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=1600&q=90`,
    tags: ['山脈', '瑞士', '自然']
  },
  {
    id: 2,
    type: 'video',
    title: '馬爾地夫海灘',
    location: '馬爾地夫, 印度洋',
    description: '清澈見底的海水，純白的沙灘，這是人間天堂的模樣。',
    thumbnail: `${UNSPLASH_BASE}/photo-1507525428034-b723cf961d3e?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1507525428034-b723cf961d3e?w=1600&q=90`,
    videoUrl: `${MIXKIT_BASE}/mixkit-waves-in-the-water-1164-large.mp4`,
    tags: ['海灘', '馬爾地夫', '度假']
  },
  {
    id: 3,
    type: '360-photo',
    title: '京都竹林',
    location: '京都, 日本',
    description: '嵐山竹林步道，陽光穿透竹葉灑落，如夢似幻的日式庭園。',
    thumbnail: `${UNSPLASH_BASE}/photo-1493976040374-85c8e12f0c0e?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1493976040374-85c8e12f0c0e?w=1600&q=90`,
    tags: ['日本', '竹林', '自然']
  },
  {
    id: 4,
    type: 'photo',
    title: '聖托里尼日落',
    location: '希臘, 歐洲',
    description: '愛琴海上最美的日落，藍白相間的建築在夕陽下格外迷人。',
    thumbnail: `${UNSPLASH_BASE}/photo-1518548419970-58e3b4079ab2?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1518548419970-58e3b4079ab2?w=1600&q=90`,
    tags: ['希臘', '日落', '建築']
  },
  {
    id: 5,
    type: '360-video',
    title: '大堡礁探索',
    location: '澳洲, 大洋洲',
    description: '潛入世界最大的珊瑚礁系統，與海洋生物近距離接觸。',
    thumbnail: `${UNSPLASH_BASE}/photo-1516815231560-8f41ec531527?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1516815231560-8f41ec531527?w=1600&q=90`,
    videoUrl: `${MIXKIT_BASE}/mixkit-coral-reef-with-fish-and-corals-4104-large.mp4`,
    tags: ['澳洲', '海洋', '潛水']
  },
  {
    id: 6,
    type: 'photo',
    title: '冰島極光',
    location: '冰島, 北歐',
    description: '北極圈內的夢幻極光，綠色光帶在夜空中舞動。',
    thumbnail: `${UNSPLASH_BASE}/photo-1464822759023-fed622ff2c3b?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1464822759023-fed622ff2c3b?w=1600&q=90`,
    tags: ['冰島', '極光', '自然']
  },
  {
    id: 7,
    type: 'video',
    title: '挪威峽灣',
    location: '挪威, 北歐',
    description: '壯觀的峽灣地貌，碧綠色的海水映照著雪山倒影。',
    thumbnail: `${UNSPLASH_BASE}/photo-1476514525535-07fb3b4ae5f1?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1476514525535-07fb3b4ae5f1?w=1600&q=90`,
    videoUrl: `${MIXKIT_BASE}/mixkit-flying-over-a-green-valley-1222-large.mp4`,
    tags: ['挪威', '峽灣', '自然']
  },
  {
    id: 8,
    type: '360-photo',
    title: '泰姬瑪哈陵',
    location: '印度, 亞洲',
    description: '世界七大奇蹟之一，愛情的永恆象徵，白色大理石建築的極致。',
    thumbnail: `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1600&q=90`,
    tags: ['印度', '建築', '世界遺產']
  },
  {
    id: 9,
    type: 'photo',
    title: '威尼斯運河',
    location: '義大利, 歐洲',
    description: '水上之城的浪漫風情，貢多拉穿梭於古老的建築之間。',
    thumbnail: `${UNSPLASH_BASE}/photo-1523906834658-6e24ef2386f9?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1523906834658-6e24ef2386f9?w=1600&q=90`,
    tags: ['義大利', '威尼斯', '運河']
  },
  {
    id: 10,
    type: 'photo',
    title: '富士山',
    location: '東京, 日本',
    description: '日本最高峰，神聖的富士山在晨曦中展現完美的錐形輪廓。',
    thumbnail: `${UNSPLASH_BASE}/photo-1490806843957-31f4c9a91c65?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1490806843957-31f4c9a91c65?w=1600&q=90`,
    tags: ['日本', '富士山', '自然']
  },
  {
    id: 11,
    type: '360-photo',
    title: '巴黎鐵塔',
    location: '巴黎, 法國',
    description: '浪漫之都的標誌性建築，夜晚的燈光秀令人陶醉。',
    thumbnail: `${UNSPLASH_BASE}/photo-1511739001486-6bfe10ce785f?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1511739001486-6bfe10ce785f?w=1600&q=90`,
    tags: ['法國', '巴黎', '地標']
  },
  {
    id: 12,
    type: 'video',
    title: '北海道花田',
    location: '北海道, 日本',
    description: '夏季的薰衣草花田，紫色花海與藍天形成絕美畫面。',
    thumbnail: `${UNSPLASH_BASE}/photo-1499002238440-d264f532dd44?w=600&q=80`,
    fullsize: `${UNSPLASH_BASE}/photo-1499002238440-d264f532dd44?w=1600&q=90`,
    videoUrl: `${MIXKIT_BASE}/mixkit-field-of-flowers-waving-in-the-wind-1138-large.mp4`,
    tags: ['日本', '花田', '自然']
  }
]

// 快取已載入的 Google Drive 資料
let cachedGalleryData = null
let lastFetchTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 分鐘快取

/**
 * 從 Google Drive 載入圖庫資料
 * @returns {Promise<Array>} 圖庫項目陣列
 */
async function fetchGoogleDriveData() {
  const dataUrl = localStorage.getItem('gallery_data_url')
  
  if (!dataUrl) {
    console.log('未設定 Google Drive 資料來源，使用本地靜態資料')
    return LOCAL_GALLERY_ITEMS
  }

  // 檢查快取
  const now = Date.now()
  if (cachedGalleryData && (now - lastFetchTime) < CACHE_DURATION) {
    console.log('使用快取的 Google Drive 資料')
    return cachedGalleryData
  }

  try {
    console.log('從 Google Drive 載入圖庫資料...')
    const response = await fetch(dataUrl)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // 驗證資料格式
    if (!Array.isArray(data)) {
      throw new Error('Google Drive 資料格式錯誤：必須是陣列')
    }
    
    // 處理資料：轉換 Google Drive 連結
    const processedData = data.map(item => ({
      ...item,
      thumbnail: item.thumbnail ? convertGoogleDriveUrl(item.thumbnail) : item.thumbnail,
      fullsize: item.fullsize ? convertGoogleDriveUrl(item.fullsize) : item.fullsize,
      videoUrl: item.videoUrl ? convertGoogleDriveUrl(item.videoUrl) : item.videoUrl
    }))
    
    // 更新快取
    cachedGalleryData = processedData
    lastFetchTime = now
    
    console.log(`✅ 成功從 Google Drive 載入 ${processedData.length} 個項目`)
    return processedData
    
  } catch (error) {
    console.error('❌ 從 Google Drive 載入資料失敗:', error)
    console.log('使用本地靜態資料作為備用')
    return LOCAL_GALLERY_ITEMS
  }
}

/**
 * 設定 Google Drive 資料來源
 * @param {string} url - Google Drive JSON 檔案的公開連結
 */
export function setDataSource(url) {
  if (url) {
    // 自動轉換 Google Drive 連結
    const convertedUrl = convertGoogleDriveUrl(url)
    localStorage.setItem('gallery_data_url', convertedUrl)
    console.log('✅ 已設定 Google Drive 資料來源')
    // 清除快取，強制重新載入
    cachedGalleryData = null
  } else {
    localStorage.removeItem('gallery_data_url')
    cachedGalleryData = null
    console.log('✅ 已清除 Google Drive 資料來源，恢復使用本地資料')
  }
}

/**
 * 取得當前資料來源
 */
export function getDataSource() {
  return localStorage.getItem('gallery_data_url') || null
}

/**
 * 清除快取，強制重新載入資料
 */
export function clearCache() {
  cachedGalleryData = null
  lastFetchTime = 0
  console.log('✅ 已清除快取')
}

/**
 * 取得所有相簿項目
 */
export async function getAllItems() {
  const items = await fetchGoogleDriveData()
  return items
}

/**
 * 根據 ID 取得單一項目
 */
export async function getItemById(id) {
  const items = await fetchGoogleDriveData()
  const item = items.find(item => item.id === Number(id))
  return item || null
}

/**
 * 根據類型篩選項目
 */
export async function getItemsByType(type) {
  const items = await fetchGoogleDriveData()
  if (type === 'all') {
    return items
  }
  const filtered = items.filter(item => item.type === type)
  return filtered
}

/**
 * 搜尋項目
 */
export async function searchItems(query) {
  const items = await fetchGoogleDriveData()
  const lowerQuery = query.toLowerCase()
  const results = items.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.location.toLowerCase().includes(lowerQuery) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  )
  return results
}

/**
 * 媒體類型配置
 */
export const mediaTypes = [
  { value: 'all', label: '全部' },
  { value: 'photo', label: '照片' },
  { value: 'video', label: '影片' },
  { value: '360-photo', label: '360° 照片' },
  { value: '360-video', label: '360° 影片' }
]

// 匯出備用靜態資料（用於範例）
export const galleryItems = LOCAL_GALLERY_ITEMS
