import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, Schema } from "../types/SignUp.types";
import { useCreateUserMutation } from "../generated/graphql-types";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUp, { data, loading, error }] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: Schema) => {
    signUp({
      variables: { body: formData },
    });
  };

  if (data) {
    setTimeout(() => navigate("/connexion"), 3000);
  }

  return (
    <>
      <h2 className="text-bloodRed uppercase text-center text-xl font-semibold tracking-wide pt-2">
        S'inscrire
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-[45rem] md:rounded-lg md:border-[3px] md:border-bloodRed md:my-[5dvh] min-mx-[2dvw] md:mx-auto p-10"
      >
        <section className="flex w-full">
          <label className="hidden md:block min-w-32 md:mr-2 my-auto">
            Pseudo :
          </label>
          <input
            className="input-red"
            type="text"
            placeholder="Pseudo"
            autoComplete="true"
            required
            {...register("username")}
          />
        </section>
        {errors.username?.message && (
          <span role="alert" className="text-bloodRed text-center">
            {errors.username?.message}
          </span>
        )}
        <section className="flex w-full mt-10">
          <label className="hidden md:block min-w-32 md:mr-2 my-auto">
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
          <label className="hidden md:block min-w-32 md:mr-2 my-auto">
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
        <section className="flex w-full mt-10">
          <label className="hidden md:block min-w-32 md:mr-2 my-auto">
            Confirmation :
          </label>
          <input
            className="input-red"
            type="password"
            placeholder="Confirmation mot de passe"
            autoComplete="true"
            required
            {...register("confirmPassword")}
          />
        </section>
        {errors.confirmPassword?.message && (
          <span role="alert" className="text-bloodRed text-center">
            {errors.confirmPassword?.message}
          </span>
        )}
        <div className="flex flex-col items-center w-full mx-auto mt-10">
          <span className="text-white font-semibold pb-[1dvh]">
            Déjà un compte ?{" "}
            <Link
              to={"/connexion"}
              className="text-bloodRed underline hover:opacity-80"
            >
              Se connecter
            </Link>
          </span>
          <button
            type="submit"
            className={loading ? `btn-red bg-gray-500` : `btn-red`}
            disabled={loading ? true : false}
          >
            S'inscrire
          </button>
          {error && (
            <span className="text-bloodRed pt-2 font-bold">
              {error.message}
            </span>
          )}
          {data && (
            <span className="text-green-500 pt-2 font-bold">{`Inscription réussie ${data.createUser} ! Redirection en cours...`}</span>
          )}
        </div>
      </form>
    </>
  );
}
