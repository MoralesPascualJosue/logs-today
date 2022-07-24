import React from "react";
import {Route, Redirect} from "react-router-dom";

import useAuth from "../Features/Auth/Hooks/useAuth";

const PrivateRoute = ({children, allowedRoles, ...rest}) => {
  const {isLogged, roles} = useAuth();

  return (
    <Route
      {...rest}
      render={({location}) =>
        roles?.find((role) => allowedRoles?.includes(role)) ? (
          children
        ) : isLogged ? (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: {from: location},
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
