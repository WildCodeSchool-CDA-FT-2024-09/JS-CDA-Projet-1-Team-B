import { useLastFilmsQuery } from "../generated/graphql-types";

export default function LastFilms() {
  const { data, loading, error } = useLastFilmsQuery();
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="flex mt-10 ml-10 justify-around w-full ">
      {data?.lastFilms?.map((film) => (
        <div key={film.id} className="flex-col  ">
          <img
            src={
              film.posterPath
                ? `${basePosterUrl}${film.posterPath}`
                : "https://www.pexels.com/fr-fr/photo/bande-de-film-en-spirale-65128/"
            }
            className="w-64 h-64 object-cover"
            alt="Visuel montrant l'affiche du film {film.title}"
          />
          <h2
            className="text-white text-center p-2 text-2xl font-semibold"
            style={{ textShadow: "1px 1px 2px #000" }}
          >
            {film.title || "Titre"}
          </h2>
        </div>
      ))}
      ,
    </section>
  );
}
