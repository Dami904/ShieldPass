// Postinstall patch: neutralizes @napi-rs/simple-git's native-binding requirement.
//
// Nextra's MDX loader (node_modules/nextra/dist/server/loader.js) does
// `await import('@napi-rs/simple-git')` OUTSIDE its own try/catch, purely to read git
// "last modified" timestamps (cosmetic). If the platform-specific native binding isn't
// installed for whatever platform ran `npm install` — a known npm optionalDependencies bug,
// https://github.com/npm/cli/issues/4828 — that raw import throws and takes down the ENTIRE
// prerender build, on every page, regardless of what the page's own content is.
//
// This runs after every `npm install` (see package.json "postinstall") and overwrites the
// installed package's entry point with a stub whose Repository.discover() throws — which
// nextra's loader DOES catch (it just logs "Init git repository failed" and continues
// without timestamps). This removes the native binding as a build-time dependency entirely,
// so it can never matter which platform npm decided to install a binding for.

import { writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, '..', 'node_modules', '@napi-rs', 'simple-git', 'index.js');

if (!existsSync(target)) {
  // Not installed in this environment — nothing to patch.
  process.exit(0);
}

writeFileSync(
  target,
  `// Patched by scripts/patch-simple-git.js (postinstall) — see that file for why.
class Repository {
  static discover() {
    throw new Error('git timestamps disabled (patched by scripts/patch-simple-git.js)');
  }
}
module.exports.Repository = Repository;
`
);

console.log('[patch-simple-git] neutralized @napi-rs/simple-git native binding requirement');
