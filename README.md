# 🖥️ Budget Tracker Frontend

一個使用 **Vue 3 + Vite + Axios** 建立的前端應用程式，  
搭配 Budget Tracker API 後端專案，提供使用者登入與記帳資料管理介面。

---

## 🔧 技術架構

- Vue 3（Composition API + <script setup>）
- Vite
- Vue Router
- Axios
- JWT 驗證機制
- Axios Interceptors
- Router Guard

---

## 📂 專案架構
```
budget-tracker-frontend
├─ src
│  ├─ views
│  │  ├─ Login.vue
│  │  └─ Records.vue
│  ├─ router
│  │  └─ index.js
│  ├─ utils
│  │  └─ api.js
│  ├─ App.vue
│  └─ main.js
├─ package.json
└─ vite.config.js
```
---

## 🔐 身分驗證流程（JWT）

### 登入流程

Client → 輸入帳號密碼  
→ 呼叫 POST /auth/login  
→ 後端驗證成功  
→ 回傳 JWT Token  
→ 前端儲存於 localStorage  
→ 導向記帳頁面  

---

### 受保護頁面流程

Client → 進入受保護頁面  
→ Router Guard 檢查是否存在 Token  
→ 若無 Token，自動導向 Login  

Client → 發送 API Request  
→ Axios Interceptor 自動加入  
Authorization: Bearer <token>  
→ 後端驗證成功才回傳資料  

---

## 🧩 前端功能一覽

### Login

- 使用者登入
- 儲存 JWT Token
- 成功後導向記帳頁面

### Records（需登入）

- 取得所有記帳資料
- 新增記帳
- 更新記帳
- 刪除記帳
- 即時計算總收入 / 總支出 / 餘額
- 收入 / 支出比例進度條顯示

> 📌 所有資料請求皆透過 JWT 驗證

---

## 🧠 設計重點

- 使用 **Axios 實例封裝 API**
- 使用 **Interceptor** 統一處理 Token 注入與 401 錯誤
- 使用 **Router Guard** 保護受限頁面
- 使用 **Composition API** 管理狀態
- 將 API 呼叫與畫面邏輯分離，提升可維護性

---

## 🧪 測試方式

1. 先啟動後端 API（預設 http://localhost:3000）
2. 啟動前端專案：

npm install  
npm run dev  

3. 開啟瀏覽器：
http://localhost:5173

4. 登入後測試所有 CRUD 功能

---

## 🚀 未來可擴充功能

- 使用者註冊頁面
- 圖表統計（Chart.js）
- 分頁與搜尋功能
- Dark Mode
- Refresh Token 機制
- 部署至雲端（Docker + Nginx）

---

## 🧠 架構設計說明（API / 驗證分離）

前端將 API 呼叫統一封裝於 `utils/api.js`，  
並透過 Axios Interceptor 處理：

- Token 自動加入 Header
- 401 未授權自動清除 Token 並跳轉登入頁

同時使用 Router Guard 保護需要登入的頁面，  
使驗證邏輯集中管理，避免重複撰寫判斷程式碼。

---

## 👤 作者

**ROWAN CHANG**  
後端工程師轉職學習專案

