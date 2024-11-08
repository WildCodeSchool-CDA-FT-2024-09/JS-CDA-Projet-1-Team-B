/* eslint-disable react-refresh/only-export-components */
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
  email: string | null;
  fetchUserByEmail: (email: string) => void;
  setEmail: (email: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
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
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (email) {
      fetchUserByEmail(email);
    }
  }, [email]);

  const fetchUserByEmail = async (email: string) => {
    try {
      const { data } = await client.query<
        GetUserByEmailQuery,
        GetUserByEmailQueryVariables
      >({
        query: GetUserByEmailDocument,
        variables: { email },
      });

      if (data.getUserByEmail) {
        setUser(data.getUserByEmail);
      } else {
        setUser(null);
        throw new Error("No user match this email");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const logout = () => {
    setUser(null);
    setEmail(null);
    localStorage.removeItem("email");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        email,
        fetchUserByEmail,
        setEmail,
        setUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
