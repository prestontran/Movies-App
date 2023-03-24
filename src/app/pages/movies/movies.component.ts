import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { mapMovieToItem, Movie } from '../../models/movies';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Item } from '../../components/item/item';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Item[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private moviesServices: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesServices.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies.map((Movies) => mapMovieToItem(Movies));
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesServices.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies.map((Movies) => mapMovieToItem(Movies));
    });
  }

  paginate(event: any) {
    const pageNumber: number = event.page + 1;

    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
