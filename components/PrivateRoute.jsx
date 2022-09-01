import React, { useContext } from "react";
import { Redirect, Route } from "react-router-native";
import { Text } from "react-native";
import { AuthContext } from "./AuthProvider";

export const PrivateRoute = ({ path, exact, redirectTo, children }) => {
  const authStoreState = useContext(AuthContext);
  if (authStoreState.isAuthenticatingUser) {
    return <Text>Cargando</Text>;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        authStoreState.user ? children : <Redirect to={redirectTo} />
      }
    />
  );
};
