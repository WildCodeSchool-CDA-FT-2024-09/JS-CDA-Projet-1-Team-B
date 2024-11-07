import { useTrendyFilmsQuery } from "../generated/graphql-types";
import { Link } from "react-router-dom";

export default function CarousselTrendyFilms() {
  const { data, loading, error } = useTrendyFilmsQuery();
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="carousel carousel-center p-10 bg-373D41 overflow-x-auto flex-wrap md:flex-nowrap">
      {data?.trendyFilms?.map((film) => (
        <Link to={`/films/${film.id}`} key={film.id} className="flex-col">
          <div key={film.id} className="-mr-6">
            <div
              className="carousel-item relative hover:z-10 transition-transform duration-300"
              style={{
                transform: "scale(0.9)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div
                className="absolute w-full h-full bg-bloodRed rounded-2xl"
                style={{ bottom: "-1.7rem", left: "-10px" }}
              ></div>

              <img
                src={
                  film.posterPath
                    ? `${basePosterUrl}${film.posterPath}`
                    : "https://www.pexels.com/fr-fr/photo/bande-de-film-en-spirale-65128/"
                }
                style={{
                  transform: "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                className="w-[26rem] h-[26rem] mt-5 object-cover rounded-2xl shadow-lg border-2 border-white relative transition-transform duration-300 hover:scale-110"
                alt={`Visuel montrant l'affiche du film ${film.title}`}
              />
            </div>
            <h2
              className="mt-4 w-full text-white text-center p-2 text-2xl
            font-semibold"
              style={{ textShadow: "1px 1px 2px #000" }}
            >
              {film.title || "Titre"}
            </h2>
          </div>
        </Link>
      ))}
    </section>
  );
}
