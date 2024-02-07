import { Navigate, useLocation } from "react-router-dom";
////__________________________________________________________________
import Layout from "~/layout";
////__________________________________________________________________
import { useAuth } from "~/hooks/useAuth";
////__________________________________________________________________
const RequireAuth = () => {
  const { authStatus } = useAuth();

  const location = useLocation();
  ////__________________________________________________________________
  return authStatus === "valid" ? (
    <Layout />
  ) : authStatus === "invalid" ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : null;
};
////__________________________________________________________________
export default RequireAuth;
