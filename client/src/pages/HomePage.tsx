import CarousselTrendyFilms from "../components/CarrousselTrendyFilms";
import LastFilms from "../components/LastFilms";
import { useLocation } from "react-router-dom";
import { useSearchFilmsQuery } from "../generated/graphql-types";
import { Criteria } from "../generated/graphql-types";
import { Film } from "../generated/graphql-types";
import { useEffect, useState } from "react";

export default function HomePage() {
  const location = useLocation(); // Hook pour récupérer l'objet location
  const queryParams = new URLSearchParams(location.search); // Récupérer les query params
  const searchTerm = queryParams.get("search") || "";
  const searchType = queryParams.get("type") || "title";

  // Convertir le string en type Criteria, avec "title" comme valeur par défaut
  const searchBy: Criteria = (Object.values(Criteria) as string[]).includes(
    searchType
  )
    ? (searchType as Criteria)
    : Criteria.Title;

  // Utiliser un état pour déclencher la recherche
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { data, loading, error } = useSearchFilmsQuery({
    variables: {
      searchTerm: searchTerm,
      searchBy: searchBy,
    },
    skip: !triggerSearch, // La requête est lancée uniquement si triggerSearch est true
  });

  useEffect(() => {
    if (searchTerm.length > 0) {
      setTriggerSearch(true);
    }
  }, [searchTerm, searchBy]);

  return (
    <main className="block">
      <h1 className="mt-10 flex justify-center text-3xl text-bloodRed font-bold md:text-3xl md:ml-10 md:mt-6">
        TENDANCES
      </h1>
      <section className="flex justify-center">
        <CarousselTrendyFilms />
      </section>
      <h2 className="text-white mt-6 flex justify-center md:ml-20 p-2 text-2xl font-semibold">
        Les derniers arrivés
      </h2>
      <section className="flex justify-center">
        <LastFilms />
      </section>
      {loading && <p>Chargement...</p>}

      {error && <p>Erreur : {error.message}</p>}

      {data && data.searchFilms.length > 0 && (
        <ul>
          {data.searchFilms.map((film: Film) => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
      )}

      {data?.searchFilms.length === 0 && searchTerm && <p>Aucun film trouvé</p>}
    </main>
  );
}
