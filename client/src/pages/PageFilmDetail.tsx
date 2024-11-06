// FilmDetail.tsx
import { useParams } from "react-router-dom"; // Import useParams to get route params
import StarRating from "../components/NoteGlobale";
import { useGetFilmByIdQuery } from "../generated/graphql-types";

const FilmDetail = () => {
  // Get the film ID from the URL
  const { id } = useParams<{ id: string }>(); // The film ID is now dynamic from the URL
  const basePosterUrl = "https://image.tmdb.org/t/p/original/"; // Base URL for TMDB posters

  // Fetch film data using the dynamic ID from the URL
  const { loading, error, data } = useGetFilmByIdQuery({
    variables: { getFilmByIdId: parseInt(id!) }, // Convert string to number if necessary
  });

  // Handling loading and error states
  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const film = data?.getFilmById;

  if (!film) return <p>Film not found</p>;

  return (
    <main className="flex flex-col items-center p-4 relative">
      {film.posterPath && (
        <section className="relative w-[30rem] h-[45rem] mt-5 mb-10">
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
        </section>
      )}
      <article className="w-[70%] space-y-4 border border-bloodRed rounded p-6 mt-6 text-white text-left">
        <header>
          <h1 className="text-2xl font-bold mb-4">{film.title}</h1>
        </header>
        <section>
          <p className="mb-4">
            <strong className="font-semibold mr-2">Synopsis:</strong>
            {film.overview}
          </p>
          <p className="mb-4">
            <strong className="font-semibold mr-2">Date de sortie:</strong>
            {film.releaseDate}
          </p>
          <p className="mb-4">
            <strong className="font-semibold mr-2">Casting:</strong>
            {film.actors}
          </p>
          <p className="mb-4">
            <strong className="font-semibold mr-2">Réalisateur:</strong>
            {film.director}
          </p>
          <p className="mb-4">
            <strong className="font-semibold mr-2">Langue originale:</strong>
            {film.originalLanguage}
          </p>
        </section>
        <section className="w-[70%] mt-6">
          <p className="text-lg font-semibold text-white mb-2">
            Note Globale :
          </p>
          <StarRating popularity={film.popularity} />
        </section>
      </article>
    </main>
  );
};

export default FilmDetail;
