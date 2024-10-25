import { useTrendyFilmsQuery } from "../generated/graphql-types";
// import "./CarrousselTrendyFilms.css";

export default function CarousselTrendyFilms() {
  const { data, loading, error } = useTrendyFilmsQuery();
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="carousel carousel-center p-10 bg-373D41 overflow-x-auto">
      {data?.trendyFilms?.map((film, index) => (
        <div>
          <div
            key={index}
            className="carousel-item relative hover:z-10 transition-transform duration-300"
            style={{
              transform: "scale(0.9)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <div
              className="absolute w-full h-full bg-red-500 rounded-lg"
              style={{ bottom: "-10px", left: "-10px" }}
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
              className="w-[26rem] h-[26rem] object-cover rounded-lg shadow-lg border-2 border-white relative transition-transform duration-300 hover:scale-110"
              alt="Film Poster"
            />
          </div>
          <div
            className="mt-4 w-full text-white text-center p-2 text-2l font-semibold"
            style={{ textShadow: "1px 1px 2px #000" }}
          >
            {film.title || "Titre"}
          </div>
        </div>
      ))}
    </div>
  );
}
