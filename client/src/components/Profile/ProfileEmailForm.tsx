import EditButtonSvg from "../../assets/EditButtonSVG.tsx";
import { useForm } from "react-hook-form";

export default function ProfileEmailForm({ email }: { email: string }) {
  const {
    register,
  } = useForm();
  
  return (
    <form
      className="md:max-w-[45rem] md:rounded-lg md:border-[3px] md:border-bloodRed md:my-[5dvh] min-mx-[2dvw] md:mx-auto pb-10 px-10"
    >
      <section className="flex w-full">
        <label className="hidden md:block min-w-32 md:mr-2">
          Adresse e-mail :
        </label>
        <input
          className="input-red p-2 font-semibold text-xl"
          type="email"
          placeholder={`E-mail : ${email}`}
          autoComplete="true"
          required
          {...register("email")}
        />
        <button type="submit"><EditButtonSvg /></button>
      </section>
    </form>
  );
}