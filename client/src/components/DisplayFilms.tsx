import { Link } from "react-router-dom";

type DisplayFilmsProps = {
  data: {
    id: string | undefined;
    posterPath?: string | null | undefined;
    title: string | undefined;
  }[];
  titleh2: string;
};
export default function DisplayFilms({ data, titleh2 }: DisplayFilmsProps) {
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";
  return (
    <section>
      <h2 className="text-white mt-6 mb-10 flex md:justify-start justify-center md:ml-20 p-2 text-3xl font-semibold">
        {titleh2}
      </h2>
      <section>
        <section className="flex mt-10 justify-center flex-wrap md:flex-wrap md:ml-20 md:justify-between md:mr-20">
          {data?.map((film) => (
            <Link
              to={`/films/${film.id}`}
              key={film.id}
              className="flex-col w-64"
            >
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
        </section>
      </section>
    </section>
  );
}
