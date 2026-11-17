# Chinese Typing Desk

A small, static tool for typing Simplified Chinese with Pinyin in a browser. Write in the text box, choose a candidate, and copy the result into Word, email, or another app. No Windows input-method installation is required.

**[Open Chinese Typing Desk](https://superaseraser.github.io/chinese-typing-desk/)**

默认中文界面，右上角可以切换 English，切换时保留已输入的文字。

**[下载即用的离线版 / Download offline edition](https://superaseraser.github.io/chinese-typing-desk/downloads/chinese-typing-desk-offline.zip)**

解压 ZIP 后，用较新版本的 Chrome 或 Edge 打开 `Chinese-Typing-Desk-Offline.html`。输入引擎、词库和模型全部内嵌，不需要网络、安装或本地服务器。若自动复制不可用，页面会选中文字并提示按 Ctrl+C。The offline edition embeds its runtime and resources; extract the ZIP and open the HTML file directly.

## Use

1. Open the published GitHub Pages site, or open `public/index.html` in Chrome or Edge.
2. Wait for **Chinese input ready**. The first load downloads the engine and dictionary.
3. Type `nihao`, press Space to choose the first candidate, and click **Copy text**.

This works inside the page's text box. It does not add a system keyboard.

## Deploy with GitHub Pages

The repository includes `.github/workflows/pages.yml`, which publishes only `public/` on pushes to `main` or a manual workflow run.

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. Then run **Deploy typing tool** from the Actions tab, or push a change to `main`.

GitHub Pages must be available under your account or organization policy. A managed network may also restrict the site or its CDN dependencies; contact IT if access is blocked.

## Development

Edit `public/index.html`. The online page needs no build step. To serve locally, use any static HTTP server with `public` as its root. Deployment additionally fetches the pinned engine package and generates the self-contained offline edition with `scripts/build-offline.mjs`.

The deployment workflow verifies offline `file://` launch, Pinyin conversion, language switching, text preservation, and copy feedback in Chromium with all HTTP requests blocked. It publishes only after these checks pass. Matching engine source and license notices are included in the offline ZIP.

## Dependencies and privacy

- Uses [`@msime/web-engine`](https://www.npmjs.com/package/@msime/web-engine) version **0.2.0**, loaded from jsDelivr with a pinned URL.
- MSIME input processing runs in a browser Web Worker. This page has no backend, analytics, or text storage.
- External resources are downloaded from the CDN, which receives normal web requests. The page does not send typed text to a server.
- Text is lost on reload or close; copy it first.
- Requires WebAssembly, module Workers, and `DecompressionStream` support.
- The MSIME engine is a third-party dependency under **GPL-3.0-only**; see its [source and notices](https://github.com/metasequoiaime/msime/tree/develop/packages/web-engine). It is fetched from the CDN and is not bundled in this repository.

## Validation status

The page's JavaScript passed Node's syntax check. Browser checks of the deployed site confirmed engine initialization, `nihao` → `你好`, character counting, and the Copy button's success feedback. Clipboard contents could not be independently verified by the browser automation interface.
