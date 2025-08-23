import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (/\.(ts|js|tsx|jsx|mjs|cjs)$/.test(entry)) {
      files.push(fullPath);
    }
  }
  return files;
}

const root = join(process.cwd(), 'src');
const files = walk(root);
const warnings = [];
const regex = /import\.meta\.env\.([A-Z0-9_]+)/g;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const variable = match[1];
    if (!variable.startsWith('VITE_')) {
      warnings.push({ file, variable });
    }
  }
}

if (warnings.length) {
  console.error('Found non-prefixed environment variables:');
  for (const w of warnings) {
    console.error(`  ${w.file}: ${w.variable}`);
  }
  process.exit(1);
} else {
  console.log('All environment variables are properly prefixed with VITE_');
}
