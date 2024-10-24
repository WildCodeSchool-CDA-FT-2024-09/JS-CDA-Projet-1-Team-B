import { useEffect, useState } from "react";
import { useSearchFilmsQuery } from "../generated/graphql-types";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");

  const { data, loading, error } = useSearchFilmsQuery({
    variables: { title: submittedTerm },
    skip: !submittedTerm, // La requête est ignorée tant qu'il n'y a pas de terme soumis
  });

  // Fonction partagée pour déclencher la recherche
  const triggerSearch = () => {
    if (searchTerm) {
      setSubmittedTerm(searchTerm); // Déclenche la requête avec le terme soumis
      // console.log("Recherche du film :", searchTerm);
    }
  };

  // Déclenche la recherche lorsque l'utilisateur appuie sur "Enter"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  // Log des résultats lorsque la recherche est terminée
  useEffect(() => {
    if (data && !loading) {
      // console.log("Films trouvés :", data.searchFilms);
    }
  }, [data, loading]);

  if (error) {
    console.error("Erreur lors de la recherche des films :", error);
  }
  return (
    <div className="relative flex justify-center p-4">
      <input
        type="text"
        placeholder="Recherchez un film..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent text-white border border-bloodRed rounded-lg px-6 py-2 pl-10 font-bold transition-all focus:outline-none"
      />
      <button
        onClick={triggerSearch} // Ajoute ta fonction de recherche ici
        className="absolute right-8 top-1/2 transform -translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  );
}
