// esbuild.config.js
import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  outdir: 'dist',
  sourcemap: true,
  target: ['node20'],
  format: 'cjs',
  outExtension: { '.js': '.cjs' },
  external: ['pg', 'express', 'fs', 'https', 'path'],
  logLevel: 'info',
}).catch(() => process.exit(1));
