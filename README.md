# React Redux System Dashboard

> 基于 React 和 Redux 构建的轻量级系统状态管理演示面板

本项目是一个演示 React Redux 核心概念的单页应用（SPA）。它模拟了一个简易的系统控制台，展示了如何在复杂组件层级中实现跨组件状态共享、数据流转及动态列表渲染。

## ✨ 功能亮点

- **全局状态管理**：使用 Redux 集中管理应用状态（计数器、系统状态、消息日志）。
- **跨组件通信**：实现了顶层 Header 与底层组件的数据同步，无需繁琐的 Props 传递。
- **实时日志记录**：用户操作会自动生成带时间戳的系统日志，演示数组类型数据的更新与渲染。
- **响应式布局**：基于 CSS Grid 和 Flexbox 的现代化 UI 设计，适配桌面端与移动端。

## 🛠️ 技术栈

- **Frontend**: React 18
- **State Management**: Redux (Legacy API `createStore`)
- **Styling**: CSS3 (Grid, Flexbox, CSS Variables)

## 📦 安装与运行

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

