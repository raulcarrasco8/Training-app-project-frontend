


import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  
import { Button } from "@mantine/core";

function Navbar() {
  const {
    isLoggedIn,
    user,                   
    logOutUser              
  } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <Button color="orange" variant="light">Home</Button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/workouts">
            <Button color="orange" variant="light">Workouts</Button>
          </Link>

          <Button color="orange" variant="light" onClick={logOutUser}>Logout</Button>
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