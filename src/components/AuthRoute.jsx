import { useAuth } from "contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

export default function AuthRoute({ children, ...rest }) {
  const { isReady, isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isReady ? (
          children
        ) : (
            (localStorage.getItem('token') && !isAuthenticated) || (
                <Redirect
                    to={{
                    pathname: "/auth",
                    state: { from: location },
                    }}
                />
            )
        )
      }
    />
  );
}
