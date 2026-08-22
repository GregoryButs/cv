import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relatieve asset-URL's: dezelfde build werkt op https://user.github.io/,
  // op /cv/ en op elk ander subpad, zonder base opnieuw te zetten.
  base: './',
  build: {
    rollupOptions: {
      input: {
        // v1: het editorial ontwerp dat exact twee A4-pagina's print
        main: resolve(__dirname, 'index.html'),
        // v2: het donkere venster-ontwerp (scherm-ervaring)
        v2: resolve(__dirname, 'v2.html'),
      },
    },
  },
});
