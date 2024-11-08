import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CarousselTrendyFilms from "../components/CarrousselTrendyFilms";
import DisplayFilms from "../components/DisplayFilms";
import {
  Criteria,
  useFrenchFilmsQuery,
  useGetCategoryByIdQuery,
  useLastFilmsQuery,
  useSearchFilmsQuery,
} from "../generated/graphql-types";

export default function HomePage() {
  // Utiliser un état pour déclencher la recherche
  const [triggerSearch, setTriggerSearch] = useState(false);
  const location = useLocation(); // Hook pour récupérer l'objet location
  const queryParams = new URLSearchParams(location.search); // Récupérer les query params
  const searchTerm = queryParams.get("search") || "";
  const searchType = queryParams.get("type") || "title";
  const category = queryParams.get("category") || "";
  const selectedDecade = queryParams.get("decade") || "";

  // Convertir le string en type Criteria, avec "title" comme valeur par défaut
  const searchBy: Criteria = (Object.values(Criteria) as string[]).includes(
    searchType)
    ? (searchType as Criteria)
    : Criteria.Title;

  const { data, loading, error } = useSearchFilmsQuery({
    variables: {
      searchTerm: searchTerm,
      searchBy: searchBy,
      category: category ? parseInt(category) : 0,
      decade: selectedDecade ? parseInt(selectedDecade) : 0,
    },
    skip: !triggerSearch,
  });

  useEffect(() => {
    if (searchTerm.length > 0 || category || selectedDecade) {
      setTriggerSearch(true);
    } else {
      setTriggerSearch(false);
    }
  }, [searchTerm, searchBy, category, selectedDecade]);

  const { data: dataLastFilms } = useLastFilmsQuery();
  const { data: dataFrenchFilms } = useFrenchFilmsQuery();
  const { data: dataCategory } = useGetCategoryByIdQuery({
    variables: { id: category ? parseInt(category) : 0 },
  });

  function title(): string {
    if (searchTerm && searchBy === Criteria.Title) {
      return `Résultats de recherche pour le titre "${searchTerm}"`;
    } else if (searchTerm && searchBy === Criteria.Actor) {
      return `Résultats de recherche pour l'acteur "${searchTerm}"`;
    } else if (searchTerm && searchBy === Criteria.Director) {
      return `Résultats de recherche pour le réalisateur "${searchTerm}"`;
    } else if (!searchTerm && category) {
      return `Categorie : ${dataCategory?.getCategoryById?.name}`;
    } else if (!searchTerm && selectedDecade) {
      return `Décennie : ${selectedDecade}`;
    } else {
      return "";
    }
  }

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
        <DisplayFilms titleh2={title()} data={data.searchFilms} />
      )}
      {data?.searchFilms.length === 0 && searchTerm && <p>Aucun film trouvé</p>}
    </main>
  );
}
