export interface Film {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  releaseDate: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  posterPath: string | null;
  backdropPath: string | null;
  originalLanguage: string;
  adult: boolean;
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
