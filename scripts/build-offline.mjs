import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const packageRoot = path.resolve(process.argv[2] || '.engine/package');
const output = path.resolve('offline-package');
await mkdir(output, { recursive: true });
async function bundle(file, format) {
  const result = await build({ entryPoints:[path.join(packageRoot,file)], bundle:true, write:false, format, platform:'browser', target:'es2022', logLevel:'silent' });
  return result.outputFiles[0].text;
}
const manifest = await import(pathToFileURL(path.join(packageRoot, 'assets.js')).href);
const { files } = manifest;
if (!files?.wasm || !files?.pinyin) throw new Error('Expected Pinyin assets missing');
async function asset(file, wasm = false) {
  if (!file) return null;
  const bytes = await readFile(path.join(packageRoot, 'assets', file.name));
  if (bytes.length !== file.size) throw new Error('Asset size mismatch: ' + file.name);
  return { ...file, url: 'data:' + (wasm ? 'application/wasm' : 'application/gzip') + ';base64,' + bytes.toString('base64') };
}
const embedded = {
  module: 'data:text/javascript;base64,' + Buffer.from(await bundle('index.js','esm')).toString('base64'),
  workerCode: await bundle('worker.js','iife'),
  assets: { wasm: await asset(files.wasm, true), db: await asset(files.pinyin), model: await asset(files.model) }
};
const online = await readFile('public/index.html', 'utf8');
const marker = 'const offline = null; /* OFFLINE_PACKAGE */';
if (!online.includes(marker)) throw new Error('Offline injection marker missing');
const offline = online.replace(marker, 'const offline = ' + JSON.stringify(embedded).replace(/</g, '\\u003c') + ';');
await writeFile(path.join(output, 'Chinese-Typing-Desk-Offline.html'), offline);
await copyFile('offline/README.txt', path.join(output, 'README.txt'));
await copyFile(path.join(packageRoot, 'LICENSE'), path.join(output, 'MSIME-LICENSE.txt'));
await copyFile(path.join(packageRoot, 'assets', 'NOTICE.md'), path.join(output, 'MSIME-NOTICE.md'));
// Include the published JavaScript sources alongside the embedded runtime.
await mkdir(path.join(output, 'engine-source'), {recursive:true});
for (const file of await readdir(packageRoot)) {
  if (/\.(js|ts)$/.test(file) || file === 'package.json') {
    await copyFile(path.join(packageRoot, file), path.join(output, 'engine-source', file));
  }
}
const metadata = JSON.parse(await readFile('.engine/package-metadata.json', 'utf8'));
let sourceRef = metadata.gitHead;
if (!sourceRef && metadata.dist?.attestations?.url) {
  const attestations = await fetch(metadata.dist.attestations.url).then(r => {
    if (!r.ok) throw new Error('Cannot read npm provenance: ' + r.status);
    return r.json();
  });
  for (const entry of attestations.attestations ?? []) {
    const payload = entry.bundle?.dsseEnvelope?.payload;
    if (!payload) continue;
    const statement = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    const dependencies = statement.predicate?.buildDefinition?.resolvedDependencies ?? [];
    const upstream = dependencies.find(d => d.uri?.startsWith('git+https://github.com/metasequoiaime/msime@'));
    if (upstream?.digest?.gitCommit) sourceRef = upstream.digest.gitCommit;
  }
}
if (!/^[a-f0-9]{40}$/i.test(sourceRef || '')) throw new Error('Published package has no source revision; cannot package corresponding engine source');
const response = await fetch('https://codeload.github.com/metasequoiaime/msime/tar.gz/' + sourceRef);
if (!response.ok) throw new Error('Cannot retrieve matching MSIME source: ' + response.status);
await writeFile(path.join(output, 'MSIME-source.tar.gz'), Buffer.from(await response.arrayBuffer()));
await writeFile(path.join(output, 'SOURCE.txt'), 'MSIME npm version: 0.2.0\nSource revision: ' + sourceRef + '\nhttps://github.com/metasequoiaime/msime/tree/' + sourceRef + '\n');
console.log('Built self-contained offline HTML (' + Math.round(Buffer.byteLength(offline) / 1024 / 1024) + ' MiB), licenses, and matching engine source.');
