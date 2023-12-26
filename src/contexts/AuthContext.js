import { createContext, useContext, useMemo, useState } from 'react';
import { api } from 'variables/api';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState(null);

    const isAuthenticated = useMemo(() => {
        return data !== null;
    }, [data]);

    const login = (user, pwd) => {
        if (isAuthenticated) {
            throw new Error('Already authenticated');
        }

        return api
            .post('auth/login', {
                json: {
                    username: user,
                    password: pwd,
                },
            })
            .json()
            .then((data) => {
                setData(data);
                return Promise.resolve(data);
            });
    };

    const logout = () => {
        if (!isAuthenticated) {
            throw new Error('Not authenticated');
        }

        return api
            .post('auth/logout')
            .json()
            .then(() => {
                setData(null);
                return Promise.resolve();
            });
    };

    return (
        <AuthContext.Provider value={{ data, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
