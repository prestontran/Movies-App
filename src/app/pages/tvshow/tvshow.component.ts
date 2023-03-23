import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../components/item/item';
import { TvShow, TvShowCredits, TvShowImages, TvShowVideo } from '../../models/tvshows';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss']
})
export class TvshowComponent {
  tvShow: TvShow | null = null;
  tvShowBanner: Item | null = null;
  tvShowVideos: TvShowVideo[] = [];
  tvShowImages: TvShowImages | null = null;
  tvShowCredits: TvShowCredits | null = null;
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private tvShowsService: TvshowsService) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getTvShow(id);
      this.getTvShowVideos(id);
      this.getTvShowImages(id);
      this.getTvShowCredits(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }

  getTvShow(id: string) {
    this.tvShowsService.getTvShow(id).subscribe((tvShowData) => {
      //this.tvShowBanner = mapTvshowToItem(tvShowData);
      this.tvShow = tvShowData;
    });
  }

  getTvShowVideos(id: string) {
    this.tvShowsService.getTvShowVideos(id).subscribe((tvShowVideosData) => {
      this.tvShowVideos = tvShowVideosData;
    });
  }

  getTvShowImages(id: string) {
    this.tvShowsService.getTvShowImages(id).subscribe((tvShowImagesData) => {
      this.tvShowImages = tvShowImagesData;
    });
  }

  getTvShowCredits(id: string) {
    this.tvShowsService.getTvShowCredits(id).subscribe((tvShowCreditsData) => {
      this.tvShowCredits = tvShowCreditsData;
    });
  }

  getRelatedMovies(id: string) {
    this.tvShowsService.getRelatedMovies(id).subscribe((relatedMoviesData) => {
      this.relatedMovies = relatedMoviesData;
    });
  }
}
