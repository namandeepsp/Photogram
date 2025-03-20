import React, { createContext, useContext, useEffect } from "react";
import { IUserProfile } from "@/types";
import { getAllUsers } from "@/repository/user.service";

interface IUserContext {
  users: IUserProfile[];
  loading: boolean;
}

const UsersContext = createContext<IUserContext | null | undefined>(null);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = React.useState<IUserProfile[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getAllUsers();
        if (fetchAllUsers) {
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.log("Error occured while fetching users data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading }}>
      {children}
    </UsersContext.Provider>
  );
};

// Custom hook to use users context
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
