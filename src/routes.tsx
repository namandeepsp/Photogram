import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import Error from "./pages/error";
import Home from "./pages/home";
import Login from "./pages/login";
import MyPhotos from "./pages/myPhotos";
import CreatePost from "./pages/post";
import Profile from "./pages/profile";
import EditProfile from "./pages/profile/EditProfile";
import Signup from "./pages/signup";

export const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <Error />,
        },
        {
          path: "/post",
          element: <CreatePost />,
          errorElement: <Error />,
        },
        {
          path: "/myphotos",
          element: <MyPhotos />,
          errorElement: <Error />,
        },
        {
          path: "/profile",
          element: <Profile />,
          errorElement: <Error />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Signup />,
      errorElement: <Error />,
    },
  ],
  {
    basename: "/Photogram", // 👈 Important: Add your GitHub repo name
  }
);

export default router;
