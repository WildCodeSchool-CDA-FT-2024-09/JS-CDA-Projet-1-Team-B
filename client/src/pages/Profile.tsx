import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.tsx";
import DisplayCommentRating from "../components/Profile/DisplayCommentRating.tsx";
import ProfileTabs from "../components/Profile/ProfileTabs.tsx";
import ProfileUsernameForm from "../components/Profile/ProfileUsernameForm.tsx";
import ProfileEmailForm from "../components/Profile/ProfileEmailForm.tsx";
import ProfilePwdForm from "../components/Profile/ProfilePwdForm.tsx";

export default function Profile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("comments");

  // Redirection si l'utilisateur est non connecté
  useEffect(() => {
    if (!user || !user.email) {
      navigate("/connexion", { replace: true });
    }
  }, [user, navigate]);
  
  if (!user) return null;

  return (
    <>
      <h2 className="text-bloodRed uppercase text-center text-2xl font-semibold tracking-wide pt-2">
        Mon profil
      </h2>
      <section className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 items-center p-6">
        <div className="flex justify-center md:justify-start md:min-h-56">
          <img
            src={`./avatar/${user?.avatar.image}`}
            alt="Avatar"
            className="w-60 h-60 md:w-64 md:h-64 object-cover rounded-full cursor-pointer"
          />
        </div>
        <ProfileUsernameForm username={user?.username} setUser={setUser} />
        <ProfileEmailForm email={user?.email} />
        <ProfilePwdForm />
      </section>
      <section
        className="flex flex-col md:flex-col-reverse min-w-xs max-w-screen-md border-bloodRed border-2 rounded-lg h-[50dvh] mx-10 md:mx-auto">
        <DisplayCommentRating user={user} activeTab={activeTab} />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>
    </>
  );
}