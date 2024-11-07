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
    // Load user from localStorage when the app initializes
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Restore user from localStorage
    }
  }, []);

  useEffect(() => {
    // Watch email changes and fetch user data when email changes
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
        localStorage.setItem("user", JSON.stringify(data.getUserByEmail));
      } else {
        setUser(null);
        localStorage.removeItem("user");
        throw new Error("No user match this email");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        email,
        fetchUserByEmail,
        setEmail,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
