import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'public', 'config.yml');
const targetPath = path.join(projectRoot, 'public', 'config.build.json');

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing config source: ${sourcePath}`);
}

const text = fs.readFileSync(sourcePath, 'utf8');
const data = load(text);
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
console.log(`Generated ${path.relative(projectRoot, targetPath)}`);
