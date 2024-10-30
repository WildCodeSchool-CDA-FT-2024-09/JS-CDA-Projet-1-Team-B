import { useQuery } from "@apollo/client";
import { GET_FILM_BY_ID } from "../schema/searchFilmById";

const FilmDetail = () => {
  // Hardcode the film ID
  const hardcodedFilmId = 1; // Replace this with the desired film ID

  const { loading, error, data } = useQuery(GET_FILM_BY_ID, {
    variables: { id: hardcodedFilmId }, // Use the hardcoded film ID
  });

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const film = data.getFilmById;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{film.title}</h1>
      {film.posterPath && (
        <img
          src={film.posterPath}
          alt={film.title}
          className="w-full h-auto rounded-lg mb-4"
        />
      )}
      <div className="space-y-2">
        <p>
          <strong className="font-semibold">Overview:</strong> {film.overview}
        </p>
        <p>
          <strong className="font-semibold">Release Date:</strong>{" "}
          {film.releaseDate}
        </p>
        <p>
          <strong className="font-semibold">Popularity:</strong>{" "}
          {film.popularity}
        </p>
        <p>
          <strong className="font-semibold">Vote Average:</strong>{" "}
          {film.voteAverage}
        </p>
        <p>
          <strong className="font-semibold">Vote Count:</strong>{" "}
          {film.voteCount}
        </p>
        <p>
          <strong className="font-semibold">Original Language:</strong>{" "}
          {film.originalLanguage}
        </p>
        <p>
          <strong className="font-semibold">Actors:</strong> {film.actors}
        </p>
        <p>
          <strong className="font-semibold">Director:</strong> {film.director}
        </p>
      </div>
    </div>
  );
};

export default FilmDetail;
