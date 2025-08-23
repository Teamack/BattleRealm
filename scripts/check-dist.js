import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
if (/\/src\/|\.ts/.test(html)) {
  console.error('Deploy failed: unminified source files referenced in HTML.');
  process.exit(1);
}
