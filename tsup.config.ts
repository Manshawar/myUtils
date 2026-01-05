import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/bin/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  outDir: 'lib/bin',
  external: ['simple-git']
})