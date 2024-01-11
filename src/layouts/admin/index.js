// Chakra imports
import { Portal, Box, useDisclosure, } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { useAuth } from 'contexts/AuthContext';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

// Custom Chakra theme
export default function Dashboard(props) {
    const { ...rest } = props;
    // states and functions
    const location = useLocation();
    const { authRoutes } = useAuth();
    const [ fixed ] = useState(false);
    const [ toggleSidebar, setToggleSidebar ] = useState(false);
    // functions for changing the states from components
    const activeRoute = useMemo(() => {
        const getActiveRoute = (routes) => {
            let activeRoute = '大数据网站访客商业智能分析平台';
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].collapse) {
                    let collapseActiveRoute = getActiveRoute(routes[i].items);
                    if (collapseActiveRoute !== activeRoute) {
                        return collapseActiveRoute;
                    }
                } else if (routes[i].category) {
                    let categoryActiveRoute = getActiveRoute(routes[i].items);
                    if (categoryActiveRoute !== activeRoute) {
                        return categoryActiveRoute;
                    }
                } else {
                    if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                        return routes[i].name;
                    }
                }
            }
            return activeRoute;
        };
        return getActiveRoute(authRoutes);
    }, [location, authRoutes]);

    const activeNavbar = useMemo(() => {
        const getActiveNavbar = (routes) => {
            let activeNavbar = false;
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].collapse) {
                    let collapseActiveNavbar = getActiveNavbar(routes[i].items);
                    if (collapseActiveNavbar !== activeNavbar) {
                        return collapseActiveNavbar;
                    }
                } else if (routes[i].category) {
                    let categoryActiveNavbar = getActiveNavbar(routes[i].items);
                    if (categoryActiveNavbar !== activeNavbar) {
                        return categoryActiveNavbar;
                    }
                } else {
                    if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                        return routes[i].secondary;
                    }
                }
            }
            return activeNavbar;
        };
        return getActiveNavbar(authRoutes);
    }, [location, authRoutes]);

    const activeNavbarText = useMemo(() => {
        const getActiveNavbarText = (routes) => {
            let activeNavbar = false;
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].collapse) {
                    let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
                    if (collapseActiveNavbar !== activeNavbar) {
                        return collapseActiveNavbar;
                    }
                } else if (routes[i].category) {
                    let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
                    if (categoryActiveNavbar !== activeNavbar) {
                        return categoryActiveNavbar;
                    }
                } else {
                    if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                        return routes[i].messageNavbar;
                    }
                }
            }
            return activeNavbar;
        };
        return getActiveNavbarText(authRoutes);
    }, [location, authRoutes]);

    const memoRoutes = React.useMemo(() => {
        const getRoutes = (routes) => {
            return routes.map((route, idx) => {
                if (route.layout === '/admin') {
                    return <Route path={route.layout + route.path} component={route.component} key={idx} />;
                }
                if (route.collapse) {
                    return getRoutes(route.items);
                }
                if (route.category) {
                    return getRoutes(route.items);
                } else {
                    return null;
                }
            });
        };
        return getRoutes(authRoutes);
    }, [authRoutes]);

    document.documentElement.dir = 'ltr';
    const { onOpen } = useDisclosure();
    document.documentElement.dir = 'ltr';
    return (
        <Box>
            <Box>
                <SidebarContext.Provider
                    value={{
                        toggleSidebar,
                        setToggleSidebar
                    }}>
                    <Sidebar routes={authRoutes} display='none' {...rest} />
                    <Box
                        float='right'
                        minHeight='100vh'
                        height='100%'
                        overflow='auto'
                        position='relative'
                        maxHeight='100%'
                        w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                        maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                        transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                        transitionDuration='.2s, .2s, .35s'
                        transitionProperty='top, bottom, width'
                        transitionTimingFunction='linear, linear, ease'>
                        <Portal>
                            <Box>
                                <Navbar
                                    onOpen={onOpen}
                                    logoText={'大数据网站访客商业智能分析平台'}
                                    brandText={activeRoute}
                                    secondary={activeNavbar}
                                    message={activeNavbarText}
                                    fixed={fixed}
                                    {...rest}
                                />
                            </Box>
                        </Portal>

                        <Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
                            <Switch>
                                {memoRoutes}
                                <Redirect from='/' to='/admin/dashboard' />
                            </Switch>
                        </Box>
                        <Box>
                            <Footer />
                        </Box>
                    </Box>
                </SidebarContext.Provider>
            </Box>
        </Box>
    );
}
