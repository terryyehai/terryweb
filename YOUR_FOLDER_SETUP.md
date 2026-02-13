# 🚀 您的 Google Drive 資料夾設定指南

## 📂 您的資料夾資訊

**資料夾連結**：
```
https://drive.google.com/drive/folders/1qm0SO7-XAOlYITnvrvZGQitwnOKZN83j?usp=drive_link
```

## ✅ 設定檢查清單

### □ 第 1 步：準備 JSON 資料檔

**選項 A：使用範本檔案（推薦）**
1. 在專案中找到 `gallery-data-template.json`
2. 上傳到您的 Google Drive 資料夾
3. 重新命名為 `gallery-data.json`

**選項 B：手動建立**
1. 在 Google Drive 中點擊「新增」→「Google 文件」
2. 複製以下內容並貼上

```json
[
  {
    "id": 1,
    "type": "photo",
    "title": "第一張照片",
    "location": "台灣",
    "description": "描述您的照片",
    "thumbnail": "https://drive.google.com/file/d/檔案ID/view",
    "fullsize": "https://drive.google.com/file/d/檔案ID/view",
    "tags": ["標籤"]
  }
]
```

3. 另存為純文字檔：檔案 → 下載 → 純文字 (.txt)
4. 重新命名為 `gallery-data.json`
5. 上傳回 Google Drive 資料夾

---

### □ 第 2 步：上傳照片和影片

建議資料夾結構：

```
📁 您的資料夾 (1qm0SO7-XAOlYITnvrvZGQitwnOKZN83j)
  │
  ├── 📄 gallery-data.json        ← 資料檔（必要）
  │
  ├── 📁 photos/                  ← 照片資料夾（建議）
  │   ├── photo1-thumb.jpg        ← 縮圖
  │   ├── photo1-full.jpg         ← 完整圖
  │   ├── photo2-thumb.jpg
  │   └── photo2-full.jpg
  │
  └── 📁 videos/                  ← 影片資料夾（建議）
      ├── video1-thumb.jpg        ← 影片縮圖
      └── video1.mp4              ← 影片檔案
```

**圖片尺寸建議**：
- 縮圖 (thumbnail)：600 x 400 px，≤ 500 KB
- 完整圖 (fullsize)：1920 x 1080 px，≤ 3 MB
- 影片：≤ 50 MB

---

### □ 第 3 步：設定檔案為公開分享

**重要**：每個檔案都必須設為公開！

**快速設定（推薦）**：
1. 選取整個資料夾
2. 右鍵 → **共用**
3. 點擊「變更」
4. 選擇：**知道連結的任何人都可以檢視** ✅
5. 點擊「完成」

**個別設定**：
1. 點選檔案
2. 右鍵 → **取得連結**
3. 改為：**知道連結的任何人都可以檢視** ✅
4. 點擊「複製連結」

---

### □ 第 4 步：取得檔案 ID

從分享連結中提取 FILE_ID：

**範例連結**：
```
https://drive.google.com/file/d/1ABC2def3GHI4jkl5MNO/view?usp=sharing
                                 ↑────── FILE_ID ──────↑
```

**FILE_ID 就是**：`1ABC2def3GHI4jkl5MNO`

---

### □ 第 5 步：編輯 JSON 資料檔

開啟 `gallery-data.json`，為每張照片/影片新增條目：

#### 📸 一般照片範例

```json
{
  "id": 1,
  "type": "photo",
  "title": "台北101夜景",
  "location": "台灣 台北",
  "description": "從象山拍攝的台北101夜景",
  "thumbnail": "https://drive.google.com/file/d/1ABC...縮圖ID.../view",
  "fullsize": "https://drive.google.com/file/d/1DEF...完整圖ID.../view",
  "tags": ["台北", "夜景", "101"]
}
```

#### 🎥 影片範例

```json
{
  "id": 2,
  "type": "video",
  "title": "日月潭風光",
  "location": "南投 日月潭",
  "description": "日月潭的美麗風光",
  "thumbnail": "https://drive.google.com/file/d/1GHI...縮圖ID.../view",
  "fullsize": "https://drive.google.com/file/d/1GHI...縮圖ID.../view",
  "videoUrl": "https://drive.google.com/file/d/1JKL...影片ID.../view",
  "tags": ["日月潭", "湖泊"]
}
```

#### 🌐 360° 照片範例

```json
{
  "id": 3,
  "type": "360-photo",
  "title": "阿里山日出",
  "location": "嘉義 阿里山",
  "description": "360度全景日出",
  "thumbnail": "https://drive.google.com/file/d/1MNO...縮圖ID.../view",
  "fullsize": "https://drive.google.com/file/d/1PQR...全景圖ID.../view",
  "tags": ["阿里山", "日出", "全景"]
}
```

#### 🎬 360° 影片範例

```json
{
  "id": 4,
  "type": "360-video",
  "title": "墾丁海底世界",
  "location": "屏東 墾丁",
  "description": "360度海底探索",
  "thumbnail": "https://drive.google.com/file/d/1STU...縮圖ID.../view",
  "fullsize": "https://drive.google.com/file/d/1STU...縮圖ID.../view",
  "videoUrl": "https://drive.google.com/file/d/1VWX...影片ID.../view",
  "tags": ["墾丁", "潛水", "全景"]
}
```

**完整範例**：

```json
[
  {
    "id": 1,
    "type": "photo",
    "title": "台北101夜景",
    "location": "台灣 台北",
    "description": "從象山拍攝的台北101夜景",
    "thumbnail": "https://drive.google.com/file/d/1ABC.../view",
    "fullsize": "https://drive.google.com/file/d/1DEF.../view",
    "tags": ["台北", "夜景", "101"]
  },
  {
    "id": 2,
    "type": "video",
    "title": "日月潭風光",
    "location": "南投 日月潭",
    "description": "日月潭的美麗風光",
    "thumbnail": "https://drive.google.com/file/d/1GHI.../view",
    "fullsize": "https://drive.google.com/file/d/1GHI.../view",
    "videoUrl": "https://drive.google.com/file/d/1JKL.../view",
    "tags": ["日月潭", "湖泊"]
  }
]
```

---

### □ 第 6 步：取得 JSON 檔案連結

1. 在 Google Drive 選取 `gallery-data.json`
2. 右鍵 → **取得連結**
3. 確認：**知道連結的任何人都可以檢視** ✅
4. **複製連結**

連結格式：
```
https://drive.google.com/file/d/YOUR_JSON_FILE_ID/view
```

---

### □ 第 7 步：在網站設定

1. **開啟網站設定頁面**：
   ```
   http://localhost:4175/#/settings
   ```

2. **貼上 JSON 檔案連結**：
   - 將步驟 6 複製的連結貼到「Google Drive JSON 檔案連結」欄位

3. **測試連線**：
   - 點擊「🔍 測試連線」按鈕
   - 確認看到「✅ 連線成功！找到 X 個項目」

4. **儲存設定**：
   - 點擊「💾 儲存設定」

5. **重新整理頁面**：
   - 按 F5 或重新整理瀏覽器

6. **檢查結果**：
   - 前往「相簿」頁面
   - 確認看到您的照片和影片

---

## 🔧 常見問題排除

### ❌ 問題：測試連線失敗

**檢查項目**：
- [ ] JSON 檔案是否設為公開分享？
- [ ] 連結格式是否正確？
- [ ] JSON 語法是否正確？（使用 https://jsonlint.com/ 驗證）

### ❌ 問題：照片無法顯示

**檢查項目**：
- [ ] 圖片檔案是否設為公開分享？
- [ ] FILE_ID 是否正確？
- [ ] 連結中的 FILE_ID 是否完整？

### ❌ 問題：更新後沒有變化

**解決方式**：
1. 前往「設定」頁面
2. 點擊「🗑️ 清除快取」
3. 重新整理頁面（F5）

---

## 📊 進度追蹤

記錄您的設定進度：

- [ ] JSON 資料檔已建立並上傳
- [ ] 照片和影片已上傳
- [ ] 所有檔案已設為公開分享
- [ ] 已取得所有檔案的 FILE_ID
- [ ] JSON 檔案已編輯完成
- [ ] 已取得 JSON 檔案連結
- [ ] 已在網站設定連結
- [ ] 測試連線成功
- [ ] 相簿頁面正常顯示

---

## 🎉 完成！

設定完成後，您就可以：

- ✅ 直接在 Google Drive 管理照片和影片
- ✅ 編輯 JSON 檔案更新內容
- ✅ 無需重新部署網站

### 下次更新內容時：

1. 上傳新照片到 Google Drive
2. 設為公開分享
3. 編輯 `gallery-data.json` 新增資料
4. 在網站清除快取
5. 重新整理頁面 ✨

---

## 📚 相關文件

- [完整教學文件](../docs/GOOGLE_DRIVE_SETUP.md)
- [快速入門指南](../docs/GOOGLE_DRIVE_QUICKSTART.md)
- [專案說明](../README.md)

---

**需要幫助？** 請查看瀏覽器 Console (F12) 的錯誤訊息
