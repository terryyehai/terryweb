# 📖 Google Drive 整合快速指南

## 概述

Wanderlens 現已整合 Google Drive 支援，您可以直接將照片和影片存放在 Google Drive，網站會自動載入顯示。

## ✨ 主要優點

1. **簡單管理**：直接在 Google Drive 上傳、刪除、重新命名檔案
2. **即時更新**：更新 JSON 檔案後，清除快取即可看到最新內容
3. **零成本**：使用 Google Drive 免費儲存空間（15GB）
4. **易於維護**：無需重新部署網站

## 🚀 三步驟設定

### 1️⃣ 準備 JSON 資料檔

下載範例檔案：進入網站「設定」頁面，點擊「下載範例 JSON 檔案」

或手動建立 `gallery-data.json`：

```json
[
  {
    "id": 1,
    "type": "photo",
    "title": "您的照片標題",
    "location": "地點",
    "description": "描述",
    "thumbnail": "縮圖的 Google Drive 分享連結",
    "fullsize": "完整圖片的 Google Drive 分享連結",
    "tags": ["標籤1", "標籤2"]
  }
]
```

### 2️⃣ 上傳到 Google Drive 並設為公開

1. 上傳 `gallery-data.json` 和所有照片/影片到 Google Drive
2. 選取檔案 → 右鍵 → 「取得連結」
3. 改為 **「知道連結的任何人都可以檢視」**
4. 複製分享連結

### 3️⃣ 在網站設定

1. 前往網站「設定」頁面
2. 貼上 `gallery-data.json` 的分享連結
3. 點擊「測試連線」確認
4. 點擊「儲存設定」
5. 重新整理頁面

## 🎯 資料格式說明

### 必填欄位

- `id`: 唯一識別碼（數字）
- `type`: 類型（`photo` | `video` | `360-photo` | `360-video`）
- `title`: 標題
- `location`: 地點
- `description`: 描述
- `thumbnail`: 縮圖連結（Google Drive 分享連結）
- `fullsize`: 完整圖片連結

### 選填欄位

- `videoUrl`: 影片連結（當 type 為 video 或 360-video 時必填）
- `tags`: 標籤陣列，用於搜尋

### 連結格式

支援兩種格式：

1. **完整分享連結**（推薦）：
   ```
   https://drive.google.com/file/d/FILE_ID/view
   ```

2. **直接下載連結**：
   ```
   https://drive.google.com/uc?export=download&id=FILE_ID
   ```

系統會自動轉換格式 1 為格式 2。

## 💡 使用技巧

### 如何取得檔案 ID？

從分享連結中提取：
```
https://drive.google.com/file/d/1ABC2def3GHI4jkl5MNO/view
                                 ↑ 這就是 FILE_ID ↑
```

### 如何新增照片？

1. 上傳新照片到 Google Drive
2. 設為公開分享
3. 取得分享連結
4. 編輯 `gallery-data.json`，新增一筆資料
5. 在網站「設定」頁面點擊「清除快取」
6. 重新整理頁面

### 如何修改照片資訊？

1. 直接在 Google Drive 編輯 `gallery-data.json`
2. 或下載、編輯後重新上傳
3. 在網站「設定」頁面點擊「清除快取」
4. 重新整理頁面

## ⚠️ 注意事項

### 安全性

- Google Drive 分享連結雖然公開，但難以猜測
- 建議使用專用帳號存放網站檔案
- 定期檢查檔案存取權限

### 效能

- 系統會快取資料 5 分鐘，減少 API 請求
- 建議縮圖大小控制在 500KB 以內
- 完整圖片建議 1-3 MB
- 影片建議 10-50 MB

### 流量限制

- Google Drive 單一檔案有下載流量限制
- 如果網站流量大，建議改用 CDN 服務
- 或考慮使用其他圖床服務

## 🔧 進階設定

### 使用程式腳本自動化

可以使用 Google Apps Script 自動生成 JSON 檔案：

```javascript
function generateGalleryData() {
  const folder = DriveApp.getFolderById('YOUR_FOLDER_ID');
  const files = folder.getFiles();
  const data = [];
  
  let id = 1;
  while (files.hasNext()) {
    const file = files.next();
    data.push({
      id: id++,
      type: 'photo',
      title: file.getName(),
      location: '待填寫',
      description: '待填寫',
      thumbnail: `https://drive.google.com/file/d/${file.getId()}/view`,
      fullsize: `https://drive.google.com/file/d/${file.getId()}/view`,
      tags: []
    });
  }
  
  Logger.log(JSON.stringify(data, null, 2));
}
```

### 批次處理圖片

建議使用圖片處理工具先產生縮圖：

- 縮圖尺寸：600x400 px
- 完整圖片：1920x1080 px
- 格式：JPG (品質 80-90%)

## 📚 相關文件

- 📖 [完整教學](./GOOGLE_DRIVE_SETUP.md)
- 🏠 [返回首頁](../README.md)

## ❓ 常見問題

### Q: 可以使用私人檔案嗎？

A: 不行。因為網站是純前端架構，無法進行 OAuth 認證，只能存取公開分享的檔案。

### Q: 更新後沒有變化？

A: 前往「設定」頁面，點擊「清除快取」，然後重新整理頁面。

### Q: 圖片無法顯示？

A: 檢查以下幾點：
1. 檔案是否設為公開分享
2. 分享連結是否正確
3. FILE_ID 是否正確提取
4. 瀏覽器 Console 是否有錯誤訊息

### Q: 支援哪些檔案格式？

A: 
- 圖片：JPG, PNG, WebP, GIF
- 影片：MP4, WebM
- 資料：JSON

---

**需要幫助？** 請查看 [完整教學文件](./GOOGLE_DRIVE_SETUP.md)
