import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./context/userAuthContext";
import { UsersProvider } from "./context/usersContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <UserAuthProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </UserAuthProvider>
  );
};

export default App;
