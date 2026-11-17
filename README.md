# 中文输入小工具 | Chinese Typing Desk

**在浏览器中输入中文，一键复制到其他应用。无需安装系统输入法。**

**Type Chinese in your browser and copy it into other apps. No system input-method installation required.**

[在线使用 / Open online](https://superaseraser.github.io/chinese-typing-desk/) · [下载离线版 / Download offline ZIP](https://superaseraser.github.io/chinese-typing-desk/downloads/chinese-typing-desk-offline.zip)

[中文说明](#中文说明) · [English](#english)

## 中文说明

### 这是什么？

一个轻量的中文输入网页工具，使用水杉输入引擎（MSIME），支持在页面文本框内通过**全拼输入简体中文**。输入后点击“复制文字”，即可粘贴到 Word、邮件、聊天窗口或其他应用。

界面默认中文，右上角可切换 English；切换界面语言不会清空已输入的文字。

### 适合哪些场景？

- **工作或学校电脑没有中文输入法**：在单位允许使用该网页的情况下，通过浏览器完成临时中文输入，无需安装系统输入法。
- **临时借用电脑或使用共享电脑**：偶尔需要写中文姓名、地址、短消息或邮件内容时，打开网页即可输入。
- **出差、旅行或网络不稳定**：提前下载离线包，断网后仍可输入中文。
- **日常中英文混合工作**：保留常用英文键盘，在这个页面里写中文，再复制到目标应用。

**使用范围：**它只在自身的文本框内提供中文输入，不会添加 Windows 系统键盘，也不能直接接管其他应用的输入框。若希望在所有应用中直接输入中文，需要启用系统输入法。单位或学校有访问限制时，请联系 IT。

### 在线使用

1. 打开 [在线版](https://superaseraser.github.io/chinese-typing-desk/)。
2. 等待“**中文输入已就绪**”；首次打开需要下载引擎和词库。
3. 输入 `nihao`，按空格键选择第一个候选“你好”，也可以从候选栏中选择其他词。
4. 点击“**复制文字**”，再粘贴到需要的应用中。

### 离线使用

1. 下载 [离线 ZIP](https://superaseraser.github.io/chinese-typing-desk/downloads/chinese-typing-desk-offline.zip)，并解压。
2. 使用较新版本的 Chrome 或 Edge 打开 `Chinese-Typing-Desk-Offline.html`。
3. 等待输入引擎就绪，即可使用。

离线 HTML 已内嵌引擎、拼音词库和整句模型，**无需联网、安装软件或启动本地服务器**。若浏览器不允许自动复制，页面会选中文字，按提示使用 Ctrl+C（Mac 使用 Command+C）即可。

### 在线版与离线版

| 项目 | 在线版 | 离线版 |
| --- | --- | --- |
| 打开方式 | 访问网页链接 | 解压后双击 HTML 文件 |
| 网络要求 | 首次加载需要网络，资源来自 CDN | 下载完成后无需网络 |
| 界面语言 | 中文 / English | 中文 / English |
| 输入方式 | 简体中文全拼 | 简体中文全拼 |
| 内容保存 | 不自动保存 | 不自动保存 |

### 隐私与浏览器支持

输入处理在浏览器内完成，本工具没有后端、统计分析或文字存储，也不会把输入内容发送到服务器。在线版加载 CDN 资源时会产生正常网络请求；离线版运行时不需要这些请求。

**关闭或刷新前请先复制文字**，页面不会保存草稿。

请使用支持 WebAssembly、Worker 和 `DecompressionStream` 的现代浏览器；推荐较新版本的 Chrome 或 Edge。

### 开发、部署与验证

- 页面源文件：`public/index.html`；在线页面无需构建。
- 离线打包：`scripts/build-offline.mjs`，将固定版本的引擎及资源内嵌到 HTML。
- 部署流程：`.github/workflows/pages.yml`；仓库 Settings → Pages → Source 选择 GitHub Actions。推送到 `main` 或手动运行 **Deploy typing tool** 可构建和发布。
- 发布前会在 Chromium 完全断网、拦截 HTTP 请求的环境中验证：本地 HTML 启动、`nihao → 你好`、中英文切换、文字保留和复制提示。
- 自动化测试验证了复制成功提示或手动复制提示，未独立验证操作系统剪贴板中的内容。

### 输入引擎与许可

本工具使用 [`@msime/web-engine`](https://www.npmjs.com/package/@msime/web-engine) **0.2.0**。在线版通过固定版本的 jsDelivr 地址加载；离线版将相同版本的引擎和资源内嵌。

MSIME 引擎采用 **GPL-3.0-only** 许可证。离线包附有许可证、第三方声明、发布的 JavaScript 源码及对应引擎源码。更多信息见 [MSIME 项目](https://github.com/metasequoiaime/msime/tree/develop/packages/web-engine)。

## English

### What is it?

A lightweight browser tool powered by MSIME for typing **Simplified Chinese with full Pinyin** inside its text box. Click **Copy text**, then paste into Word, email, chat, or another app.

The interface defaults to Chinese. Use the top-right button to switch to English without losing your text.

### When is it useful?

- **Work or university PCs without a Chinese input method:** type Chinese in the browser, where your organization permits access, without installing a system input method.
- **Borrowed or shared computers:** write an occasional Chinese name, address, message, or email.
- **Travel or unreliable connections:** download the offline edition in advance and keep typing without internet access.
- **Mixed Chinese and English work:** keep your usual English keyboard, compose Chinese here, and copy it into the destination app.

**Scope:** Chinese input works only inside this page's text box. It does not add a Windows keyboard or provide direct input in other apps. For Chinese input throughout the operating system, enable a system input method. Contact IT if your organization restricts access.

### Use online

1. Open the [online tool](https://superaseraser.github.io/chinese-typing-desk/).
2. Wait for **Chinese input ready**. The first visit downloads the engine and dictionary.
3. Type `nihao`, then press Space to choose “你好”, or select another candidate.
4. Click **Copy text** and paste into your destination app.

### Use offline

1. Download and extract the [offline ZIP](https://superaseraser.github.io/chinese-typing-desk/downloads/chinese-typing-desk-offline.zip).
2. Open `Chinese-Typing-Desk-Offline.html` in a recent Chrome or Edge.
3. Wait for the ready indicator and start typing.

The HTML embeds the engine, Pinyin dictionary, and sentence model. **No connection, installation, or local server is required.** If automatic copying is unavailable, the page selects your text so you can press Ctrl+C, or Command+C on Mac.

### Online vs. offline

| Feature | Online | Offline |
| --- | --- | --- |
| Open | Visit the website | Extract the ZIP and open the HTML |
| Connection | Needed for initial CDN resource loading | Not needed after downloading |
| Interface | Chinese / English | Chinese / English |
| Input | Simplified Chinese, full Pinyin | Simplified Chinese, full Pinyin |
| Text storage | No automatic saving | No automatic saving |

### Privacy and browser support

Input processing runs in your browser. This tool has no backend, analytics, or text storage and does not send typed text to a server. The online edition makes normal requests to download CDN resources; the offline edition needs no such requests.

**Copy your work before closing or refreshing.** Drafts are not saved.

Use a modern browser with WebAssembly, Worker, and `DecompressionStream` support. Recent Chrome or Edge is recommended.

### Development, deployment, and validation

- Page source: `public/index.html`. The online page needs no build step.
- Offline builder: `scripts/build-offline.mjs` embeds the pinned engine and its resources.
- Deployment: `.github/workflows/pages.yml`. Select GitHub Actions under repository Settings → Pages → Source. Push to `main` or manually run **Deploy typing tool** to build and publish.
- Before publishing, Chromium tests local HTML startup, `nihao → 你好`, language switching, text preservation, and copy feedback with the browser offline and HTTP requests blocked.
- Tests verify successful-copy or manual-copy feedback. Operating-system clipboard contents have not been independently verified.

### Engine and licensing

Uses [`@msime/web-engine`](https://www.npmjs.com/package/@msime/web-engine) **0.2.0**. The online edition loads a pinned jsDelivr URL; the offline edition embeds the same engine version and resources.

The MSIME engine is licensed under **GPL-3.0-only**. The offline ZIP includes its license, third-party notices, published JavaScript sources, and corresponding engine source. See the [MSIME project](https://github.com/metasequoiaime/msime/tree/develop/packages/web-engine) for details.
