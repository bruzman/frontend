import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Episode {
  id: number;
  name: string;
  episodeCode: string;
  airDate: string;
}

export interface EpisodeResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Episode[];
}

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'https://localhost:32769/api/episodes';
  private http = inject(HttpClient);

  getEpisodes(page: number): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${this.apiUrl}?page=${page}`);
  }
}
