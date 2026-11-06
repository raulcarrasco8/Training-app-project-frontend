

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader";

// redirectTo: a dónde mandar al usuario cuando ya tiene sesión (o al iniciarla aquí)
function IsAnon({ children, redirectTo = "/" }) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <PageLoader />;

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page ❌    
    return <Navigate to={redirectTo} replace />;
  } else {
    // If the user is not logged in, allow to see the page ✅
    return children;
  }
}

export default IsAnon;
