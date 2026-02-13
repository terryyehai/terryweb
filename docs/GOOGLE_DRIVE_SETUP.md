# 🗂️ Google Drive 整合教學

本教學將說明如何將 Wanderlens 網站整合 Google Drive，讓您可以直接在 Google Drive 管理照片和影片。

---

## 📋 目錄

1. [準備工作](#準備工作)
2. [建立資料結構](#建立資料結構)
3. [上傳檔案到 Google Drive](#上傳檔案到-google-drive)
4. [設定公開分享](#設定公開分享)
5. [在網站中設定](#在網站中設定)
6. [常見問題](#常見問題)

---

## 🎯 準備工作

### 需要的工具
- Google Drive 帳號
- 文字編輯器（用於編輯 JSON 檔案）
- 照片和影片檔案

### 檔案格式支援
- **圖片**: JPG, PNG, WebP
- **影片**: MP4, WebM
- **資料檔**: JSON

---

## 📁 建立資料結構

### 步驟 1: 建立資料夾

在 Google Drive 建立以下資料夾結構：

```
📁 Wanderlens
  ├── 📄 gallery-data.json    (圖庫資料檔)
  ├── 📁 images              (圖片資料夾)
  │   ├── photo1.jpg
  │   ├── photo2.jpg
  │   └── ...
  └── 📁 videos              (影片資料夾)
      ├── video1.mp4
      ├── video2.mp4
      └── ...
```

### 步驟 2: 建立 JSON 資料檔

建立 `gallery-data.json` 檔案，內容格式如下：

```json
[
  {
    "id": 1,
    "type": "photo",
    "title": "阿爾卑斯山脈",
    "location": "瑞士, 歐洲",
    "description": "壯麗的阿爾卑斯山脈，白雪覆蓋的山峰在陽光下閃耀著金色光芒。",
    "thumbnail": "https://drive.google.com/file/d/YOUR_THUMBNAIL_FILE_ID/view",
    "fullsize": "https://drive.google.com/file/d/YOUR_FULLSIZE_FILE_ID/view",
    "tags": ["山脈", "瑞士", "自然"]
  },
  {
    "id": 2,
    "type": "video",
    "title": "馬爾地夫海灘",
    "location": "馬爾地夫, 印度洋",
    "description": "清澈見底的海水，純白的沙灘，這是人間天堂的模樣。",
    "thumbnail": "https://drive.google.com/file/d/YOUR_THUMBNAIL_FILE_ID/view",
    "fullsize": "https://drive.google.com/file/d/YOUR_FULLSIZE_FILE_ID/view",
    "videoUrl": "https://drive.google.com/file/d/YOUR_VIDEO_FILE_ID/view",
    "tags": ["海灘", "馬爾地夫", "度假"]
  },
  {
    "id": 3,
    "type": "360-photo",
    "title": "京都竹林",
    "location": "京都, 日本",
    "description": "嵐山竹林步道，陽光穿透竹葉灑落，如夢似幻的日式庭園。",
    "thumbnail": "https://drive.google.com/file/d/YOUR_THUMBNAIL_FILE_ID/view",
    "fullsize": "https://drive.google.com/file/d/YOUR_FULLSIZE_FILE_ID/view",
    "tags": ["日本", "竹林", "自然"]
  },
  {
    "id": 4,
    "type": "360-video",
    "title": "大堡礁探索",
    "location": "澳洲, 大洋洲",
    "description": "潛入世界最大的珊瑚礁系統，與海洋生物近距離接觸。",
    "thumbnail": "https://drive.google.com/file/d/YOUR_THUMBNAIL_FILE_ID/view",
    "fullsize": "https://drive.google.com/file/d/YOUR_FULLSIZE_FILE_ID/view",
    "videoUrl": "https://drive.google.com/file/d/YOUR_VIDEO_FILE_ID/view",
    "tags": ["澳洲", "海洋", "潛水"]
  }
]
```

### 📝 欄位說明

| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `id` | number | ✅ | 唯一識別碼，不可重複 |
| `type` | string | ✅ | 類型：`photo`, `video`, `360-photo`, `360-video` |
| `title` | string | ✅ | 標題 |
| `location` | string | ✅ | 地點 |
| `description` | string | ✅ | 描述 |
| `thumbnail` | string | ✅ | 縮圖連結（Google Drive 分享連結） |
| `fullsize` | string | ✅ | 完整尺寸圖片連結 |
| `videoUrl` | string | ⚠️ | 影片連結（type 為 video 或 360-video 時必填） |
| `tags` | array | ❌ | 標籤陣列，用於搜尋 |

---

## ☁️ 上傳檔案到 Google Drive

### 步驟 1: 上傳媒體檔案

1. 開啟 Google Drive
2. 進入 `Wanderlens` 資料夾
3. 將所有圖片上傳到 `images` 資料夾
4. 將所有影片上傳到 `videos` 資料夾

### 步驟 2: 上傳 JSON 資料檔

1. 將編輯好的 `gallery-data.json` 上傳到 `Wanderlens` 資料夾
2. 確認檔案名稱正確

---

## 🔓 設定公開分享

### 為什麼需要設定為公開？

Wanderlens 是純前端網站，無法使用 Google Drive API 的 OAuth 認證。因此需要將檔案設定為公開分享，讓網站可以直接存取。

### 設定步驟

#### 方法一：個別設定

1. 在 Google Drive 中選取檔案
2. 右鍵點擊 → **取得連結**
3. 將權限改為 **知道連結的任何人都可以檢視**
4. 點擊 **複製連結**
5. 將連結貼到 JSON 檔案中對應的欄位

#### 方法二：批次設定

1. 選取整個 `Wanderlens` 資料夾
2. 右鍵點擊 → **取得連結**
3. 將權限改為 **知道連結的任何人都可以檢視**
4. ⚠️ 注意：子資料夾和檔案會繼承此設定

### 🔗 取得檔案 ID

Google Drive 分享連結格式：
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

其中 `FILE_ID` 就是檔案的唯一識別碼。

**範例**：
- 分享連結：`https://drive.google.com/file/d/1a2B3c4D5e6F7g8H9i0J/view`
- FILE_ID：`1a2B3c4D5e6F7g8H9i0J`

### ⚙️ 系統會自動轉換

您可以直接貼上完整的分享連結到 JSON 檔案中，系統會自動轉換為正確的格式：

```json
{
  "thumbnail": "https://drive.google.com/file/d/1a2B3c4D5e6F7g8H9i0J/view"
}
```

系統會自動轉換為：
```
https://drive.google.com/uc?export=download&id=1a2B3c4D5e6F7g8H9i0J
```

---

## 🌐 在網站中設定

### 步驟 1: 取得 JSON 檔案連結

1. 在 Google Drive 中找到 `gallery-data.json`
2. 右鍵點擊 → **取得連結**
3. 確認權限為 **知道連結的任何人都可以檢視**
4. 點擊 **複製連結**

### 步驟 2: 在網站設定

1. 開啟 Wanderlens 網站
2. 點擊導航列的 **設定**
3. 在「Google Drive 資料來源」區塊貼上連結
4. 點擊 **測試連線** 確認連結正確
5. 點擊 **儲存設定**
6. 重新整理頁面

### 步驟 3: 驗證

1. 前往 **相簿** 頁面
2. 確認看到 Google Drive 中的照片和影片
3. 點擊項目查看詳細內容

---

## ❓ 常見問題

### Q1: 為什麼顯示「載入失敗」？

**可能原因**：
1. JSON 檔案未設為公開分享
2. JSON 格式錯誤
3. 連結不正確

**解決方式**：
1. 確認 JSON 檔案權限為「知道連結的任何人都可以檢視」
2. 使用 [JSONLint](https://jsonlint.com/) 驗證 JSON 格式
3. 點擊「測試連線」按鈕檢查連結

### Q2: 圖片無法顯示？

**可能原因**：
1. 圖片檔案未設為公開分享
2. 檔案 ID 不正確

**解決方式**：
1. 確認所有圖片檔案都設為公開分享
2. 重新複製分享連結，確認 FILE_ID 正確

### Q3: 更新 JSON 後沒有變化？

**可能原因**：
- 瀏覽器使用了快取的資料（快取時間 5 分鐘）

**解決方式**：
1. 前往 **設定** 頁面
2. 點擊 **清除快取** 按鈕
3. 重新整理頁面

### Q4: 可以使用私人檔案嗎？

**答案**：否。由於 Wanderlens 是純前端架構，無法進行 OAuth 認證，因此只能存取公開分享的檔案。

如果需要私人檔案支援，建議：
1. 建立專用的 Google Drive 帳號
2. 使用難以猜測的檔案名稱
3. 定期更換分享連結

### Q5: 如何新增或刪除照片？

**新增照片**：
1. 上傳新照片到 Google Drive
2. 設定為公開分享
3. 取得分享連結
4. 在 `gallery-data.json` 中新增一筆資料
5. 重新上傳 JSON 檔案（或直接在 Drive 編輯）
6. 在網站中清除快取

**刪除照片**：
1. 從 `gallery-data.json` 中移除該筆資料
2. （選用）從 Google Drive 刪除檔案
3. 在網站中清除快取

### Q6: 檔案大小有限制嗎？

**建議大小**：
- **縮圖 (thumbnail)**: 200-500 KB
- **完整圖片 (fullsize)**: 1-3 MB
- **影片 (videoUrl)**: 10-50 MB

⚠️ 注意：Google Drive 單一檔案下載有流量限制，如果網站流量大，請考慮使用 CDN 服務。

---

## 🎉 完成！

現在您已經成功整合 Google Drive，可以直接在 Drive 中管理您的照片和影片了！

### 下一步

- 📸 上傳更多照片和影片
- 🎨 調整網站樣式
- 🚀 部署到 GitHub Pages 或 Cloudflare Pages

### 需要協助？

如果遇到問題，請檢查：
1. 瀏覽器 Console (F12) 的錯誤訊息
2. JSON 格式是否正確
3. 所有檔案是否都設為公開分享

---

**📚 相關文件**：
- [部署指南](../README.md#deployment)
- [專案說明](../README.md)
