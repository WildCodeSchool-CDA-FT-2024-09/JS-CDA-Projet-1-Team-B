import CarousselTrendyFilms from "../components/CarrousselTrendyFilms";
import LastFilms from "../components/LastFilms";

export default function HomePage() {
  return (
    <main className="block">
      <h1 className="mt-6 ml-8 text-2xl text-bloodRed font-bold md:text-3xl">
        TENDANCES
      </h1>
      <section className="flex justify-center">
        <CarousselTrendyFilms />
      </section>
      <h2
        className="text-white mt-6 ml-10  p-2 text-2xl font-semibold">
        Les derniers arrivés
      </h2>
      <section className="flex justify-center">
        <LastFilms />
      </section>
    </main>
  );
}
