import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relatieve asset-URL's: dezelfde build werkt op https://user.github.io/,
  // op /cv/ en op elk ander subpad, zonder base opnieuw te zetten.
  base: './',
});
