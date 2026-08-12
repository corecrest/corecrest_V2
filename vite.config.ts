import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sitemap from 'vite-plugin-sitemap';

const blogSlugs = [
  'future-digital-transformation-rwanda',
  'custom-software-benefits',
  'how-to-choose-web-developer-rwanda',
  'signs-your-business-needs-automation',
  'website-vs-whatsapp-for-smes-rwanda',
  'what-is-it-advisory-rwanda',
  'measure-website-roi-rwanda',
  'when-does-your-business-need-custom-web-app',
];

const FUNCTION_PATH = '/.netlify/functions/send-notification';

/**
 * Runs the notification function during `npm run dev` so the forms work locally
 * without Netlify CLI. The env values stay in the Node process — they are read
 * here and passed to the handler, never injected into the client bundle.
 */
function notificationDevServer(env: Record<string, string>): Plugin {
  return {
    name: 'notification-dev-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(FUNCTION_PATH, async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);

        res.setHeader('Content-Type', 'application/json');
        try {
          const { handleSubmission } = await server.ssrLoadModule('/server/send-notification.ts');
          const result = await handleSubmission(JSON.parse(Buffer.concat(chunks).toString() || '{}'), env);
          res.statusCode = result.status;
          res.end(JSON.stringify(result.body));
        } catch (error) {
          console.error('[dev] notification handler failed:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Notification handler failed' }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Prefix '' loads unprefixed vars too. They are only handed to the dev
  // middleware above — do not pass them to `define`, or they land in the bundle.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      sitemap({
        hostname: 'https://corecrest.tech',
        dynamicRoutes: blogSlugs.map((slug) => `/blog/${slug}`),
        exclude: ['/404'],
        generateRobotsTxt: false,
      }),
      notificationDevServer(env),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  };
});
