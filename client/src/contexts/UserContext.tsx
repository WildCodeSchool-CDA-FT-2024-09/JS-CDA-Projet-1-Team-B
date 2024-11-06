import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { client } from "../services/connection";
import {
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  User,
} from "../generated/graphql-types";

interface UserContextType {
  user: User | null;
  email: string | null; // Track email separately
  loading: boolean;
  error: unknown;
  fetchUserByEmail: (email: string) => void;
  setEmail: (email: string) => void; // Set the email
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null); // Store the email
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  // Fetch user data based on the email whenever it changes
  useEffect(() => {
    if (email) {
      fetchUserByEmail(email); // Automatically fetch user data if email is set
    }
  }, [email]);

  const fetchUserByEmail = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await client.query<
        GetUserByEmailQuery,
        GetUserByEmailQueryVariables
      >({
        query: GetUserByEmailDocument,
        variables: { email },
      });

      if (data.getUserByEmail) {
        setUser(data.getUserByEmail); // Set the user data when found
      } else {
        setUser(null);
        setError("User not found");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        email,
        loading,
        error,
        fetchUserByEmail,
        setEmail,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
