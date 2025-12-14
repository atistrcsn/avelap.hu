import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@strapi/icons/symbols': path.resolve(__dirname, './symbols.js'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@retikolo/drag-drop-content-types',
      'strapi-plugin-config-sync',
      '@strapi/plugin-users-permissions',
      '@strapi/strapi-admin',
    ],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  esbuild: {
    loader: 'jsx',
    include: /\/@retikolo\/drag-drop-content-types\/.*\.js$/,
    exclude: [],
  },
  define: {
    'process.env': process.env,
  },
  build: {
    rollupOptions: {
      external: (id) => {
        return id.includes('@strapi/icons/symbols');
      },
      output: {
        // Handle CommonJS modules
        exports: 'named',
      },
    },
    // Exclude problematic files from bundling
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});