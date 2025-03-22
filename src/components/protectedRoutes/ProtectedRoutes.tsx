import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
