import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genresMovie: Genre[] = [];
  genresTvShow: Genre[] = [];

  constructor(private movieService: MoviesService, private tvShowService: TvshowsService) {}

  ngOnInit(): void {
    this.movieService.getMoviesGenres().subscribe((genresMovieData) => {
      this.genresMovie = genresMovieData;
    });

    this.tvShowService.getTvShowGenres().subscribe((genresTvShowData) => {
      this.genresTvShow = genresTvShowData;
    });
  }
}
