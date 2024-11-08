const FAQPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center p-6 md:p-10 bg-transparent text-white">
      <div className="w-full max-w-3xl border-bloodRed p-6 md:p-10 rounded-lg shadow-lg border">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-bloodRed mb-6">
          FAQ
        </h1>
        <section className="mb-6">
          <h2 className="text-2xl text-bloodRed font-semibold mb-2">
            Qu'est-ce que Thriller Mania ?
          </h2>
          <p className="leading-relaxed">
            Thriller Mania est une plateforme dédiée aux amateurs de thrillers,
            permettant de rechercher des films, de les liker, de commenter et de
            partager vos découvertes avec la communauté.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl text-bloodRed font-semibold mb-2">
            Comment puis-je créer un compte ?
          </h2>
          <p className="leading-relaxed">
            Pour créer un compte, cliquez sur le bouton "S'inscrire" dans le
            coin supérieur droit de la page d'accueil et suivez les
            instructions.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl text-bloodRed font-semibold mb-2">
            Comment rechercher des films ?
          </h2>
          <p className="leading-relaxed">
            Utilisez la barre de recherche en haut de la page pour trouver des
            films. Vous pouvez affiner votre recherche par titre, catégorie, ou
            décennie.
          </p>
        </section>
      </div>
    </main>
  );
};

export default FAQPage;
