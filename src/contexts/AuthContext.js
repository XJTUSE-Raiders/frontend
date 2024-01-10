import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from 'variables/api';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    // const [fetching, setFetching] = useState(false);
    const [userData, setUserData] = useState({});
    const [roleList, setRoleList] = useState([]);
    const [activeRole, setActiveRole] = useState(null);

    const isAuthenticated = useMemo(() => {
        return roleList.length > 0;
    }, [roleList]);

    const isReady = useMemo(() => {
        return activeRole !== null;
    }, [activeRole]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // setFetching(true);
            api
                .get('user/info')
                .json()
                .then(({ username, email, phone, roles, active_role }) => {
                    setUserData({ username, email, phone });
                    if (active_role) {
                        setActiveRole(active_role);
                    }
                    setRoleList(roles); // order is very important here
                })
                .catch(() => {
                    localStorage.removeItem('token');
                });
                // .finally(() => {
                //     setFetching(false);
                // });
        }
    }, []);

    const login = (user, pwd) => {
        if (isAuthenticated) {
            throw new Error('Already authenticated');
        }

        return api
            .post('user/login', {
                json: {
                    username: user,
                    password: pwd,
                },
                headers: {
                    'content-type': 'application/json',
                },
            })
            .json()
            .then(({ token, roles }) => {
                localStorage.setItem('token', token);
                setUserData({ username: user });
                setRoleList(roles);
                if (roles.length === 1) {
                    setActiveRole(roles[0]);
                }
                return Promise.resolve(roles);
            });
    };

    const selectRole = (role) => {
        if (!isAuthenticated) {
            throw new Error('Not authenticated');
        }

        if (isReady) {
            throw new Error('Already selected');
        }

        if (roleList.indexOf(role) === -1) {
            throw new Error('Invalid role');
        }

        return api
            .post('user/select-role', {
                json: {
                    role,
                },
            })
            .json()
            .then(({ token }) => {
                localStorage.setItem('token', token);
                setActiveRole(role);
                return Promise.resolve();
            });
    };

    const logout = () => {
        if (!isAuthenticated) {
            throw new Error('Not authenticated');
        }

        setUserData({});
        setActiveRole(null);
        setRoleList([]);
        localStorage.removeItem('token');

        return Promise.resolve();
    };

    return (
        <AuthContext.Provider value={{ userData,
            roleList, activeRole, isAuthenticated,
            isReady, login, selectRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
