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
        // Hoofdpagina: het donkere venster-ontwerp (scherm-ervaring)
        main: resolve(__dirname, 'index.html'),
        // Zusterpagina: het editorial ontwerp dat exact twee A4-pagina's print
        print: resolve(__dirname, 'print.html'),
      },
    },
  },
});
