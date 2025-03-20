import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { UserAuthProvider } from "./context/userAuthContext";
import { UsersProvider } from "./context/UsersContext";
import router from "./routes";

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
