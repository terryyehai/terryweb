# Cloudflare Pages 部署指南

## 🚀 快速部署到 Cloudflare Pages

### 方法 1：連接 GitHub（推薦）

1. **登入 Cloudflare Dashboard**
   - 前往 https://dash.cloudflare.com
   - 登入您的帳號

2. **建立新專案**
   - 點擊 **Workers & Pages**
   - 點擊 **Create application**
   - 選擇 **Pages** 標籤
   - 點擊 **Connect to Git**

3. **連接 GitHub**
   - 選擇 **GitHub**
   - 授權 Cloudflare 存取您的 GitHub
   - 選擇 `terryyehai/terryweb` repository

4. **設定建構**
   ```
   Framework preset: Vue
   Build command: npm run build
   Build output directory: dist
   Root directory: (留空)
   ```

5. **點擊 Deploy**
   - Cloudflare 會自動建構並部署
   - 完成後會獲得一個 `*.pages.dev` 網址

### 方法 2：直接上傳

1. 在本地建構：
   ```bash
   npm run build
   ```

2. 前往 Cloudflare Pages
3. 點擊 **Create a project**
4. 選擇 **Direct Upload**
5. 拖曳 `dist` 資料夾上傳

---

## 🌐 您的 Cloudflare Pages 網址

部署完成後，您的網站將可在以下網址訪問：

```
https://terryweb.pages.dev
```

或自訂子網域：
```
https://your-custom-name.pages.dev
```

---

## ⚙️ 環境變數（如果需要）

在 Cloudflare Dashboard 中設定：

| 變數名稱 | 值 | 說明 |
|---------|------|------|
| NODE_VERSION | 20 | Node.js 版本 |

---

## 🔄 自動部署

連接 GitHub 後，每次推送到 `main` 分支都會自動觸發部署！
