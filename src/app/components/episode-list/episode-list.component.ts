import { Component, signal, effect, inject } from '@angular/core';
import { EpisodeService, Episode } from '../../services/episode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./episode-list.component.css'], // ✅ Import del CSS actualizado
  template: `
    <div class="container">
      <h1>Rick and Morty - Episodios</h1>

      <input 
        [(ngModel)]="filterText" 
        placeholder="Buscar episodio..." 
        class="search-input" 
      />

      <div *ngIf="error()" class="error">
        ❌ Error al cargar los episodios: {{ error() }}
      </div>

      <div *ngIf="!error()">
        <div *ngFor="let ep of episodes()" class="episode-card">
          <h2>{{ ep.name }}</h2>
          <p><strong>Episode:</strong> {{ ep.episodeCode }}</p>
          <p><strong>Air Date:</strong> {{ ep.airDate }}</p>
        </div>

        <div class="pagination">
          <button (click)="prev()" [disabled]="page() === 1">◀ Anterior</button>
          <span>Página: {{ page() }}</span>
          <button (click)="next()">Siguiente ▶</button>
        </div>
      </div>
    </div>
  `,
})
export class EpisodeListComponent {
  page = signal(1);
  episodes = signal<Episode[]>([]);
  error = signal<string | null>(null);
  filterText = '';

  private episodeService = inject(EpisodeService);

  constructor() {
    effect(() => {
      this.error.set(null);  // 🔍 Limpia el error en cada nueva llamada
      console.log("Consultando API para la página:", this.page());
      this.episodeService.getEpisodes(this.page()).subscribe({
        next: (res) => {
          console.log("Respuesta de la API:", res);
          this.episodes.set(res.results);
        },
        error: (err) => {
          console.error("Error al cargar episodios:", err.message);
          this.error.set("No se pudo conectar con la API. Verifica la conexión.");
        },
      });
    });
  }

  next() {
    this.page.update((v) => v + 1);
  }

  prev() {
    this.page.update((v) => Math.max(1, v - 1));
  }
}
