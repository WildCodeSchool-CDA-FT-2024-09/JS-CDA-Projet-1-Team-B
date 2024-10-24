import { useTrendyFilmsQuery } from "../generated/graphql-types";
import "./CarrousselTrendyFilms.css";

export default function CarousselTrendyFilms() {
  const { data, loading, error } = useTrendyFilmsQuery();
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="carousel carousel-center p-10 bg-373D41 overflow-x-auto">
      {data?.trendyFilms?.map((film, index) => (
        <div
          key={index}
          className="carousel-item hover:scale-105 transition-transform duration-300 min-w-[200px]"
        >
          <img
            src={
              film.posterPath
                ? `${basePosterUrl}${film.posterPath}`
                : "https://placeimg.com/200/300/tech"
            }
            style={{ borderBottomWidth: '2rem' }}
            className="w-[26rem] h-[26rem] object-cover rounded-lg border-b-16 border-red-500 shadow-lg"
            alt="Film Poster"
          />
        </div>
      ))}
    </div>
  );
}
