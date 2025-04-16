import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

/**
 * Create a CommonEngine instance to handle SSR rendering.
 */
const engine = new CommonEngine();

/**
 * This function handles requests for both Netlify Functions and local testing.
 * We define `getPrerenderParams` to provide the dynamic parameters during prerendering.
 */
async function getPrerenderParams(path: string) {
  const params: { id: string }[] = [];
  
  // For dynamic routes, such as 'admin/edit-vehicle/:id', we generate an array of valid params.
  if (path.startsWith('/admin/edit-vehicle/')) {
    const vehicleIds = ['1', '2', '3']; // Replace with actual vehicle IDs you want to prerender
    for (let id of vehicleIds) {
      params.push({ id });
    }
  }
  
  if (path.startsWith('/admin/edit-spare-part/')) {
    const sparePartIds = ['101', '102', '103']; // Replace with actual spare part IDs
    for (let id of sparePartIds) {
      params.push({ id });
    }
  }

  return params;
}

/**
 * This function handles requests for both Netlify Functions and local testing.
 */
export async function netlifyCommonEngineHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  
  // Check for routes needing prerendering
  if (url.pathname.startsWith('/admin/edit-vehicle/') || url.pathname.startsWith('/admin/edit-spare-part/')) {
    // Get prerender params dynamically
    const params = await getPrerenderParams(url.pathname);
    
    // Flatten the params into key-value pairs
    const searchParams = new URLSearchParams();
    params.forEach(param => {
      searchParams.append('id', param.id);  // Append each id as a separate query parameter
    });

    // Create the prerendered URL with query string
    const prerenderedUrl = `${url.pathname}?${searchParams.toString()}`;
    
    // Pass the prerendered URL as part of an object
    return render({ engine, url: prerenderedUrl });
  }
  
  // Render the Angular application via SSR, passing as an object
  return render({ engine, url: request.url });
}

/**
 * Angular CLI & other environments use this as a universal request handler.
 */
export const reqHandler = netlifyCommonEngineHandler;
