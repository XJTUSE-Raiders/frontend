import { createContext, useContext, useMemo, useState } from 'react';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState(null);

    const login = (user, pwd, cb) => {
        // TODO
        setData();
        cb();
    };

    const logout = (cb) => {
        setData(null);
    };

    const isAuthenticated = useMemo(() => {
        return data !== null;
    }, [data]);

    return (
        <AuthContext.Provider value={{ data, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
