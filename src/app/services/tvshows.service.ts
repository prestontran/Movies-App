import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TvShow, TvShowCredits, TvShowDto, TvShowImages, TvShowVideoDto } from '../models/tvshows';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {
  baseUrl: string = 'https://api.themoviedb.org/3/';
  apiKey: string = '3cfd6afbf8e3effbefd0ddcdaecbf03d';

  constructor(private http: HttpClient) {}

  getTvShows(type: string = 'popular', count: number = 12) {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getTvShow(id: string) {
    return this.http.get<TvShow>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getTvShowVideos(id: string) {
    return this.http
      .get<TvShowVideoDto>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getTvShowsByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<TvShowDto>(
        `${this.baseUrl}/discover/tv?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowImages(id: string) {
    return this.http.get<TvShowImages>(`${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`);
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvShowCredits>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`);
  }

  getTvShowsRelated(id: string) {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http
      .get<TvShowDto>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
