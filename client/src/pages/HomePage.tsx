import CarousselTrendyFilms from "../components/CarrousselTrendyFilms";

export default function HomePage() {
  return (
    <div>
      <h1 className="mt-6 ml-8 text-2xl text-bloodRed font-bold md:text-3xl">
        TENDANCES
      </h1>
      <div className="flex justify-center">
        <CarousselTrendyFilms />
      </div>
    </div>
  );
}
