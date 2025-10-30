


import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";                     
import { AuthContext } from "../context/auth.context";  
import { Button, Menu } from "@mantine/core";
import "./Navbar.css";
import axios from "axios";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);




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

          <Link to="/disciplines">
            <Button color="orange" variant="light">Disciplines</Button>
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