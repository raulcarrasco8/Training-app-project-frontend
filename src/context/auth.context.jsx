import React, { useState, useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const API_URL = import.meta.env.VITE_API_URL;

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

    // Si cualquier petición con token recibe un 401 (token caducado o inválido),
    // cerramos la sesión y avisamos. IsPrivate se encarga de llevar al login.
    useEffect(() => {
        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const headers = error.config?.headers;
                const sentToken = Boolean(headers?.Authorization || headers?.get?.("Authorization"));

                if (error.response?.status === 401 && sentToken) {
                    const isExpired = error.response.data?.message?.startsWith("Session expired");
                    removeToken();
                    setIsLoggedIn(false);
                    setUser(null);
                    setIsLoading(false);
                    // id fijo: si fallan varias peticiones a la vez, solo se muestra un aviso
                    notifications.show({
                        id: "session-ended",
                        title: isExpired ? "Your session has expired" : "You've been logged out",
                        message: "Please log in again to continue.",
                        color: "medal",
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptorId);
    }, []);

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
