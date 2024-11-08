const AboutPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center p-6 md:p-10 bg-transparent text-white">
      <div className="w-full max-w-3xl border-bloodRed p-6 md:p-10 rounded-lg shadow-lg border">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-bloodRed mb-6">
          À Propos de Thriller Mania
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          Bienvenue sur
          <span className="text-bloodRed font-semibold mx-2">
            Thriller Mania
          </span>
          ! Ce site web est dédié aux amateurs de films sur le thème du
          thriller. Il vous permet de rechercher des films, de les liker, de
          commenter et de partager vos découvertes avec la communauté.
        </p>
        <section className="mb-6">
          <h2 className="text-2xl text-bloodRed font-semibold mb-2">Auteurs</h2>
          <p className="leading-relaxed">
            @Alexandre, @Ludovic, @Stephanie, @Jean-Francois
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl text-bloodRed font-semibold mb-2">
            Remerciements
          </h2>
          <p className="leading-relaxed">
            Merci à Julien, nos collègues du Crew, et la Wild Code School
            <span className="text-bloodRed">&hearts;</span>
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
