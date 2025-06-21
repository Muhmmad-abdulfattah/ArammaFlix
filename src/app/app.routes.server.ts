import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'movie/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
    
      return [];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
