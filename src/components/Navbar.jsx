

// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";  // <== IMPORT

function Navbar() {
  const {
    isLoggedIn,
    user,                   // <== UPDATE
    logOutUser              // <== UPDATE
  } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/workouts">
            <button>Workouts</button>
          </Link>

          {/*   UPDATE   */}
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}

    </nav>
  );
}

export default Navbar;