import { useState } from "react";
import { Criteria } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [criteria] = useState<Criteria>(Criteria.Title); // Modifie le critère de recherche avec Title Actor ou Director
  const navigate = useNavigate();

  // Placeholder dynamique basé sur le critère sélectionné
  const getPlaceholder = () => {
    switch (criteria) {
      case Criteria.Title:
        return "Recherchez un film par titre...";
      case Criteria.Actor:
        return "Recherchez un film par acteur...";
      case Criteria.Director:
        return "Recherchez un film par réalisateur...";
      default:
        return "Recherchez...";
    }
  };

  // Fonction pour déclencher la recherche
  const triggerSearch = () => {
    if (searchTerm.length > 0) {
      navigate({
        pathname: "",
        search: `?search=${encodeURIComponent(
          searchTerm.trim()
        )}&type=${criteria}`,
      });
    }
  };

  // Déclencher la recherche lorsque l'utilisateur appuie sur "Enter"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className="relative flex justify-center p-4">
      <input
        type="text"
        placeholder={getPlaceholder()} // Placeholder dynamique
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Met à jour le terme de recherche
        onKeyDown={handleKeyDown} // Déclenche la recherche à l'appui de "Enter"
        className="w-full bg-transparent text-white border border-bloodRed rounded-lg px-6 py-2 pl-10 font-bold transition-all focus:outline-none"
      />
      <button
        onClick={triggerSearch} // Déclenche la recherche sur clic du bouton
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
