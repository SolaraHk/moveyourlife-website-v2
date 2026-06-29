import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawnSync } from 'node:child_process';

// Snapshot the rendered SPA into dist/index.html after every build so crawlers
// get real HTML (see scripts/prerender.mjs). Runs in an isolated child process
// and always exits 0 — a prerender failure can never break `vite build`.
function prerenderSpa() {
  return {
    name: 'prerender-spa',
    apply: 'build',
    closeBundle() {
      const r = spawnSync(process.execPath, ['scripts/prerender.mjs'], { stdio: 'inherit' });
      if (r.status !== 0) console.warn('[prerender] step exited non-zero — SPA build kept');
    }
  };
}

export default defineConfig({
  plugins: [react(), prerenderSpa()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
