import EditButtonSvg from "../../assets/EditButtonSVG.tsx";
import { useForm } from "react-hook-form";
import { updateUsernameschema as schema, updateUsernameSchema as Schema } from "../../types/Profile.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, useUpdateUsernameMutation } from "../../generated/graphql-types.ts";

export default function ProfileUsernameForm({ username, setUser }: {
  username: string,
  setUser: (user: User | null) => void;
}) {
  const [updateUsername, { data }] = useUpdateUsernameMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ ...formData }: Schema) => {
    await updateUsername({ variables: { body: { ...formData, username } } });
    if (data?.updateUsername) {
      setUser(data.updateUsername);
    }
  };
  return (
    <div className="space-y-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-[45rem] md:rounded-lg md:border-[3px] md:border-bloodRed md:my-[5dvh] min-mx-[2dvw] md:mx-auto pb-10 px-10"
      >
        <input
          className=" text-white input-red md:border-none placeholder-white p-2 font-semibold text-xl focus:outline-bloodRed flex-grow"
          type="text"
          placeholder={`Pseudo : ${username}`}
          autoComplete="true"
          required
          {...register("newUsername")}
        />
        <button type="submit"><EditButtonSvg /></button>
        {data?.updateUsername && (<span role="alert" className="text-green-500 text-center">
            Pseudo modifié ! {data?.updateUsername.username}
          </span>
        )}
        {errors.newUsername?.message && (<span role="alert" className="text-bloodRed text-center">
            {errors.newUsername?.message}
          </span>
        )}
      </form>
    </div>
  );
}