import { Routes } from '@angular/router';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';

export const routes: Routes = [
  {
    path: '',
    component: EpisodeListComponent, // Página principal
  },
  {
    path: '**',
    redirectTo: '', // Redirigir cualquier ruta desconocida a la principal
  },
];
