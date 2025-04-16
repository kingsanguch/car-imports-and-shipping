import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

/**
 * Create a CommonEngine instance to handle SSR rendering.
 */
const engine = new CommonEngine();

/**
 * This function handles requests for both Netlify Functions and local testing.
 */
export async function netlifyCommonEngineHandler(request: Request): Promise<Response> {
  // Optional: Handle custom API routes before rendering Angular
  // const url = new URL(request.url);
  // if (url.pathname.startsWith('/api')) {
  //   return new Response(JSON.stringify({ message: 'API response' }), {
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

  // Render the Angular application via SSR
  return await render(engine);
}

/**
 * Angular CLI & other environments use this as a universal request handler.
 */
export const reqHandler = netlifyCommonEngineHandler;
