import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, Schema } from "../types/SignIn.types";
import { useSignInLazyQuery } from "../generated/graphql-types";

export default function SignIn() {
  const navigate = useNavigate();
  const [signIn, { loading, data, error }] = useSignInLazyQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: Schema) => {
    await signIn({
      variables: { body: formData },
    });
  };

  if (data) {
    setTimeout(() => navigate("/"), 3000); // TODO Passez la réponse via le context(Steph) et rediriger vers accueil
  }

  return (
    <>
      <h2 className="text-bloodRed uppercase text-center text-xl font-semibold tracking-wide pt-2">
        Se connecter
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-[45rem] md:rounded-lg md:border-[3px] md:border-bloodRed md:my-[5dvh] min-mx-[2dvw] md:mx-auto p-10"
      >
        <section className="flex w-full">
          <label className="hidden md:block min-w-32 md:mr-2">
            Adresse e-mail :
          </label>
          <input
            className="input-red"
            type="email"
            placeholder="Adresse e-mail"
            autoComplete="true"
            required
            {...register("email")}
          />
        </section>
        {errors.email?.message && (
          <span role="alert" className="text-bloodRed text-center">
            {errors.email?.message}
          </span>
        )}
        <section className="flex w-full mt-10">
          <label className="hidden md:block min-w-32 md:mr-2">
            Mot de passe :
          </label>
          <input
            className="input-red"
            type="password"
            placeholder="Mot de passe"
            autoComplete="true"
            required
            {...register("password")}
          />
        </section>
        {errors.password?.message && (
          <span role="alert" className="text-bloodRed text-center">
            {errors.password?.message}
          </span>
        )}
        <div className="flex flex-col items-center w-full mx-auto mt-10">
          <span className="text-white font-semibold pb-[1dvh]">
            Pas encore inscrit ?
            <Link
              to="/inscription"
              className="text-bloodRed underline hover:opacity-80 pl-2"
            >
              S'inscrire
            </Link>
          </span>
          <button
            type="submit"
            className={loading ? `btn-red bg-gray-500` : `btn-red`}
            disabled={loading}
          >
            Connexion
          </button>
          {error && (
            <span className="text-bloodRed pt-2 font-bold">
              {error.message}
            </span>
          )}
          {data && (
            <span className="text-green-500 pt-2 font-bold">{`Bienvenue ${data?.signIn.username} ! Redirection en cours...`}</span>
          )}
        </div>
      </form>
    </>
  );
}
