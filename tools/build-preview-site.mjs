import { lstat, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repository = 'https://github.com/tamir39/interface-atlas';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brandFiles = [
  'logo-icon-light.svg', 'logo-icon-dark.svg',
  'logo-icon-black.svg', 'logo-icon-white.svg',
  'logo-horizontal-light.svg', 'logo-horizontal-dark.svg',
  'logo-stacked-light.svg', 'logo-stacked-dark.svg',
  'favicon.svg', 'hero-light.svg', 'hero-dark.svg', 'preview.html',
];

// Keep the deployment deliberately smaller than the knowledge repository.
// New themes must opt in here after their preview is ready to publish.
const files = [
  ['site/index.html', 'index.html'],
  ['site/styles.css', 'styles.css'],
  ['site/search.js', 'search.js'],
  ...brandFiles.map((name) => [`assets/brand/${name}`, `assets/brand/${name}`]),
  ...['editorial', 'swiss', 'precision', 'play', 'botanical', 'blueprint', 'pulse', 'gallery', 'layered'].flatMap((theme) =>
    ['index.html', 'styles.css', 'preview.js'].map((name) => [
      `themes/${theme}/preview/${name}`, `themes/${theme}/preview/${name}`,
    ])),
  ...['glassmorphism', 'neobrutalism', 'claymorphism', 'neumorphism', 'skeuomorphism'].flatMap((style) =>
    ['index.html', 'styles.css', 'preview.js', 'theme-tokens.css', 'theme-tokens.json'].map((name) => [
      `styles/${style}/preview/${name}`, `styles/${style}/preview/${name}`,
    ])),
  ...['vessel-study.png', 'seat-study.png', 'room-study.png'].map((name) => [
    `themes/gallery/preview/assets/${name}`, `themes/gallery/preview/assets/${name}`,
  ]),
];

function inside(parent, child) {
  const relative = path.relative(parent, child);
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

async function checkedFile(sourceRoot, relative) {
  const filename = path.resolve(sourceRoot, relative);
  if (!inside(sourceRoot, filename)) throw new Error(`Path escapes the repository: ${relative}`);
  const entry = await lstat(filename);
  if (!entry.isFile() || entry.isSymbolicLink()) throw new Error(`Expected a regular file: ${relative}`);
  if (!inside(sourceRoot, await realpath(filename))) throw new Error(`File resolves outside the repository: ${relative}`);
  return filename;
}

function localUrl(value) {
  return value && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value);
}

async function rewriteDocumentLinks(html, sourceRelative, sourceRoot) {
  const links = [...html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi)];
  const replacements = new Map();
  for (const [, , value] of links) {
    if (!localUrl(value)) continue;
    const [pathname] = value.split(/[?#]/, 1);
    if (!/\.md$/i.test(pathname)) continue;
    const decoded = decodeURIComponent(pathname);
    const filename = decoded.startsWith('/')
      ? path.resolve(sourceRoot, `.${decoded}`)
      : path.resolve(sourceRoot, path.dirname(sourceRelative), decoded);
    const relative = path.relative(sourceRoot, filename);
    await checkedFile(sourceRoot, relative);
    const encodedPath = relative.split(path.sep).map(encodeURIComponent).join('/');
    replacements.set(value, `${repository}/blob/main/${encodedPath}${value.slice(pathname.length)}`);
  }
  return html.replace(/\bhref\s*=\s*(["'])(.*?)\1/gi, (attribute, quote, value) =>
    replacements.has(value) ? `href=${quote}${replacements.get(value)}${quote}` : attribute);
}

async function checkPublishedLinks(output) {
  for (const [, destination] of files.filter(([, name]) => name.endsWith('.html'))) {
    const html = await readFile(path.join(output, destination), 'utf8');
    for (const [, , value] of html.matchAll(/\b(?:href|src|srcset)\s*=\s*(["'])(.*?)\1/gi)) {
      if (!localUrl(value)) continue;
      // All current srcsets contain one source, without descriptors.
      const url = new URL(value, pathToFileURL(path.join(output, destination)));
      const filename = url.pathname.endsWith('/')
        ? path.join(fileURLToPath(url), 'index.html')
        : fileURLToPath(url);
      if (!inside(output, filename)) throw new Error(`Published link leaves the site: ${destination} -> ${value}`);
      await checkedFile(output, path.relative(output, filename));
    }
  }
}

export async function buildPreviewSite({ sourceRoot = root, output = path.join(sourceRoot, '_site') } = {}) {
  if (Number(process.versions.node.split('.')[0]) < 20) throw new Error('Node.js 20 or newer is required.');
  sourceRoot = await realpath(sourceRoot);
  output = path.resolve(output);
  // Never clear an existing directory. A fresh destination prevents stale or
  // unrelated files from entering the published artifact.
  await mkdir(path.dirname(output), { recursive: true });
  await mkdir(output);
  for (const [source, destination] of files) {
    const filename = await checkedFile(sourceRoot, source);
    let contents = await readFile(filename);
    if (source.endsWith('.html')) contents = await rewriteDocumentLinks(contents.toString('utf8'), source, sourceRoot);
    const target = path.join(output, destination);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, contents, { flag: 'wx' });
  }
  await writeFile(path.join(output, '.nojekyll'), '', { flag: 'wx' });
  await checkPublishedLinks(output);
  console.log(`Built ${files.length + 1} preview files in ${output}`);
  return output;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== '--output' || !args[1])) {
      throw new Error('Usage: node tools/build-preview-site.mjs [--output <fresh-directory>]');
    }
    await buildPreviewSite({ output: args.length ? path.resolve(args[1]) : undefined });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
