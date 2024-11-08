import EditButtonSvg from "../../assets/EditButtonSVG.tsx";
import { useForm } from "react-hook-form";

export default function ProfilePwdForm() {
  const {
    register,
  } = useForm();

  return (
    <form
      className="md:max-w-[45rem] md:rounded-lg md:border-[3px] md:border-bloodRed md:my-[5dvh] min-mx-[2dvw] md:mx-auto p-10"
    >
      <section className="flex w-full">
        <label className="hidden md:block min-w-32 md:mr-2">
          Mot de passe :
        </label>
        <input
          className="input-red p-2 font-semibold text-xl"
          type="password"
          placeholder="Modifier son mot de passe"
          autoComplete="true"
          required
          {...register("password")}
        />
        <button type="submit"><EditButtonSvg /></button>
      </section>
      <section className="flex w-full mt-10">
        <label className="hidden md:block min-w-32 md:mr-2 my-auto">
          Confirmation :
        </label>
        <input
          className="input-red p-2 font-semibold text-xl"
          type="password"
          placeholder="Confirmation mot de passe"
          autoComplete="true"
          required
          {...register("confirmPassword")}
        />
      </section>
    </form>
  );
}