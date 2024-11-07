import CarousselTrendyFilms from "../components/CarrousselTrendyFilms";
import DisplayFilms from "../components/DisplayFilms";
// import LastFilms from "../components/LastFilms";
// import FrenchFilms from "../components/FrenchFilms";
import { useLocation } from "react-router-dom";
import {
  useSearchFilmsQuery,
  useLastFilmsQuery,
  useFrenchFilmsQuery,
} from "../generated/graphql-types";
import { Criteria } from "../generated/graphql-types";
import { useEffect, useState } from "react";

export default function HomePage() {
  const location = useLocation(); // Hook pour récupérer l'objet location
  const queryParams = new URLSearchParams(location.search); // Récupérer les query params
  const searchTerm = queryParams.get("search") || "";
  const searchType = queryParams.get("type") || "title";
  const category = queryParams.get("category") || "";

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
      category: category ? parseInt(category) : 0,
    },
    skip: !triggerSearch,
  });

  useEffect(() => {
    if (searchTerm.length > 0 || category) {
      setTriggerSearch(true);
    } else {
      setTriggerSearch(false);
    }
  }, [searchTerm, searchBy, category]);

  const { data: dataLastFilms } = useLastFilmsQuery();
  const { data: dataFrenchFilms } = useFrenchFilmsQuery();

  return (
    <main className="block">
      <h1 className="mt-10 flex justify-center text-3xl text-bloodRed font-bold md:text-4xl md:ml-10 md:mt-10">
        TENDANCES
      </h1>
      <section className="flex justify-center">
        <CarousselTrendyFilms />
      </section>
      <section>
        {" "}
        <DisplayFilms
          titleh2="Les Derniers Arrivés"
          data={dataLastFilms?.lastFilms || []}
        />
        <DisplayFilms
          titleh2="Les Films Français"
          data={dataFrenchFilms?.FrenchFilms || []}
        />
      </section>
      {loading && <p>Chargement...</p>}

      {error && <p>Erreur : {error.message}</p>}

      {data && data.searchFilms.length > 0 && (
        <ul>
          {data?.searchFilms.map((film) => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
      )}

      {data?.searchFilms.length === 0 && searchTerm && <p>Aucun film trouvé</p>}
    </main>
  );
}
