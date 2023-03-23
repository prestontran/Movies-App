import { Component } from '@angular/core';
import { TvshowsService } from '../../services/tvshows.service';
import { TvShow } from '../../models/tvshows';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent {
  tvshows: TvShow[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private TvshowsServices: TvshowsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvShowsByGenre(genreId, 1);
      } else {
        this.getPagedTvShows(1);
      }
    });
  }

  getPagedTvShows(page: number, searchKeyword?: string) {
    this.TvshowsServices.searchTvShows(page, searchKeyword).subscribe((tvshows) => {
      this.tvshows = tvshows;
    });
  }

  getTvShowsByGenre(genreId: string, page: number) {
    this.TvshowsServices.getTvShowsByGenre(genreId, page).subscribe((tvshows) => {
      this.tvshows = tvshows;
    });
  }

  paginate(event: any) {
    const pageNumber: number = event.page + 1;

    if (this.genreId) {
      this.getTvShowsByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedTvShows(pageNumber, this.searchValue);
      } else {
        this.getPagedTvShows(pageNumber);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedTvShows(1, this.searchValue);
    }
  }
}
