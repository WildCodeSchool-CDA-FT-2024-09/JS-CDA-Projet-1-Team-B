import { useGetFilmByIdQuery } from "../generated/graphql-types";

const FilmDetail = () => {
  // Hardcode the film ID
  const hardcodedFilmId = 1; // Replace this with the desired film ID
  const basePosterUrl = "https://image.tmdb.org/t/p/original/"; // Base URL for TMDB posters

  const { loading, error, data } = useGetFilmByIdQuery({
    variables: { getFilmByIdId: hardcodedFilmId },
  });

  // Handling loading and error states
  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const film = data?.getFilmById;

  if (!film) return <p>Film not found</p>;

  return (
    <main className="flex flex-col items-center p-4 relative">
      {film.posterPath && (
        <div className="relative w-[30rem] h-[45rem] mt-5 mb-10">
          <div
            className="absolute w-full h-full bg-bloodRed rounded-2xl"
            style={{
              bottom: "-1rem",
              left: "-1rem",
              zIndex: 0,
            }}
          ></div>
          <img
            src={`${basePosterUrl}${film.posterPath}`}
            alt={`Film poster of ${film.title}`}
            className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white relative"
            style={{ zIndex: 1 }}
          />
        </div>
      )}
      <div className="w-[70%] space-y-4 border border-bloodRed rounded p-6 mt-6 text-white text-left">
        <h1 className="text-2xl font-bold mb-4">{film.title}</h1>
        <p>
          <strong className="font-semibold">Overview:</strong> {film.overview}
        </p>
        <p>
          <strong className="font-semibold">Release Date:</strong>{" "}
          {film.releaseDate}
        </p>
        <p>
          <strong className="font-semibold">Actors:</strong> {film.actors}
        </p>
        <p>
          <strong className="font-semibold">Director:</strong> {film.director}
        </p>
        <p>
          <strong className="font-semibold">Popularity:</strong>{" "}
          {film.popularity}
        </p>
        <p>
          <strong className="font-semibold">Original Language:</strong>{" "}
          {film.originalLanguage}
        </p>
      </div>
    </main>
  );
};

export default FilmDetail;
