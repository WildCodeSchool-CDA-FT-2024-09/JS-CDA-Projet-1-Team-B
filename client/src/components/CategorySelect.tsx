// CategorySelect.tsx
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../generated/graphql-types";
import { useState } from "react";

export default function CategorySelect() {
  const { data, loading, error } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value || null;
    setSelectedCategory(category);

    const searchParams = new URLSearchParams(window.location.search);
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="mt-4">
      {loading && <p>Chargement des catégories...</p>}
      {error && <p>Erreur lors du chargement des catégories</p>}
      <select
        value={selectedCategory ?? ""}
        onChange={handleChange}
        className="w-1/6 bg-transparent text-white border border-bloodRed rounded-lg px-4 py-2 focus:outline-none"
      >
        <option className="bg-greyBlack" value="">
          Toutes les catégories
        </option>
        {data?.categories.map((category) => (
          <option
            className="bg-greyBlack"
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
