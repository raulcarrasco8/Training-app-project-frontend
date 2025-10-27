import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = async () => {           
        try {
            const storedToken = localStorage.getItem('authToken');
            
            if (!storedToken) {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
                return;
            }

            const response = await axios.get(
                `${API_URL}/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            const user = response.data;
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);

        } catch (error) {
            console.error("Authentication error:", error);
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {                  
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("authToken");
    }


    const logOutUser = () => {                  
        // To log out the user, remove the token
        removeToken();
        // and update the state variables    
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,  // Añade authenticateUser al contexto
                logOutUser        // Añade logOutUser al contexto
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
