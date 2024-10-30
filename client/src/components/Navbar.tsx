import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const { user, loading, error } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error loading user data:", error);
  }

  // Determine the avatar image path
  const avatarImagePath = user?.avatar?.image || "/default-user.png";

  return (
    <nav className="flex items-center p-4">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="/thrillermania.png"
          alt="Thriller Mania logo"
          className="h-16 w-16 md:h-20 md:w-20 mr-3"
        />
      </div>

      {/* Title */}
      <h1 className="text-white text-2xl md:text-6xl ml-2 md:ml-20 font-bold">
        THRILLER MANIA
      </h1>

      {/* Avatar Section */}
      <div className="flex items-center ml-auto">
        <img
          src={avatarImagePath}
          alt="Avatar"
          className="h-10 w-10 md:h-14 md:w-14 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
