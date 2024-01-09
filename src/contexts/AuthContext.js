import { Box, Modal, ModalOverlay, Skeleton, Spinner } from '@chakra-ui/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from 'variables/api';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [fetching, setFetching] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [activeRole, setActiveRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setFetching(true);
            api
                .get('user/info')
                .json()
                .then(({ roles, active_role }) => {
                    setRoleList(roles);
                    if (active_role) {
                        setActiveRole(active_role);
                    }
                })
                .catch(() => {
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, []);

    const isAuthenticated = useMemo(() => {
        return roleList.length > 0;
    }, [roleList]);

    const isReady = useMemo(() => {
        return activeRole !== null;
    }, [activeRole]);

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

        setActiveRole(null);
        setRoleList([]);
        localStorage.removeItem('token');

        return Promise.resolve();
    };

    return (
        <AuthContext.Provider value={{ roleList, activeRole, isAuthenticated, isReady, login, selectRole, logout }}>
            {fetching ? (
                <Skeleton />
            ) : children}
        </AuthContext.Provider>
    );
};
