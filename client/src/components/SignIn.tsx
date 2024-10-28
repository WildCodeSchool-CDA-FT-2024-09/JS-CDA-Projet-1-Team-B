import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, Schema } from "../types/SignIn.types";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: Schema) => {
    console.info("data:", data);
    console.info("erreurs:", errors); // TODO
  };
  return (
    <>
      <h2 className="text-bloodRed uppercase text-center text-xl font-semibold pt-2">
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
            {...register("password", {
              required: "Mot de passe obligatoire.",
              minLength: { value: 12, message: "Minimum 12 caractères" },
              maxLength: { value: 50, message: "Maximum 50 caractères" },
            })}
          />
        </section>
        {errors.password?.message && (
          <span role="alert" className="text-bloodRed text-center">
            {errors.password?.message}
          </span>
        )}
        <div className="flex flex-col items-center w-full mx-auto mt-10">
          <span className="text-white font-semibold pb-[1dvh]">
            Pas encore inscrit ?{" "}
            <Link
              to={"/inscription"}
              className="text-bloodRed underline hover:opacity-80"
            >
              S'inscrire
            </Link>
          </span>
          <button type="submit" className="btn-red">
            Connexion
          </button>
        </div>
      </form>
    </>
  );
}
