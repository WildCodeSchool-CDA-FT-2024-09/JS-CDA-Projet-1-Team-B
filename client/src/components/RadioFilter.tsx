import { Criteria } from "../generated/graphql-types";

interface RadioFilterProps {
  criteria: Criteria;
  setCriteria: (criteria: Criteria) => void;
  onClose: () => void;
}

export default function RadioFilter({
  criteria,
  setCriteria,
  onClose,
}: RadioFilterProps) {
  return (
    <div className="relative flex mx-auto bg-transparent text-white border border-bloodRed rounded-lg pr-6 py-4 pl-10 font-bold transition-all">
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <label className="block">
        <input
          type="radio"
          value="title"
          checked={criteria === Criteria.Title}
          onChange={() => setCriteria(Criteria.Title)}
          className="mr-2"
        />
        Titre
      </label>
      <label className="block ml-4">
        <input
          type="radio"
          value="actor"
          checked={criteria === Criteria.Actor}
          onChange={() => setCriteria(Criteria.Actor)}
          className="mr-2"
        />
        Acteur
      </label>
      <label className="block ml-4">
        <input
          type="radio"
          value="director"
          checked={criteria === Criteria.Director}
          onChange={() => setCriteria(Criteria.Director)}
          className="mr-2"
        />
        Réalisateur
      </label>
    </div>
  );
}
