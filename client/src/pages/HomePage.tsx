import CarousselTrendyFilms from "../components/CarrousselTrendyFilms";

export default function HomePage() {
  return (
    <main>
      <h1 className="mt-6 ml-8 text-2xl text-bloodRed font-bold md:text-3xl">
        TENDANCES
      </h1>
      <section className="flex justify-center">
        <CarousselTrendyFilms />
      </section>
    </main>
  );
}
