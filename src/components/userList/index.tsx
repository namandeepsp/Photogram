import { useUserAuth } from "@/context/userAuthContext";
import { useUsers } from "@/context/UsersContext";
import * as React from "react";
import image1 from "@/assets/images/image1.jpg";
import { Link } from "react-router-dom";
import Spinner from "../loader";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface IUserListProps {}

const UserList: React.FunctionComponent<IUserListProps> = (props) => {
  const { user } = useUserAuth();
  const { users, loading } = useUsers();

  const renderSuggestedUsers = () => {
    // console.log("logged in user: ", user);
    return users?.length > 0 ? (
      users.map((user_) => {
        // console.log("user_1234: ", user_?.id);
        if (user_?.id === user?.uid) return null;
        return (
          <div
            className="flex flex-row justify-between items-center gap-4 mb-2"
            key={user_?.id}
          >
            <div className="flex flex-row items-center gap-2 border-gray-400 justify-start">
              <span className="mr-2">
                <img
                  src={user_?.photoURL || image1}
                  alt="User profile image"
                  className="w-12 h-12 border-2 border-slate-800 rounded-full object-cover"
                />
              </span>
              <span className="text-l">
                {user_?.displayName || "Guest user"}
              </span>
            </div>
            <Button className="text-xs p-3 py-2 h-6 w-25 bg-blue-500 rounded-sm cursor-pointer">
              Follow <Plus />
            </Button>
          </div>
        );
      })
    ) : (
      <p className="text-center">No users available!</p>
    );
  };

  return (
    <div className="text-white py-2 px-3">
      <Link to="/profile">
        <div className="flex flex-row items-center border-b border-gray-400 p-4 mb-4 cursor-pointer">
          <span className="mr-2">
            <img
              src={user?.photoURL || image1}
              alt="User profile image"
              className="w-10 h-10 border-2 border-slate-800 rounded-full object-cover"
            />
          </span>
          <span className="text-xs">{user?.displayName || "Guest user"}</span>
        </div>
      </Link>
      <h3 className="text-sm text-slate-300">Suggested users</h3>
      <div className="my-4 relative">
        {loading && (
          <div className="flex justify-center items-center bg-transparent">
            <Spinner color="text-slate-800" />
          </div>
        )}
        {renderSuggestedUsers()}
      </div>
    </div>
  );
};

export default UserList;
