


import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  
import { Button } from "@mantine/core";
import "./Navbar.css";

function Navbar() {
  const {
    isLoggedIn,
    user,                   
    logOutUser              
  } = useContext(AuthContext);

  return (
    <nav className="navbar">
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
          <Link to="/signup"> <Button color="orange" variant="light">Sign Up</Button> </Link>
          <Link to="/login"> <Button color="orange" variant="light">Login</Button> </Link>
        </>
      )}

    </nav>
  );
}

export default Navbar;