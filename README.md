# Pixel Arcade Quiz (像素风闯关问答游戏)

这是一个基于 React (Vite) 打造的复古像素风格问答游戏。结合了怀旧的街机视觉体验与现代的网页技术，并搭配 Google Sheets 作为轻量级的在线题库与玩家成绩资料库。

## ✨ 核心特色

- 👾 **复古像素美学**：全局套用街机风格 CSS 与 `Press Start 2P` 像素字体。
- 👹 **随机动态关主**：接入 DiceBear API，每个关卡随机生成独特的像素风关主头像。
- 📊 **Google Sheets 后台**：无需额外架设资料库，利用 Google Apps Script (GAS) 将 Google 表格作为即时题库与成绩记录系统。
- 👨‍🏫 **教师专属模式 (Teacher Mode)**：内建教师密码保护后台，让老师可以直接在网页端新增临时题目，储存于浏览器本地端。
- 📝 **错题回顾功能**：游戏结束后自动统整玩家答错的题目，比对玩家答案与正确解答。

## 🛠️ 技术栈

- **前端框架**：React 18 + Vite
- **样式设计**：Vanilla CSS (CSS Variables, Flexbox/Grid, Animations)
- **后端/资料库**：Google Apps Script + Google Sheets
- **第三方 API**：[DiceBear Pixel Art](https://www.dicebear.com/styles/pixel-art)

## 🚀 快速开始

### 1. 安装与启动

请确认你的电脑已安装 [Node.js](https://nodejs.org/)。

```bash
# 1. 进入项目目录
cd pixel-game

# 2. 安装依赖包
npm install

# 3. 启动本地开发服务器
npm run dev
```

### 2. 环境变量设定

修改项目根目录的 `.env` 文件，填入你的设定：

```env
# 你的 Google Apps Script 部署网址 (详见下方 GAS 部署教学)
VITE_GAS_API_URL=https://script.google.com/macros/s/你的专属ID/exec

# 每次游戏抽取的总题数
VITE_TOTAL_QUESTIONS=10

# 教师模式的登入帐号与密码
VITE_TEACHER_ID=admin
VITE_TEACHER_PASSWORD=pixel
```

---

## 📈 Google Apps Script (GAS) 部署教学

为了让游戏能自动抓取题目与记录成绩，请按照以下步骤设定 Google 表格：

### Step 1：建立 Google 表格
1. 新建一个 Google 表格。
2. 建立两个工作表（Sheet）：
   - 第一个命名为 **`题目`**
   - 第二个命名为 **`成绩`**
3. 在**「题目」**工作表的第一行填上表头：`题号 | 题目 | A | B | C | D | 解答`
4. 在**「成绩」**工作表的第一行填上表头：`ID | 闯关次数 | 最高分 | 第一次玩的分数 | 花了几次通关`

*(注：系统以 60 分作为通关标准，可于 GAS 代码中自行修改)*

### Step 2：部署代码
1. 在表格上方选单点选 **扩展功能 (Extensions) -> Apps 脚本 (Apps Script)**。
2. 将项目根目录下的 `google-apps-script.gs` 里面的所有程式码复制，覆盖贴上到线上的编辑器中。
3. **【关键】** 将代码第 4 行的 `SHEET_ID` 替换成你这整份 Google 表格的 ID（可以从浏览器的网址列复制 `d/` 和 `/edit` 之间的那长串英数）。
4. 点选右上角 **部署 -> 新增部署**。
5. 部署类型选择 **网页应用程式 (Web App)**。
6. 「执行身份」选自己，「谁可以存取」选 **所有人 (Anyone)**。
7. 点击部署后，会获得一段 **网路应用程式网址 (Web App URL)**，将其复制填入本地的 `.env` 里的 `VITE_GAS_API_URL` 中。

> ⚠️ **注意**：未来如果你在 Apps Script 里修改了任何代码逻辑，**绝对不能只按储存**，必须重新走一次「管理部署 -> 编辑 -> 版本选择『新版本』 -> 部署」，否则外部连线永远只会读到旧代码！

---

## 👨‍🏫 教师模式 (Teacher Mode)

在游戏首页的下方，有一个隐蔽的 `TEACHER MODE` 按钮。
- **预设登入凭证**：请参考你的 `.env` 设定（预设为 `admin` / `pixel`）。
- **功能**：登入后，老师可以随时新增自定义题目。只要系统内有自定义题目，学生进行游戏时就会优先抽取自定义题库（储存于 Local Storage），适合用在课堂即时小测验。若清空自定义题目，则会恢复去抓取 Google 表格的预设题库。

## 📄 授权
MIT License

---

## 🌐 自动部署到 GitHub Pages (自动化工作流)

本项目已内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`）。只要你把代码推送到 GitHub 的 `main` 分支，系统就会自动帮你打包并发布成免费的公开网站！

### 部署与配置步骤：

**1. 设定 GitHub Secrets (极度重要)**
因为 `.env` 档案不会被上传到 GitHub，所以在云端打包时，系统会不知道你的 GAS 网址和密码。你需要手动设定给 GitHub：
1. 在你的 GitHub 仓库页面，点击上方的 **Settings**（设定）。
2. 在左侧选单找到 **Secrets and variables -> Actions**。
3. 在 `Repository secrets` 区块，点击 **New repository secret**。
4. 依次新增以下 Secret：
   - Name: `VITE_GAS_API_URL` / Secret: `你的GAS完整网址`
   - Name: `VITE_TEACHER_ID` / Secret: `admin` (或你的新帐号)
   - Name: `VITE_TEACHER_PASSWORD` / Secret: `pixel` (或你的新密码)
   
 *(注：`VITE_TOTAL_QUESTIONS` 预设已在代码中设为 10，如需修改可在此处加入)*

**2. 开启 GitHub Pages 权限**
1. 在仓库的 **Settings** -> 左侧选单点选 **Pages**。
2. 在 **Build and deployment** 区块的 **Source**，把它从 `Deploy from a branch` 改为 **`GitHub Actions`**。

**3. 触发自动部署**
设定完成后，只要你执行 `git push` 把代码推送到 GitHub 的 `main` 分支，GitHub Actions 就会自动启动。你可以点击仓库上方的 **Actions** 标签查看进度。部署成功后，你就会得到一个专属的公开网页连结了！
