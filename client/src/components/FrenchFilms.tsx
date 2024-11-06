import { useFrenchFilmsQuery } from "../generated/graphql-types";
import { Link } from "react-router-dom";

export default function LastFilms() {
  const { data, loading, error } = useFrenchFilmsQuery();
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="flex mt-10 justify-center w-full flex-wrap md:flex-nowrap md:ml-20 md:justify-between">
      {data?.FrenchFilms?.map((film) => (
        <Link to={`/films/${film.id}`} key={film.id} className="flex-col w-64">
          <div key={film.id} className="flex-col overflow-hidden">
            <img
              src={
                film.posterPath
                  ? `${basePosterUrl}${film.posterPath}`
                  : "https://www.pexels.com/fr-fr/photo/bande-de-film-en-spirale-65128/"
              }
              className="w-64 h-64 object-cover rounded-2xl border-white border"
              alt={`Visuel montrant l'affiche du film ${film.title}`}
            />
            <h2 className="text-white text-center p-2 text-xl mb-5 font-semibold shadow-lg md:text-2xl md:mb-0 ">
              {film.title || "Titre"}
            </h2>
          </div>
        </Link>
      ))}
      ,
    </section>
  );
}
