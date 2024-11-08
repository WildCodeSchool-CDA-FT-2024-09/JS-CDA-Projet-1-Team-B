import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  const avatarImagePath = user?.avatar?.image
    ? `/avatar/${user.avatar.image}`
    : "/default-user.png";

  return (
    <nav className="flex items-center p-4">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/thrillermania.png"
            alt="Thriller Mania logo"
            className="h-16 w-16 md:h-20 md:w-20 mr-3 cursor-pointer"
          />
        </Link>
      </div>

      <h1 className="text-white text-2xl md:text-6xl ml-2 md:ml-20 font-bold">
        THRILLER MANIA
      </h1>

      <div className="flex items-center ml-auto">
        <Link to={user ? "/profil" : "/connexion"}>
          <img
            src={avatarImagePath}
            alt="Avatar"
            className="h-10 w-10 md:h-14 md:w-14 rounded-full cursor-pointer"
          />
        </Link>
        {user && (
          <button
            onClick={logout}
            className="ml-4 text-white bg-red-600 rounded-lg px-4 py-2 hover:bg-red-700"
          >
            Se déconnecter
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
