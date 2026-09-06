# Research Portfolio — 计算毒理学与科学智能体

个人科研作品集静态网站。围绕四个科研项目与可核实的论文、书稿、教材、软件著作权成果，面向招聘方展示从数据整理、分子表征、预测建模，到模型解释、多源证据整合与科学智能体开发的完整研究能力。

线上地址：<https://mornest.cn>

## 页面结构

| 页面 | 内容 |
|---|---|
| `index.html` | 首页：研究主线图、四个项目概览、成果列表、关于我 |
| `grafpka.html` | 科研项目 01：可解释深度学习 pK<sub>a</sub> 预测（GraFpK<sub>a</sub>） |
| `mixture-toxicity.html` | 科研项目 02：二元混合物毒性预测 |
| `autotoxreporter.html` | 科研项目 03：毒性报告撰写多智能体系统 |
| `nitrosamine-ames.html` | 科研项目 04：条件级亚硝胺致突变性预测 |
| `paper-*.html` / `chapter-admet.html` | 论文与专著章节详情 |
| `textbook-aipharmacy.html` | 《人工智能药学》教材参编章节 |
| `software-grafpka.html` | GraFpK<sub>a</sub> 软件著作权 |
| `awards.html` | 获奖记录 |

## 技术要点

- **零依赖纯静态**：原生 HTML / CSS / JavaScript，无框架、无构建步骤
- **双主题**：暗色 / 浅色主题切换，`localStorage` 持久化，首屏内联脚本避免闪烁；图形配色随主题自适应
- **组件注入**：导航栏与页脚由 `common.js` 统一注入，12 个页面共享一套结构
- **手绘 SVG 架构图**：五个科研项目 / 成果页均配有依据论文内容重绘的架构图（`viewBox` + 主题变量 + 窄屏横向滚动 + `role="img"` 无障碍描述）
- **排版约定**：pK<sub>a</sub>、R<sup>2</sup>、Q<sup>2</sup><sub>LOO</sub> 等化学记号全站统一上下标
- **可访问性**：全局 `:focus-visible` 焦点环、WCAG AA 对比度、`prefers-reduced-motion` 适配
- **打印友好**：打印样式隐藏导航与交互元素、强制浅色令牌、图形防跨页断裂
- **响应式**：桌面 / 平板 / 手机断点，移动端汉堡菜单

## 本地预览

无需安装任何依赖，任选其一：

```bash
# 方式一：直接用浏览器打开
open index.html

# 方式二：起一个本地静态服务器（推荐，路径行为与线上一致）
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署

任意静态托管平台可直接部署（Cloudflare Pages / GitHub Pages / Vercel 均可）。以 Cloudflare Pages 为例：

- Framework preset：`None`
- Build command：留空
- Build output directory：`/`

## 目录说明

```text
├── index.html              # 首页
├── *.html                  # 项目 / 成果 / 奖项详情页
├── style.css               # 全站样式与设计令牌（含打印样式）
├── common.js               # 导航页脚注入、主题切换、滚动渐显、鼠标拖影
├── research-map.css        # 首页研究主线图
├── *-architecture.css      # 各架构图专属样式（主题变量 scoped）
├── output-figure.css       # 成果页图形共享样式
└── images/                 # GraFpKa 软件截图
```

## 版权

页面内容（项目描述、图形、文案）为个人研究成果的展示，保留所有权利。GraFpK<sub>a</sub> 与 AutoToxReporter 的源代码见对应 GitHub 仓库。
