import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const browser = await chromium.launch();
let page;
try {
  const context = await browser.newContext({ offline: true });
  page = await context.newPage();
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(30000);
  const external = [];
  await page.route(/^https?:/, route => { external.push(route.request().url()); return route.abort(); });
  page.on('pageerror', error => console.error('PAGE ERROR', error.message));
  page.on('console', message => { if (message.type() === 'error') console.error('BROWSER ERROR', message.text().slice(0,2000)); });
  await page.goto(pathToFileURL(path.resolve('offline-package/Chinese-Typing-Desk-Offline.html')).href);
  await page.waitForFunction(() => ['ready','error'].includes(document.querySelector('#status')?.dataset.state), null, {timeout:120000});
  assert.equal(await page.locator('#status').getAttribute('data-state'), 'ready', await page.locator('#status').textContent());
  assert.equal(await page.locator('html').getAttribute('lang'), 'zh-CN');
  assert.equal(await page.locator('.download').isVisible(), false);
  await page.locator('#writing').pressSequentially('nihao', {delay:100});
  await page.getByText('你好', {exact:false}).last().waitFor();
  await page.locator('#writing').press('Space');
  await page.waitForFunction(() => document.querySelector('#writing').value === '你好');
  await page.locator('#locale').click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.equal(await page.locator('#copy').textContent(), 'Copy text');
  assert.equal(await page.locator('#writing').inputValue(), '你好');
  await page.locator('#locale').click();
  assert.equal(await page.locator('#copy').textContent(), '复制文字');
  await page.locator('#copy').click();
  const feedback = await page.locator('#feedback').textContent();
  assert.match(feedback, /已复制|文字已选中/);
  assert.deepEqual(external, [], 'Offline typing must not request any HTTP resources');
  await page.screenshot({path:'offline-verified.png',fullPage:true});
  console.log('PASS: file:// offline launch, Pinyin conversion, Chinese/English switch, preserved text, copy feedback, zero HTTP requests.');
} catch (error) {
  if (page) console.error('OFFLINE STATE', await page.evaluate(() => ({ status:document.querySelector('#status')?.textContent, value:document.querySelector('#writing')?.value, text:document.body.innerText.slice(-2000) })));
  throw error;
} finally { await browser.close(); }
