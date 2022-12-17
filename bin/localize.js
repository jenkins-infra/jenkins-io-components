import {readFileSync, readdirSync, writeFileSync} from 'fs';
import {basename, dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {exec} from 'node:child_process';
import {chdir} from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));

chdir(join(__dirname, '..'))

exec('crowdin upload')
exec('npx lit-localize extract')
exec('crowdin download')

console.log("loading localize")
const filename = join(__dirname, '..', 'lit-localize.json');
const a = JSON.parse(readFileSync(filename));
a.targetLocales = readdirSync(join(__dirname, '..', 'xliff')).filter(a => a.endsWith('.xlf')).map(a => basename(a, '.xlf'));
console.log("writing localize")
writeFileSync(filename, JSON.stringify(a, null, 2));
console.log("done")

exec('npx lit-localize build')
