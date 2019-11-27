import React, {useContext, createContext} from "react";
import useProvideAuth from "./CustomAuthProvider";

/**
 * Inspired by:
 * https://usehooks.com/useAuth/
 */

// Default context value
const AuthContext = createContext({});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(AuthContext);
};
