export interface Film {
  id: number;
  tmdb_id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  original_language: string;
  adult: boolean;
  genre_ids: number[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  gender: number;
  profilePath: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  gender: number;
  profilePath: string | null;
}

export interface FilmCredits {
  filmId: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Genre {
  id: number;
  name: string;
}
