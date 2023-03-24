import { Component } from '@angular/core';
import { mapMovieToItem } from 'src/app/models/movies';
import { mapTvShowToItem } from 'src/app/models/tvshows';
//import { Movie } from '../../models/movies';
import { Item } from '../../components/item/item';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  popularMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTvShows: Item[] = [];

  constructor(private moviesService: MoviesService, private tvShowsService: TvshowsService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies.map((movie) => mapMovieToItem(movie));
      //console.log(this.popularMovies);
    });

    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies.map((movie) => mapMovieToItem(movie));
      //console.log(this.topRatedMovies);
    });

    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies.map((movie) => mapMovieToItem(movie));
      //console.log(this.upcomingMovies);
    });

    this.tvShowsService.getTvShows('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
      //console.log(this.popularTvShows);
    });
  }
}
