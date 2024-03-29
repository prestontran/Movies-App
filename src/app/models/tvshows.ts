import { Item } from '../components/item/item';
import { Genre } from './genre';

export interface TvShow {
  backdrop_path: string;
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShowDto {
  page: number;
  results: TvShow[];
  total_results: number;
  total_pages: number;
}

export interface TvShowImages {
  backdrops: {
    file_path: string;
  }[];
}

export interface TvShowVideoDto {
  id: number;
  results: TvShowVideo[];
}

export interface TvShowVideo {
  key: string;
  site: string;
}

export interface TvShowCredits {
  crew: {
    name: string;
    profile_path: string;
  }[];
}

export const mapTvShowToItem = (tvShow: TvShow): Item => {
  return {
    id: tvShow.id,
    title: tvShow.name,
    poster_path: tvShow.poster_path,
    vote_average: tvShow.vote_average,
    backdrop_path: tvShow.backdrop_path,
    vote_count: tvShow.vote_count,
    release_date: tvShow.release_date,
    overview: tvShow.overview,
    routePath: '/tvshow/' + tvShow.id
  };
};
