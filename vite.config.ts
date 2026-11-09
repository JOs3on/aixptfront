import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

/**
 * Mounts the Vercel serverless function at /api/chat during `vite dev`, so the
 * demo works locally without installing the Vercel CLI. In production, Vercel
 * runs `api/chat.ts` directly.
 */
function localApiPlugin(): Plugin {
  return {
    name: 'aixpt-local-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const mod = await server.ssrLoadModule('/api/chat.ts');
          await mod.default(req, res);
        } catch (error) {
          console.error('[vite] /api/chat error:', error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
          }
          res.end(
            JSON.stringify({
              error: 'dev_api_error',
              reply: 'Le démo local a rencontré une erreur, réessayez dans quelques secondes.',
            }),
          );
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Vite only exposes VITE_* variables to the client. The API function needs
  // the server-side Gemini key, so copy the full .env into process.env in dev.
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ['GEMINI_API_KEY', 'GEMINI_MODEL', 'GEMINI_MODEL_FALLBACKS']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  }

  return {
    plugins: [
      react(),
      localApiPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
      }),
    ],
    server: {
      port: 3123,
      strictPort: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  };
});
