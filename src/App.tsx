import { RouterProvider } from "react-router-dom";
import { UserAuthProvider } from "./context/userAuthContext";
import { UsersProvider } from "./context/UsersContext";
import router from "./routes";

const App = () => {
  return (
    <UserAuthProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </UserAuthProvider>
  );
};

export default App;
