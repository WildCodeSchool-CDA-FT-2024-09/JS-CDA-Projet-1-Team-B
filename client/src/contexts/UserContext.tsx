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
  loading: boolean;
  error: unknown;
  fetchUserByEmail: () => void;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  //const hardcodedEmail = "dark.suspense@example.com";
  //const hardcodedEmail = "mystery.hunter@example.com";
  //const hardcodedEmail = "noir.master@example.com";
  const hardcodedEmail = "chilling.thrill@example.com";
  //const hardcodedEmail = "shadow.watcher@example.com";
  //const hardcodedEmail = "user@user.com";

  const fetchUserByEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await client.query<
        GetUserByEmailQuery,
        GetUserByEmailQueryVariables
      >({
        query: GetUserByEmailDocument,
        variables: { email: hardcodedEmail },
      });

      if (data.getUserByEmail) {
        setUser(data.getUserByEmail);
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

  useEffect(() => {
    fetchUserByEmail();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, fetchUserByEmail }}>
      {children}
    </UserContext.Provider>
  );
};
