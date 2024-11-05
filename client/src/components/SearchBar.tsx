import { useState } from "react";
import { Criteria } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
import RadioFilter from "./RadioFilter";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [criteria, setCriteria] = useState<Criteria>(Criteria.Title);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

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

  // Gérer l'affichage de `RadioFilter`
  const handleFocus = () => {
    setIsFilterVisible(true);
  };

  const closeFilter = () => {
    setIsFilterVisible(false);
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="relative flex justify-center px-4 pt-4">
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="w-full bg-transparent text-white border border-bloodRed rounded-lg px-6 py-2 pl-10 font-bold transition-all focus:outline-none"
        />
        <button
          onClick={triggerSearch}
          className="absolute right-8 top-9 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 26 26"
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
      <div className="px-4">
        {isFilterVisible && (
          <RadioFilter
            criteria={criteria}
            setCriteria={setCriteria}
            onClose={closeFilter}
          />
        )}
      </div>
    </div>
  );
}
