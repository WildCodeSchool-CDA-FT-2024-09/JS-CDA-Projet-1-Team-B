import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategorySelect() {
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);
  const navigate = useNavigate();

  const decades = Array.from({ length: 11 }, (_, i) => 1930 + i * 10);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const decade = e.target.value;
    setSelectedDecade(decade);
    navigate(`?decade=${decade}`);
  };

  return (
    <div className="mt-4">
      <select
        value={selectedDecade ?? ""}
        onChange={handleChange}
        className="bg-transparent text-white border border-bloodRed rounded-lg px-4 py-2 focus:outline-none"
      >
        <option className="bg-greyBlack" value="">
          Toutes les décennies
        </option>
        {decades.map((decade) => (
          <option className="bg-greyBlack" key={decade} value={decade}>
            {decade}s
          </option>
        ))}
      </select>
    </div>
  );
}
