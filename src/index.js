import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
// import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { AuthProvider } from 'contexts/AuthContext';
import AuthRoute from 'components/AuthRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <React.StrictMode>
                    {/* <ThemeEditorProvider> */}
                        <HashRouter>
                            <Switch>
                                <Route path={`/auth`}><AuthLayout /></Route>
                                <AuthRoute path={`/admin`}><AdminLayout /></AuthRoute>
                                <AuthRoute path={`/control`}><AdminLayout /></AuthRoute>
                                <Redirect from='/' to='/admin' />
                            </Switch>
                        </HashRouter>
                    {/* </ThemeEditorProvider> */}
                </React.StrictMode>
            </ChakraProvider>
        </QueryClientProvider>
    </AuthProvider>,
    document.getElementById('root')
);
