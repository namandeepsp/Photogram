import { getAllUsers } from "@/repository/user.service";
import { IProfileResponse } from "@/types";
import React, { createContext, useContext, useEffect } from "react";
import { useUserAuth } from "./userAuthContext";

interface IUserContext {
  users: IProfileResponse[];
  loading: boolean;
}

const UsersContext = createContext<IUserContext | null | undefined>(null);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserAuth();
  const [users, setUsers] = React.useState<IProfileResponse[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      console.log("Fetch all user called...");
      try {
        setLoading(true);
        const fetchedUsers = await getAllUsers();
        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.log("Error occured while fetching users data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [user?.photoURL, user?.displayName]);

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
