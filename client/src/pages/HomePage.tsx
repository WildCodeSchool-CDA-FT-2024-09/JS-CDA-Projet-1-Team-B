import CarousselTrendyFilms from "../components/CarrousselTrendyFilms";
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
    <main>
      <h1 className="mt-6 ml-8 text-2xl text-bloodRed font-bold md:text-3xl">
        TENDANCES
      </h1>
      <section className="flex justify-center">
        <CarousselTrendyFilms />
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
